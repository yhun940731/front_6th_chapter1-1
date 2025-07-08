import { HomePage } from "./pages/HomePage.js";
import { getCategories, getProducts } from "./api/productApi.js";
import { getURLParams, mergeURLParams } from "./utils/url.js";
import { store } from "./store/index.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

// URL 업데이트 함수 (새로고침 없이)
const updateURL = (newParams) => {
  const params = mergeURLParams(newParams);

  const newURL = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
  window.history.pushState({}, "", newURL);

  store.setParams(Object.fromEntries(params.entries()));
};

const syncFormWithURL = () => {
  const params = getURLParams();

  // limit select 값 설정
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) {
    limitSelect.value = params.limit;
  }

  // sort select 값 설정
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = params.sort;
  }

  // search input 값 설정
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = params.search;
  }
};

// 다음 페이지 로드 함수
const loadMoreProducts = async () => {
  const state = store.getState();
  if (state.loadingMore || !state.pagination.hasNext) return;

  const params = getURLParams();
  await updateProducts(params, true); // append = true
};

const handleChangeLimitSelect = async (e) => {
  const limit = parseInt(e.target.value);
  updateURL({ limit });
  await updateLimit(limit);
};

const handleChangeCategory1Select = async (e) => {
  const sort = e.target.value;
  updateURL({ sort });
  await updateProducts({ sort });
};

const handleSearchSubmit = async () => {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    const search = searchInput.value.trim();

    updateURL({ search: encodeURIComponent(search) });

    await updateProducts({ search });
  }
};

const handleSearchKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearchSubmit();
  }
};

// 무한 스크롤 감지 함수
const setupInfiniteScroll = () => {
  const handleScroll = () => {
    // 스크롤이 바닥에서 200px 이내에 도달했을 때
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMoreProducts();
    }
  };

  // 기존 이벤트 리스너 제거
  window.removeEventListener("scroll", handleScroll);
  // 새 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll);
};

// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener("popstate", async () => {
  const urlParams = getURLParams();
  store.setParams(urlParams);

  await updateProducts(urlParams);
});

const addEventListeners = () => {
  // 개수 선택 이벤트
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) {
    limitSelect.addEventListener("change", handleChangeLimitSelect);
  }

  // 정렬 선택 이벤트
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", handleChangeCategory1Select);
  }

  // 검색 이벤트
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", handleSearchKeyDown);
  }
};

const removeEventListeners = () => {
  // 개수 선택 이벤트 제거
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) {
    limitSelect.removeEventListener("change", handleChangeLimitSelect);
  }

  // 정렬 선택 이벤트 제거
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.removeEventListener("change", handleChangeCategory1Select);
  }

  // 검색 이벤트 제거
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.removeEventListener("keydown", handleSearchKeyDown);
  }
};

const render = () => {
  // 기존 이벤트 리스너 제거
  removeEventListeners();

  const state = store.getState();

  document.body.querySelector("#root").innerHTML = HomePage({
    ...state,
    params: state.params || getURLParams(),
  });

  // URL 파라미터 기반으로 폼 값 설정
  syncFormWithURL();

  // 새로운 이벤트 리스너 추가
  addEventListeners();

  // 무한 스크롤 설정
  setupInfiniteScroll();
};

const updateLimit = async (limit = 20) => {
  store.setPagination({
    limit,
  });

  try {
    const params = getURLParams();

    const {
      products,
      pagination: { hasNext, total, page },
    } = await getProducts({ ...params, limit, page: 1 });

    store.setProducts(products);
    store.setTotal(total);
    store.setPagination({ hasNext, page });

    render();
  } catch (error) {
    console.error("상품 로딩 실패:", error);
    render();
  }
};

const updateProducts = async (params = {}, append = false) => {
  if (append) {
    store.setLoadingMore(true);
  } else {
    store.setLoading(true);
    store.resetPagination(); // 새로운 검색/필터시 페이지 리셋
  }

  render();

  try {
    const state = store.getState();

    const requestParams = {
      ...params,
      page: append ? state.pagination.page + 1 : 1,
      limit: state.pagination.limit,
      search: params.search || state.params.search || "",
    };

    const {
      products,
      pagination: { hasNext, total, page, limit },
    } = await getProducts(requestParams);

    if (append) {
      // 기존 상품에 추가
      store.appendProducts(products);
      store.setPagination({ page });
    } else {
      // 새로운 상품으로 대체
      store.setProducts(products);
      store.setPagination({ page });
    }

    store.setTotal(total);
    store.setPagination({ limit, hasNext });
    store.setLoading(false);
    store.setLoadingMore(false);

    render();
  } catch (error) {
    console.error("상품 로딩 실패:", error);
    store.setLoading(false);
    store.setLoadingMore(false);
    render();
  }
};

const main = async () => {
  // URL 파라미터 읽기
  const urlParams = getURLParams();
  store.setParams(urlParams);

  // 페이지네이션 초기화
  store.setPagination({
    limit: parseInt(urlParams.limit) || 20,
    page: 1,
  });

  store.setLoading(true);
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
      limit: store.getPagination().limit,
    }),
    getCategories({}),
  ]);

  store.setProducts(products);
  store.setTotal(total);
  store.setPagination({ page, limit, hasNext });
  store.setCategories(categories);
  store.setLoading(false);

  render();
};

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
