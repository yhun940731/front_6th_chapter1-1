import mainStore from "../store/main.js";
import { showSnackbar } from "../layouts/Snackbar.js";
import { ADD_TO_CART_SNACKBAR, ERROR_SNACKBAR } from "../constants/enum.js";
import { render } from "../core/renderer.js";
import { addToCart, updateCartQuantity, removeFromCart } from "../utils/cart.js";

export const handleAddToCart = (e) => {
  // 클릭된 요소가 장바구니 추가 버튼인지 확인
  if (!e.target.classList.contains("add-to-cart-btn")) return;

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

  // 장바구니에 상품 추가 (수량 자동 처리)
  const updatedCart = addToCart(selectedProduct);

  console.log("장바구니 업데이트:", updatedCart);

  // 스낵바 표시
  showSnackbar(ADD_TO_CART_SNACKBAR);

  render();
};

// 장바구니 다이얼로그 내에서의 이벤트 핸들러들
export const handleCartQuantityChange = (e) => {
  if (!e.target.classList.contains("quantity-input")) return;

  const productId = e.target.dataset.productId;
  const newQuantity = parseInt(e.target.value);

  if (productId && newQuantity > 0) {
    updateCartQuantity(productId, newQuantity);
    render();
  }
};

export const handleQuantityIncrease = (e) => {
  if (!e.target.classList.contains("quantity-increase-btn")) return;

  const productId = e.target.dataset.productId;
  const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);

  if (quantityInput) {
    const currentQuantity = parseInt(quantityInput.value);
    updateCartQuantity(productId, currentQuantity + 1);
    render();
  }
};

export const handleQuantityDecrease = (e) => {
  if (!e.target.classList.contains("quantity-decrease-btn")) return;

  const productId = e.target.dataset.productId;
  const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);

  if (quantityInput) {
    const currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      updateCartQuantity(productId, currentQuantity - 1);
      render();
    }
  }
};

export const handleRemoveFromCart = (e) => {
  if (!e.target.classList.contains("cart-item-remove-btn")) return;

  const productId = e.target.dataset.productId;

  if (productId) {
    removeFromCart(productId);
    render();
  }
};
