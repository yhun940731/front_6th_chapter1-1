// URL 쿼리스트링 파싱 함수
const getURLParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    limit: params.get("limit") ? parseInt(params.get("limit")) : 20,
    sort: params.get("sort") || "price_asc",
    query: params.get("query") || "",
    category1: params.get("category1") || "",
  };
};

/**
 *
 * @param {Object} newParams
 * @returns {URLSearchParams}
 */
const mergeURLParams = (newParams) => {
  const currentParams = getURLParams();
  const mergedParams = { ...currentParams, ...newParams };

  // 빈 값 제거
  Object.keys(mergedParams).forEach((key) => {
    if (!mergedParams[key] || mergedParams[key] === "") {
      delete mergedParams[key];
    }
  });

  const urlParams = new URLSearchParams();
  Object.entries(mergedParams).forEach(([key, value]) => {
    if (value) urlParams.set(key, value);
  });

  return urlParams;
};

export { getURLParams, mergeURLParams };
