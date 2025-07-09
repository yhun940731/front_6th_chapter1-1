import { HomePage } from "../pages/HomePage.js";
import mainStore from "../store/main.js";
import { getURLParams } from "../utils/url.js";
import { syncFormWithURL } from "./formSync.js";
import { setupEventListeners, removeEventListeners } from "./eventManager.js";
import { setupInfiniteScroll } from "./infiniteScroll.js";

export const render = () => {
  // 기존 이벤트 리스너 제거
  removeEventListeners();

  const mainState = mainStore.getState();

  document.body.querySelector("#root").innerHTML = HomePage({
    ...mainState,
    params: mainState.params || getURLParams(),
  });

  // URL 파라미터 기반으로 폼 값 설정
  syncFormWithURL();

  // 새로운 이벤트 리스너 추가
  setupEventListeners();

  // 무한 스크롤 설정
  setupInfiniteScroll();
};
