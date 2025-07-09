import mainStore from "../store/main.js";
import { showSnackbar } from "../layouts/Snackbar.js";
import { ADD_TO_CART_SNACKBAR, ERROR_SNACKBAR } from "../constants/enum.js";
import { render } from "../core/renderer.js";

export const handleAddToCart = (e) => {
  // 클릭된 요소가 장바구니 추가 버튼인지 확인
  if (!e.target.classList.contains("add-to-cart-btn")) return;

  // store 없이 sessionStorage에 장바구니 정보 저장
  const productId = e.target.dataset.productId;

  if (productId === undefined) {
    showSnackbar(ERROR_SNACKBAR);
    return;
  }

  const selectedProduct = mainStore.getProducts().find((product) => product.productId === productId);

  if (!selectedProduct) {
    showSnackbar(ERROR_SNACKBAR);
    return;
  }

  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // 이미 장바구니에 있는 상품인지 확인
  const existingProductIndex = cart.find((item) => item.id === selectedProduct?.productId);

  console.log("장바구니에 추가된 상품:", cart);

  if (existingProductIndex) {
    // 장바구니 상품 수량 증가
    return;
  }

  cart.push(selectedProduct);

  // sessionStorage에 장바구니 정보 저장
  sessionStorage.setItem("cart", JSON.stringify(cart));
  // 스낵바 표시
  showSnackbar(ADD_TO_CART_SNACKBAR);

  render();
};
