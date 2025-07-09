import { updateURL } from "../utils/url.js";
import { updateProducts } from "../services/productService.js";

export const handleSearchSubmit = async () => {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    const search = searchInput.value.trim();
    updateURL({ search: encodeURIComponent(search) });
    await updateProducts({ search });
  }
};

export const handleSearchKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearchSubmit();
  }
};
