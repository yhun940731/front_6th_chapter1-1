import mainStore from "../store/main.js";
import { getCategories, getProducts } from "../api/productApi.js";
import { getURLParams } from "../utils/url.js";
import { updateProducts } from "../services/productService.js";
import { render } from "../core/renderer.js";

const enableMocking = () =>
  import("../mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

// 브라우저 뒤로가기/앞으로가기 지원
const setupPopstateHandler = () => {
  window.addEventListener("popstate", async () => {
    const urlParams = getURLParams();
    mainStore.setParams(urlParams);
    await updateProducts(urlParams);
  });
};

export const initializeApp = async () => {
  // URL 파라미터 읽기
  const urlParams = getURLParams();
  mainStore.setParams(urlParams);

  // 페이지네이션 초기화
  mainStore.setPagination({
    limit: parseInt(urlParams.limit) || 20,
    page: 1,
  });

  mainStore.setLoading(true);
  render();

  const [
    {
      products,
      pagination: { hasNext, total, page, limit },
    },
    categories,
  ] = await Promise.all([
    getProducts({
      ...urlParams,
      page: 1,
      limit: mainStore.getPagination().limit,
    }),
    getCategories({}),
  ]);

  mainStore.setProducts(products);
  mainStore.setTotal(total);
  mainStore.setPagination({ page, limit, hasNext });
  mainStore.setCategories(categories);
  mainStore.setLoading(false);

  render();

  // popstate 이벤트 설정
  setupPopstateHandler();
};

// 애플리케이션 시작
export const startApp = () => {
  if (import.meta.env.MODE !== "test") {
    enableMocking().then(initializeApp);
  } else {
    initializeApp();
  }
};
