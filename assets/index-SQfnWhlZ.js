(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i={products:[],total:0,loading:!1,loadingMore:!1,categories:{},params:{},pagination:{page:1,limit:20,hasNext:!0},openCart:!1,currentProduct:null,relatedProducts:[],selectedQuantity:1};var a=class{constructor(e){this.state={...e},this.listeners=[]}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){this.listeners.forEach(e=>e(this.state))}getState(){return{...this.state}}getProducts(){return this.state.products}getTotal(){return this.state.total}getLoading(){return this.state.loading}getLoadingMore(){return this.state.loadingMore}getCategories(){return this.state.categories}getParams(){return this.state.params}getPagination(){return this.state.pagination}getCurrentProduct(){return this.state.currentProduct}getRelatedProducts(){return this.state.relatedProducts}getSelectedQuantity(){return this.state.selectedQuantity}openCart(){this.state.openCart=!0,this.notify()}setProducts(e){this.state.products=e,this.notify()}appendProducts(e){this.state.products=[...this.state.products,...e],this.notify()}setTotal(e){this.state.total=e,this.notify()}setLoading(e){this.state.loading=e,this.notify()}setLoadingMore(e){this.state.loadingMore=e,this.notify()}setCategories(e){this.state.categories=e,this.notify()}setParams(e){this.state.params={...this.state.params,...e},this.notify()}setPagination(e){this.state.pagination={...this.state.pagination,...e},this.notify()}setCurrentProduct(e){this.state.currentProduct=e,this.notify()}setRelatedProducts(e){this.state.relatedProducts=e,this.notify()}setSelectedQuantity(e){this.state.selectedQuantity=e,this.notify()}closeCart(){this.state.openCart=!1,this.notify()}updateProductsData({products:e,total:t,pagination:n,append:r=!1}){r?this.appendProducts(e):this.setProducts(e),this.setTotal(t),this.setPagination(n)}resetPagination(){this.setPagination({page:1,limit:this.state.pagination.limit,hasNext:!0})}incrementPage(){this.setPagination({page:this.state.pagination.page+1})}reset(){this.state={...i},this.notify()}};const o=new a(i);var s=o;async function c(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function l(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function u(){let e=await fetch(`/api/categories`);return await e.json()}const d=`/front_6th_chapter1-1`,f=(e=window.location.pathname)=>e.startsWith(d)?e.slice(21)||`/`:e,p=e=>d+e,m=()=>{let e=new URLSearchParams(window.location.search);return{limit:e.get(`limit`)?parseInt(e.get(`limit`)):20,sort:e.get(`sort`)||`price_asc`,search:e.get(`search`)||``,category1:e.get(`category1`)||``,category2:e.get(`category2`)||``}},h=e=>{let t=m(),n={...t,...e};Object.keys(n).forEach(e=>{(!n[e]||n[e]===``)&&delete n[e]});let r=new URLSearchParams;return Object.entries(n).forEach(([e,t])=>{t&&r.set(e,t)}),r},g=e=>{let t=h(e),n=f(),r=`${p(n)}${t.toString()?`?`+t.toString():``}`;window.history.pushState({},``,r),s.setParams(Object.fromEntries(t.entries()))};function _(e){let t=Number(String(e).replace(/,/g,``));return isNaN(t)?`0`:Math.floor(t).toLocaleString()}const v=({title:e,image:t,lprice:n,productId:r,brand:i})=>`
             <div id="product-card" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
                   data-product-id="${r}">
                <!-- 상품 이미지 -->
                <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image product-item"
                     data-product-id="${r}">
                  <img src="${t}"
                       alt="${e}"
                       class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                       loading="lazy">
                </div>
                <!-- 상품 정보 -->
                <div class="p-3">
                  <div class="cursor-pointer product-info product-item mb-3"
                       data-product-id="${r}">
                    <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      ${e}
                    </h3>
                    <p class="text-xs text-gray-500 mb-2">${i}</p>
                    <p class="text-lg font-bold text-gray-900">
                      ${_(n)}원
                    </p>
                  </div>
                  <!-- 장바구니 버튼 -->
                  <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${r}">
                    장바구니 담기
                  </button>
                </div>
              </div>
`;var ee=v;const y=e=>{console.log(`장바구니 아이템 렌더링:`,e);let t=e.quantity||1,n=parseInt(e.lprice)*t;return`
                  <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e.productId}">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="${e.productId}">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="${e.productId}">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="${e.productId}">
                    ${e.title}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    ${e.lprice}원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="${t}" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" data-product-id="${e.productId}">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    ${n.toLocaleString()}원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="${e.productId}">
                    삭제
                  </button>
                </div>
              </div>
              `},b=()=>{let e=JSON.parse(sessionStorage.getItem(`cart`))||[],t=e?.length||0;return`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div
          class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              장바구니
              ${t>0?`<span class="text-sm font-normal text-gray-600 ml-1">(${t})</span>`:``}
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
          ${e.length>0?`
              <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
                ${e.map(y).join(``)}
            </div>
          </div>
          `:`
              <!-- 빈 장바구니 -->
              <div class="flex-1 flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="text-gray-400 mb-4">
                    <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                  <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                </div>
              </div>`}
          </div>
        </div>
      </div>
    </div>
  `};var te=b;const x=()=>JSON.parse(sessionStorage.getItem(`cart`))||[],S=e=>{sessionStorage.setItem(`cart`,JSON.stringify(e))},C=e=>{let t=x(),n=t.findIndex(t=>t.productId===e.productId);return n===-1?t.push({...e,quantity:1}):t[n].quantity=(t[n].quantity||1)+1,S(t),t},ne=e=>{let t=x(),n=t.filter(t=>t.productId!==e);return S(n),n},w=(e,t)=>{let n=x(),r=n.findIndex(t=>t.productId===e);return r!==-1&&(t<=0?n.splice(r,1):n[r].quantity=t),S(n),n},re=()=>{let e=x();return e.length},ie=`
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div class="h-8 bg-gray-200 rounded"></div>
                </div>
            </div>
`,T=ie.repeat(6),E=e=>`
                <button data-category1="${e}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                   bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  ${e}
                </button>
`,D=e=>`
                <button data-category2="${e}" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                   bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  ${e}
                </button>
`,O=({products:e=[],loading:t=!1,loadingMore:n=!1,total:r=0,categories:i,params:a={},pagination:o={},openCart:s=!1})=>{let c=Object.keys(i),{hasNext:l}=o,{limit:u,sort:d,search:f,category1:p,category2:m}=a,h=i[p],g=h?Object.keys(h):[],_=u||20,v=d||`price_asc`,y=f||``,b=re();return`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-900">
              <a href="/" data-link="">쇼핑몰</a>
            </h1>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                ${b>0?`
                  <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                   ${b}
                 </span>
                `:``}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${y}" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center" style="cursor: pointer;">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <div id="breadcrumb-list" class="flex items-center gap-2">
                <label class="text-sm text-gray-600">카테고리:</label>
                <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
                ${p?`
                <span class="text-xs text-gray-500">&gt;</span>
                <button data-breadcrumb="category1" data-category1="${p}" class="text-xs hover:text-blue-800 hover:underline">${p}</button>`:``}
                ${m?`
                <span class="text-xs text-gray-500">&gt;</span>
                <span class="text-xs text-gray-600 cursor-default">${m}</span>
                `:``}
              </div>
              <!-- 1depth 카테고리 -->
              <div id="category-list" class="flex flex-wrap gap-2">
              ${t?`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`:g?.length?g.map(D).join(``):c.map(E).join(``)}
              </div>
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select id="limit-select"
                        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="10" ${_===10?`selected`:``}>
                    10개
                  </option>
                  <option value="20" ${_===20?`selected`:``}>
                    20개
                  </option>
                  <option value="50" ${_===50?`selected`:``}>
                    50개
                  </option>
                  <option value="100" ${_===100?`selected`:``}>
                    100개
                  </option>
                </select>
              </div>
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option value="price_asc" ${v===`price_asc`?`selected`:``}>가격 낮은순</option>
                  <option value="price_desc" ${v===`price_desc`?`selected`:``}>가격 높은순</option>
                  <option value="name_asc" ${v===`name_asc`?`selected`:``}>이름순</option>
                  <option value="name_desc" ${v===`name_desc`?`selected`:``}>이름 역순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
           <!-- 상품 개수 정보 -->
           ${t?``:`
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">${r}개</span>의 상품
            </div>
            `}

            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <!-- 로딩 스켈레톤 -->
              ${t?T:e.map(ee).join(``)}
              ${n?T:``}
            </div>
            
            <!-- 더 보기 로딩 상태 -->
            ${n?`
            <div class="text-center py-4">
              <div class="inline-flex items-center">
                <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
              </div>
            </div>
            `:l?``:`
                <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
            `}
          </div>
        </div>
      </main>
      <!-- 장바구니 다이얼로그 -->
           ${s?te():``} 
      <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
     <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
            <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
     </div>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `},k=({product:e,relatedProducts:t=[],loading:n=!1})=>{let{title:r,image:i,lprice:a,brand:o,category1:c,category2:l,description:u,rating:d,reviewCount:f,stock:p}=e||{},m=s.getSelectedQuantity();return n?`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `:e?`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            ${c?`
            <button class="breadcrumb-link" data-category1="${c}">
              ${c}
            </button>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            `:``}
            ${l?`
            <button class="breadcrumb-link" data-category2="${l}">
              ${l}
            </button>
            `:``}
          </div>
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="${i}" alt="${r}" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1">${o||``}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  ${Array.from({length:5},(e,t)=>`
                    <svg class="w-4 h-4 ${t<d?`text-yellow-400`:`text-gray-300`}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  `).join(``)}
                </div>
                <span class="ml-2 text-sm text-gray-600">${d.toFixed(1)} (${f}개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">${_(a)}원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 ${p}개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                ${u}
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              <div class="flex items-center">
                <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input type="number" id="quantity-input" value="${m}" min="1" max="10" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <!-- 액션 버튼 -->
            <button id="add-to-cart-btn" data-product-id="${e.productId}" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list">
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        ${t.length>0?`
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              ${t.slice(0,4).map(e=>`
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e.productId}">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                <p class="text-sm font-bold text-blue-600">${e.lprice}원</p>
              </div>
              `).join(``)}
            </div>
          </div>
        </div>
        `:``}
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `:`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-600 mb-4">상품을 찾을 수 없습니다.</p>
            <button id="go-home-button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </main>
    </div>
  `},A=()=>`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
          </filter>
        </defs>
        
        <!-- 404 Numbers -->
        <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
        
        <!-- Icon decoration -->
        <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        
        <!-- Message -->
        <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
        
        <!-- Subtle bottom accent -->
        <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
      </svg>
      
      <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
    </div>
    </main>
  `,j=e=>{let t=document.querySelectorAll(`.category1-filter-btn`);t.forEach(e=>{e.classList.remove(`bg-blue-100`,`border-blue-300`,`text-blue-800`),e.classList.add(`bg-white`,`border-gray-300`,`text-gray-700`,`hover:bg-gray-50`)}),e.classList.remove(`hover:bg-gray-50`),e.classList.add(`bg-blue-100`,`border-blue-300`,`text-blue-800`)},ae=()=>{let e=m(),t=document.getElementById(`limit-select`);t&&(t.value=e.limit);let n=document.getElementById(`sort-select`);n&&(n.value=e.sort);let r=document.getElementById(`search-input`);r&&(r.value=e.search);let i=document.querySelectorAll(`.category1-filter-btn`);i.forEach(t=>{let n=t.dataset.category1;n===e.category1&&j(t)})},M=async e=>{let t=parseInt(e.target.value);g({limit:t}),await X(t)},N=async e=>{let t=e.target.value;g({sort:t}),await Q({sort:t})},oe=`
          <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
            <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          `,se=`
 <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
        </div>
        <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
`,ce=`
 <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <p class="text-sm font-medium">오류가 발생했습니다.</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
`,le=()=>{let e=document.querySelector(`#toast-close-btn`);e&&e.addEventListener(`click`,F)},ue=()=>{let e=document.querySelector(`#toast-close-btn`);e&&e.removeEventListener(`click`,F)},P=e=>{document.getElementById(`snackbar`).innerHTML=`
     <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
     ${e===`addToCart`?oe:e===`removeFromCart`?se:ce}
     </div>
  `,le()},F=()=>{ue(),document.getElementById(`snackbar`).innerHTML=``},de=`addToCart`,I=`error`,L=e=>{let t=e.target,n=t.dataset.breadcrumb;if(n)switch(n){case`reset`:g({category1:``,category2:``}),Z(``,0);break;case`category1`:{let e=t.dataset.category1;e&&(g({category1:e,category2:``}),Z(e,1));break}default:break}},R=e=>{let t=e.target.classList.contains(`category2-filter-btn`);if(!e.target.classList.contains(`category1-filter-btn`)&&!t)return;let n=t?e.target.dataset.category2:e.target.dataset.category1;if(!n){P(I);return}let r=t?2:1;g({[`category${r}`]:n}),j(e.target),Z(n,r)},z=async()=>{let e=document.getElementById(`search-input`);if(e){let t=e.value.trim();console.log(`Search submitted:`,t),g({search:t}),await Q({search:t})}},B=e=>{e.key===`Enter`&&(e.preventDefault(),z())},V=async e=>{try{s.setSelectedQuantity(1),J();let t=await l(e);if(!t)throw Error(`상품을 찾을 수 없습니다.`);let{products:n}=await c({category1:t.category1,limit:6}),r=n.filter(t=>t.productId!==e).slice(0,4);s.setCurrentProduct(t),s.setRelatedProducts(r),J()}catch(e){console.error(`상품 상세 로딩 실패:`,e),s.setCurrentProduct(null),J()}},H=()=>{s.setCurrentProduct(null),s.setRelatedProducts([]);let e=p(`/`);window.history.pushState({},``,e),J()},U=e=>{if(!e.target.classList.contains(`add-to-cart-btn`))return;let t=e.target.dataset.productId;if(t===void 0){P(I);return}let n=s.getProducts().find(e=>e.productId===t);if(!n){P(I);return}let r=C(n);console.log(`장바구니 업데이트:`,r),P(de),J()},W=e=>{console.log(`handleProductDetailClick`,e.target.closest(`#product-card`),e,e.target);let t=e.target.closest(`#product-card`);if(!t||e.target.classList.contains(`add-to-cart-btn`))return;console.log(t.dataset.productId);let n=t.dataset.productId;if(n){let e=p(`/product/${n}`);window.history.pushState({},``,e),V(n)}else P(I)},G=e=>{if(!e.target.classList.contains(`quantity-input`))return;let t=e.target.dataset.productId,n=parseInt(e.target.value);t&&n>0&&(w(t,n),J())},fe=e=>{if(!e.target.classList.contains(`quantity-increase-btn`))return;let t=e.target.dataset.productId,n=document.querySelector(`.quantity-input[data-product-id="${t}"]`);if(n){let e=parseInt(n.value);w(t,e+1),J()}},pe=e=>{if(!e.target.classList.contains(`quantity-decrease-btn`))return;let t=e.target.dataset.productId,n=document.querySelector(`.quantity-input[data-product-id="${t}"]`);if(n){let e=parseInt(n.value);e>1&&(w(t,e-1),J())}},me=e=>{if(!e.target.classList.contains(`cart-item-remove-btn`))return;let t=e.target.dataset.productId;t&&(ne(t),J())},he=()=>{s.openCart(),J()},ge=()=>{let e=document.getElementById(`limit-select`);e&&e.addEventListener(`change`,M);let t=document.getElementById(`sort-select`);t&&t.addEventListener(`change`,N);let n=document.getElementById(`search-input`);n&&n.addEventListener(`keydown`,B);let r=document.getElementById(`category-list`);r&&r.addEventListener(`click`,R);let i=document.getElementById(`breadcrumb-list`);i&&i.addEventListener(`click`,L)},_e=()=>{let e=document.getElementById(`limit-select`);e&&e.removeEventListener(`change`,M);let t=document.getElementById(`sort-select`);t&&t.removeEventListener(`change`,N);let n=document.getElementById(`search-input`);n&&n.removeEventListener(`keydown`,B);let r=document.getElementById(`category-list`);r&&r.removeEventListener(`click`,R);let i=document.getElementById(`breadcrumb-list`);i&&i.removeEventListener(`click`,L)},ve=()=>{let e=document.getElementById(`products-grid`);e&&(e.addEventListener(`click`,W),e.addEventListener(`click`,U))},ye=()=>{let e=document.getElementById(`products-grid`);e&&(e.removeEventListener(`click`,W),e.removeEventListener(`click`,U))},K=e=>{fe(e),pe(e),me(e)},be=()=>{let e=document.getElementById(`cart-dialog`);e&&(e.addEventListener(`change`,G),e.addEventListener(`click`,K))},xe=()=>{let e=document.getElementById(`cart-icon-btn`);e&&e.removeEventListener(`click`,he);let t=document.getElementById(`cart-dialog`);t&&(t.removeEventListener(`change`,G),t.removeEventListener(`click`,K))},Se=()=>{let e=()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight-200&&$()};window.removeEventListener(`scroll`,e),window.addEventListener(`scroll`,e)},Ce=()=>{let e=s.getSelectedQuantity();s.setSelectedQuantity(e+1);let t=document.getElementById(`quantity-input`);t&&(t.value=e+1)},we=()=>{let e=s.getSelectedQuantity();if(e>1){s.setSelectedQuantity(e-1);let t=document.getElementById(`quantity-input`);t&&(t.value=e-1)}},Te=e=>{let t=parseInt(e.target.value);t&&t>0?s.setSelectedQuantity(t):(s.setSelectedQuantity(1),e.target.value=1)},Ee=()=>{let e=s.getCurrentProduct(),t=s.getSelectedQuantity();e&&C(e.productId,t)},De=async e=>{window.history.pushState({},``,`/product/${e}`),await V(e),window.scrollTo(0,0)},Oe=e=>{let t={category1:e,page:1};g(t),s.setCurrentProduct(null),s.setRelatedProducts([]),s.setParams(t),window.history.pushState({},``,`/?category1=${encodeURIComponent(e)}`),r(async()=>{let{updateProducts:e}=await import(`./productService-Dop9GY0L.js`);return{updateProducts:e}},[]).then(({updateProducts:e})=>{e(t)})},q=()=>{s.setCurrentProduct(null),s.setRelatedProducts([]),window.history.pushState({},``,`/`),J()},ke=()=>{let e=document.getElementById(`quantity-decrease`),t=document.getElementById(`quantity-increase`),n=document.getElementById(`quantity-input`);e&&e.addEventListener(`click`,we),t&&t.addEventListener(`click`,Ce),n&&n.addEventListener(`input`,Te);let r=document.getElementById(`add-to-cart-btn`);r&&r.addEventListener(`click`,Ee);let i=document.querySelectorAll(`.related-product-card`);i.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.productId;n&&De(n)})});let a=document.querySelectorAll(`.breadcrumb-link`);a.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.category1,r=e.dataset.category2,i=n||r;i&&Oe(i)})});let o=document.querySelector(`a[data-link=""]`);o&&o.addEventListener(`click`,e=>{e.preventDefault(),q()});let s=document.querySelector(`.go-to-product-list`);s&&s.addEventListener(`click`,e=>{e.preventDefault(),q()});let c=document.getElementById(`go-home-button`);c&&c.addEventListener(`click`,e=>{e.preventDefault(),q()})},Ae=()=>{let e=p(`/`);window.history.pushState({},``,e),window.location.reload()},je=()=>{let e=document.getElementById(`go-home-btn`);e&&e.addEventListener(`click`,e=>{e.preventDefault(),Ae()})},J=()=>{_e(),ye(),xe();let e=s.getState(),t=f(),n=``;n=t.startsWith(`/product/`)?k({product:e.currentProduct,relatedProducts:e.relatedProducts,loading:e.loading}):t===`/`||t===``?O({...e,params:e.params||m()}):A(),document.body.querySelector(`#root`).innerHTML=n,t.startsWith(`/product/`)?(Y(),ke()):t===`/`||t===``?(ae(),Se()):je(),ge(),ve(),be()},Y=()=>{let e=document.getElementById(`back-btn`);e&&e.addEventListener(`click`,H)},X=async(e=20)=>{s.setPagination({limit:e});try{let t=m(),{products:n,pagination:{hasNext:r,total:i,page:a}}=await c({...t,limit:e,page:1});s.setProducts(n),s.setTotal(i),s.setPagination({hasNext:r,page:a}),J()}catch(e){console.error(`상품 로딩 실패:`,e),J()}},Z=async(e,t=1)=>{t===0?s.setParams({category1:``,category2:``}):(s.setParams({[`category${t}`]:e}),t===1&&s.setParams({category2:``})),s.resetPagination(),J();try{let n=m(),r={...n,page:1};t===0?(delete r.category1,delete r.category2):(r[`category${t}`]=e,t===1&&delete r.category2);let{products:i,pagination:{hasNext:a,total:o,page:l,limit:u}}=await c(r);s.setProducts(i),s.setTotal(o),s.setPagination({hasNext:a,page:l,limit:u}),J()}catch(e){console.error(`카테고리 상품 로딩 실패:`,e),J()}},Q=async(e={},t=!1)=>{t?s.setLoadingMore(!0):(s.setLoading(!0),s.resetPagination()),J();try{let n=s.getState(),r={...e,page:t?n.pagination.page+1:1,limit:n.pagination.limit,search:e.search||n.params.search||``},{products:i,pagination:{hasNext:a,total:o,page:l,limit:u}}=await c(r);t?(s.appendProducts(i),s.setPagination({page:l})):(s.setProducts(i),s.setPagination({page:l})),s.setTotal(o),s.setPagination({limit:u,hasNext:a}),s.setLoading(!1),s.setLoadingMore(!1),J()}catch(e){console.error(`상품 로딩 실패:`,e),s.setLoading(!1),s.setLoadingMore(!1),J()}},$=async()=>{let e=s.getState();if(e.loadingMore||!e.pagination.hasNext)return;let t=m();await Q(t,!0)},Me=()=>{window.addEventListener(`popstate`,async()=>{let e=f();if(e.startsWith(`/product/`)){let t=e.split(`/`)[2];await V(t)}else if(e===`/`){let e=m();s.setParams(e),await Q(e)}else J()})},Ne=async()=>{let e=f();if(e.startsWith(`/product/`)){let t=e.split(`/`)[2];await V(t)}else e===`/`?await Pe():J()},Pe=async()=>{let e=m();s.setParams(e),s.setPagination({limit:parseInt(e.limit)||20,page:1}),s.setLoading(!0),J();let[{products:t,pagination:{hasNext:n,total:r,page:i,limit:a}},o]=await Promise.all([c({...e,page:1,limit:s.getPagination().limit}),u({})]);s.setProducts(t),s.setTotal(r),s.setPagination({page:i,limit:a,hasNext:n}),s.setCategories(o),s.setLoading(!1),J()},Fe=async()=>{Me(),await Ne()},Ie=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-CCM66A6d.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));Ie().then(Fe);export{$ as b,Z as c,X as d,Q as e};