import { HomePage } from "./pages/HomePage.js";

import { getCategories, getProducts } from "./api/productApi.js";

import { getURLParams, mergeURLParams } from "./utils/url.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

/**
 * * @typedef {Object} State
 * @property {Array} products - 상품 목록
 * @property {number} total - 전체 상품 수
 * @property {boolean} loading - 로딩 상태
 * @property {Object} categories - 카테고리 목록
 * @property {Object} params - URL 파라미터 상태
 */
let state = {
  products: [],
  total: 0,
  loading: false,
  categories: {},
  params: {}, // URL 파라미터 상태 추가
};

let searchInputTimeoutId; // 검색 디바운스용 타이머

// URL 업데이트 함수 (새로고침 없이)
const updateURL = (newParams) => {
  const params = mergeURLParams(newParams);

  const newURL = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
  window.history.pushState({}, "", newURL);

  state.params = Object.fromEntries(params.entries());
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
    searchInput.value = params.query;
  }
};

const render = () => {
  // 기존 이벤트 리스너 제거
  removeEventListeners();

  document.body.querySelector("#root").innerHTML = HomePage({
    ...state,
    params: state.params || getURLParams(),
  });

  // URL 파라미터 기반으로 폼 값 설정
  syncFormWithURL();

  // 새로운 이벤트 리스너 추가
  addEventListeners();
};

const updateLimit = async (limit = 20) => {
  // state.loading = true;
  // render();

  try {
    const {
      products,
      pagination: { total },
    } = await getProducts({ limit });

    state.products = products;
    state.total = total;
    // state.loading = false;

    render();
  } catch (error) {
    console.error("상품 로딩 실패:", error);
    // state.loading = false;
    render();
  }
};

const updateProducts = async (params = {}) => {
  state.loading = true;
  render();

  try {
    const {
      products,
      pagination: { total },
    } = await getProducts(params);

    state.products = products;
    state.total = total;
    state.loading = false;

    render();
  } catch (error) {
    console.error("상품 로딩 실패:", error);
    state.loading = false;
    render();
  }
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

const handleSearchInput = (e) => {
  clearTimeout(searchInputTimeoutId);
  searchInputTimeoutId = setTimeout(async () => {
    const query = e.target.value.trim();
    updateURL({ query });
    await updateProducts({ query });
  }, 500); // 500ms 디바운스
};

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
    searchInput.addEventListener("input", handleSearchInput);
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
    searchInput.removeEventListener("input", handleSearchInput);
  }
};

const main = async () => {
  // URL 파라미터 읽기
  const urlParams = getURLParams();
  state.params = urlParams;

  state.loading = true;
  render();

  const [
    {
      products,
      pagination: { total },
    },
    categories,
  ] = await Promise.all([getProducts(urlParams), getCategories({})]);

  state.products = products;
  state.total = total;
  state.loading = false;
  state.categories = categories;

  render();
};

// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener("popstate", async () => {
  const urlParams = getURLParams();

  state.params = urlParams;

  await updateProducts(urlParams);
});

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
