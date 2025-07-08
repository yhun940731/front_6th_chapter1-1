/** 초기 상태 정의
 * * @typedef {Object} State
 * @property {Array} products - 상품 목록
 * @property {number} total - 전체 상품 수
 * @property {boolean} loading - 로딩 상태
 * @property {Object} categories - 카테고리 목록
 * @property {Object} params - URL 파라미터 상태
 * @property {Object} pagination - 페이지네이션 상태
 */
const initialState = {
  products: [],
  total: 0,
  loading: false,
  loadingMore: false,
  categories: {},
  params: {},
  pagination: {
    page: 1,
    limit: 20,
    hasNext: true,
  },
};

// Store 클래스 정의
class Store {
  constructor(initialState) {
    this.state = { ...initialState };
    this.listeners = [];
  }

  // 상태 구독 (변경 시 콜백 실행)
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // 상태 변경 알림
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // 전체 상태 getter
  getState() {
    return { ...this.state };
  }

  // 개별 상태 getter들
  getProducts() {
    return this.state.products;
  }

  getTotal() {
    return this.state.total;
  }

  getLoading() {
    return this.state.loading;
  }

  getLoadingMore() {
    return this.state.loadingMore;
  }

  getCategories() {
    return this.state.categories;
  }

  getParams() {
    return this.state.params;
  }

  getPagination() {
    return this.state.pagination;
  }

  // 개별 상태 setter들
  setProducts(products) {
    this.state.products = products;
    this.notify();
  }

  appendProducts(products) {
    this.state.products = [...this.state.products, ...products];
    this.notify();
  }

  setTotal(total) {
    this.state.total = total;
    this.notify();
  }

  setLoading(loading) {
    this.state.loading = loading;
    this.notify();
  }

  setLoadingMore(loadingMore) {
    this.state.loadingMore = loadingMore;
    this.notify();
  }

  setCategories(categories) {
    this.state.categories = categories;
    this.notify();
  }

  setParams(params) {
    this.state.params = { ...this.state.params, ...params };
    this.notify();
  }

  setPagination(pagination) {
    this.state.pagination = { ...this.state.pagination, ...pagination };
    this.notify();
  }

  // 복합 액션들
  updateProductsData({ products, total, pagination, append = false }) {
    if (append) {
      this.appendProducts(products);
    } else {
      this.setProducts(products);
    }
    this.setTotal(total);
    this.setPagination(pagination);
  }

  resetPagination() {
    this.setPagination({
      page: 1,
      limit: this.state.pagination.limit,
      hasNext: true,
    });
  }

  incrementPage() {
    this.setPagination({
      page: this.state.pagination.page + 1,
    });
  }

  // 상태 초기화
  reset() {
    this.state = { ...initialState };
    this.notify();
  }
}

// Store 인스턴스 생성 및 내보내기
export const store = new Store(initialState);

// 편의를 위한 개별 함수들 내보내기
export const getState = () => store.getState();
export const getProducts = () => store.getProducts();
export const getTotal = () => store.getTotal();
export const getLoading = () => store.getLoading();
export const getLoadingMore = () => store.getLoadingMore();
export const getCategories = () => store.getCategories();
export const getParams = () => store.getParams();
export const getPagination = () => store.getPagination();

export const setProducts = (products) => store.setProducts(products);
export const appendProducts = (products) => store.appendProducts(products);
export const setTotal = (total) => store.setTotal(total);
export const setLoading = (loading) => store.setLoading(loading);
export const setLoadingMore = (loadingMore) => store.setLoadingMore(loadingMore);
export const setCategories = (categories) => store.setCategories(categories);
export const setParams = (params) => store.setParams(params);
export const setPagination = (pagination) => store.setPagination(pagination);

export const updateProductsData = (data) => store.updateProductsData(data);
export const resetPagination = () => store.resetPagination();
export const incrementPage = () => store.incrementPage();
export const resetStore = () => store.reset();

// 상태 구독
export const subscribe = (listener) => store.subscribe(listener);
