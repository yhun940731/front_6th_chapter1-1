import { handleChangeLimitSelect, handleChangeCategory1Select } from "../handlers/filterHandlers.js";
import { handleSearchKeyDown } from "../handlers/searchHandlers.js";
import {
  handleAddToCart,
  handleCartQuantityChange,
  handleQuantityIncrease,
  handleQuantityDecrease,
  handleRemoveFromCart,
} from "../handlers/cartHandlers.js";
import { handleCategoryFilterClick, handleBreadcrumbClick } from "../handlers/categoryHandlers.js";

export const setupEventListeners = () => {
  // 개수 선택 이벤트
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) limitSelect.addEventListener("change", handleChangeLimitSelect);

  // 정렬 선택 이벤트
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.addEventListener("change", handleChangeCategory1Select);

  // 검색 이벤트
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.addEventListener("keydown", handleSearchKeyDown);

  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) productsGrid.addEventListener("click", handleAddToCart);

  // 카테고리 필터링 버튼 이벤트 위임
  const categoryList = document.getElementById("category-list");
  if (categoryList) {
    categoryList.addEventListener("click", handleCategoryFilterClick);
  }

  // 브레드크럼 이벤트 위임 - 더 구체적인 선택자 사용
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (breadcrumbList) {
    breadcrumbList.addEventListener("click", handleBreadcrumbClick);
  }

  // 장바구니 다이얼로그 이벤트들
  const cartDialog = document.getElementById("cart-dialog");
  if (cartDialog) {
    cartDialog.addEventListener("change", handleCartQuantityChange);
    cartDialog.addEventListener("click", (e) => {
      handleQuantityIncrease(e);
      handleQuantityDecrease(e);
      handleRemoveFromCart(e);
    });
  }
};

export const removeEventListeners = () => {
  // 개수 선택 이벤트 제거
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) limitSelect.removeEventListener("change", handleChangeLimitSelect);

  // 정렬 선택 이벤트 제거
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.removeEventListener("change", handleChangeCategory1Select);

  // 검색 이벤트 제거
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.removeEventListener("keydown", handleSearchKeyDown);

  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) productsGrid.removeEventListener("click", handleAddToCart);

  // 카테고리 필터링 버튼 이벤트 제거
  const categoryList = document.getElementById("category-list");
  if (categoryList) categoryList.removeEventListener("click", handleCategoryFilterClick);

  // 브레드크럼 이벤트 제거 - 더 구체적인 선택자 사용
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (breadcrumbList) {
    breadcrumbList.removeEventListener("click", handleBreadcrumbClick);
  }

  // 장바구니 다이얼로그 이벤트 제거
  const cartDialog = document.getElementById("cart-dialog");
  if (cartDialog) {
    cartDialog.removeEventListener("change", handleCartQuantityChange);
    // click 이벤트는 익명 함수로 등록했으므로 제거할 수 없음 (DOM이 재생성되므로 문제없음)
  }
};
