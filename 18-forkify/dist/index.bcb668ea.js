function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,r={},n={},i=t.parcelRequire3a11;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequire3a11=i),(0,i.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>r,set:e=>r=e,enumerable:!0,configurable:!0});var r,n=new Map;r=function(e,t){for(var r=0;r<t.length-1;r+=2)n.set(t[r],{baseUrl:e,path:t[r+1]})}}),i("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["f9fpV","index.bcb668ea.js","eyyUD","icons.c14567a0.svg"]'));const a="https://forkify-api.herokuapp.com/api/v2/recipes/",s="ae4ac6c7-f1b0-4a7b-a4e0-1264ef91b516",o=async function(e,t){try{let r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),n=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 5 second"))},5e3)})]),i=await n.json();if(!n.ok)throw Error(`${i.message} (${n.status})`);return i}catch(e){throw e}},c={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},l=function(e){let{recipe:t}=e.data;// let recipe = data.data.recipe
return{id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}}},d=async function(e){try{let t=await o(`${a}${e}?key=${s}`);c.recipe=l(t),c.bookmarks.some(t=>t.id===e)?c.recipe.bookmarked=!0:c.recipe.bookmarked=!1}catch(e){throw e}},u=async function(e){try{let t=await o(`${a}?search=${e}&key=${s}`);c.search.query=e,c.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),c.search.page=1}catch(e){throw e}},p=function(e=c.search.page){c.search.page=e;let t=(e-1)*c.search.resultsPerPage,r=e*c.search.resultsPerPage;return c.search.results.slice(t,r)},g=function(e){c.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/c.recipe.servings}),c.recipe.servings=e},h=function(){localStorage.setItem("bookmarksStorage",JSON.stringify(c.bookmarks))},_=function(e){c.bookmarks.push(e),e.id===c.recipe.id&&(c.recipe.bookmarked=!0),h()},f=function(e){let t=c.bookmarks.findIndex(t=>t.id===e);c.bookmarks.splice(t,1),e===c.recipe.id&&(c.recipe.bookmarked=!1),h()},v=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("Wrong ingredient format.");let[r,n,i]=t;return{quantity:r?Number(r):null,unit:n,description:i}}),r={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:Number(e.cookingTime),servings:Number(e.servings),ingredients:t},n=await o(`${a}?key=${s}`,r);c.recipe=l(n),_(c.recipe)}catch(e){throw e}};!function(){let e=localStorage.getItem("bookmarksStorage");e&&(c.bookmarks=JSON.parse(e))}();var m={};m=new URL("icons.c14567a0.svg",import.meta.url).toString();class k{_data;/**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   */render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e){this._data=e;let t=this._generateMarkup(),r=document.createRange().createContextualFragment(t),n=Array.from(r.querySelectorAll("*")),i=Array.from(this._parentElement.querySelectorAll("*"));n.forEach((e,t)=>{let r=i[t];e.isEqualNode(r)||e.firstChild?.nodeValue.trim()===""||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}renderSpinner(){let t=`
            <div class="spinner">
              <svg>
                <use href="${/*@__PURE__*/e(m)}#icon-loader"></use>
              </svg>
            </div`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderError(t=this._errorMessage){let r=`<div class="error">
        <div>
          <svg>
            <use href="${/*@__PURE__*/e(m)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${t}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderMessage(t=this._successMessage){let r=`<div class="message">
          <div>
            <svg>
              <use href="${/*@__PURE__*/e(m)}#icon-smile"></use>
            </svg>
          </div>
          <p>${t}</p>
        </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}_clear(){this._parentElement.innerHTML=""}}var b={};//FRACTY REDUCES THE FRACTION.
function y(e,t,r,n,i){var a,s,o;let c=[2,3,5];//If the numerator isn't from a repeating decimal case, the initialized array of prime numbers will suffice to find the common denominators.
if(!0===i)for(let t=3;t*t<=e;t+=2)e%t==0&&c.push(t);let l=0,d=e,u=t;//Initialize counter over the prime number array for the while loop.
for(;l<=c.length;)d%c[l]==0&&u%c[l]==0?(c[l],d/=c[l],u/=c[l]):l++;return a=u,s=d,o=r,1===a&&1===s?(o=`${n}${(parseInt(o)+1).toString()}`,`${o}`):0===s?`${n}${o}`:"0"==o?`${n}${s}/${a}`:`${n}${o} ${s}/${a}`//If there's an integer and a fraction return both.
}// FRACTY CONVERTS DECIMAL NUMBERS TO FRACTIONS BY ASSUMING THAT TRAILING PATTERNS FROM 10^-2 CONTINUE TO REPEAT
// The assumption is based on the most standard numbering conventions
// e.g. 3.51 will convert to 3 51/100 while 3.511 will convert to 3 23/45
// Throw any number up to 16 digits long at fracty and let fracy do the work.
// If number is beyond 16 digits fracty will truncate at 15 digits to compensate for roundoff errors created in IEEE 754 Floating Point conversion.
b=function(e){let t,r;if(e<0?(e=Math.abs(e),t="-"):t="",void 0===e)return"Your input was undefined.";if(isNaN(e))return`"${e}" is not a number.`;if(1e16==e)return`${t}9999999999999999`;if(e>1e16)return"Too many digits in your integer to maintain IEEE 754 Floating Point conversion accuracy.";if(Number.isInteger(e))return`${t}${e}`;if(e<1e-6)return"0";let n=e.toString(),i=n.split("."),a=i[0];if("0"==r&&"0"!==a)return a;if("0"==r&&"0"==a)return"0";if("99"==(r=n.length>=17?i[1].slice(0,i[1].length-1):i[1])&&"0"!==a)return`${a} 99/100`;if("99"==r&&"0"==a)return"99/100";if(1-parseFloat(`.${r}`)<.0011&&(r="999"),void 0==r)return a;let s=r.split("").reverse().join(""),o=s.match(/^(\d+)\1{1,2}/);//Reverse the string to look for patterns.
if(!o||!(r.length>2))return(//IF THERE'S NO TRAILING PATTERN FRACTY DIVIDES THE INPUT BY THE NEAREST BASE 10 INTEGER GREATER THAN THE NUMERATOR.
function(e,t,r){let n=parseInt(e,10),i=Math.pow(10,e.length);//Numerator begins as decimal input converted into an integer.
return y(n,i,t,r,!1);//Reduce the numerator and denominator.
}(r,a,t));//Begin calculating the numerator and denominator for decimals that don't have a pattern.
{let e=o[0].split("").reverse().join(""),n=o[1].split("").reverse().join("");if(n.length>1){let e=n.split(""),t=1;for(let r=0;r<e.length;r++)t/=e[0]/e[r];1===t&&(n=e[0])}return n.length>1&&n.length%2==0&&(n=parseInt(n.slice(0,n.length/2),10)-parseInt(n.slice(n.length/2,n.length),10)==0?n.slice(0,n.length/2):n),//IF THERE'S A TRAILING PATTERN FRACTY DIVIDES THE INPUT BY ONE SUBTRACTED FROM THE NEAREST BASE 10 NUMBER WITH NUMBER OF ZEROS EQUAL TO THE LENGTH OF THE REPEATED PATTERN (I.E. A SERIES OF 9'S) MULTIPLIED BY THE BASE 10 NUMBER GREATER THAN AND CLOSEST TO THE INPUT.
function(e,t,r,n,i){let a=e.length-r.length>=1?e.length-r.length:1,s=Math.pow(10,a),o=parseFloat(`0.${e}`),c=Math.pow(10,t.length),l=Math.round((o*c-o)*Math.pow(10,a));//Does the length of the non pattern segment of the input = 0? If it does, that's incorrect since we know it must equal at least 1, otherwise it's the length of the decimal input minus the length of the full pattern.
return y(l,(c-1)*s,n,i,!0);//Further reduce the numerator and denominator.
}(r,n,e,a,t);//Begin calculating the numerator and denominator for decimals that have a pattern.
}};class w extends k{_parentElement=document.querySelector(".recipe");_errorMessage="We could not find that recipe. Please try another one.";_successMessage="Nice";addHandlerRenderer(e){// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handlerFunction));
window.addEventListener("hashchange",e),window.addEventListener("load",e)}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--update-servings");if(!r)return;let n=Number(r.dataset.updateTo);n>0&&e(n)})}addHandlerAddBookmark(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--bookmark");r&&e()})}_generateMarkup(){return`
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${/*@__PURE__*/e(m)}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${/*@__PURE__*/e(m)}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-to="${this._data.servings-1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${/*@__PURE__*/e(m)}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-to="${this._data.servings+1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${/*@__PURE__*/e(m)}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
          <svg>
                <use href="${/*@__PURE__*/e(m)}#icon-user"></use>
              </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${/*@__PURE__*/e(m)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

      ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${/*@__PURE__*/e(m)}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`}_generateMarkupIngredient(t){return`
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${/*@__PURE__*/e(m)}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${t.quantity?/*@__PURE__*/e(b)(t.quantity):""}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${t.unit}</span> ${t.description}
          </div>
        </li>`}}var $=new w;class E{_parentElement=document.querySelector(".search");getQuery(){let e=this._parentElement.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentElement.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var M=new E,S=new class extends k{_parentElement="";_generateMarkup(){let t=window.location.hash.slice(1);return`
        <li class="preview">
            <a class="preview__link ${this._data.id===t?"preview__link--active":""}" href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.image}" alt="${this._data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this._data.title}</h4>
                    <p class="preview__publisher">${this._data.publisher}</p>
                    <div class="preview__user-generated ${this._data.key?"":"hidden"}">
                        <svg>
                            <use href="${/*@__PURE__*/e(m)}#icon-user"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li >`}};class H extends k{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query. Please try again.";_successMessage="Nice";_generateMarkup(){return this._data.map(e=>S.render(e,!1)).join("")}}var q=new H;class x extends k{_parentElement=document.querySelector(".bookmarks__list");_errorMessage="No bookmarks yet. Find a nice recipe and bookmark it.";_successMessage="Nice";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>S.render(e,!1)).join("")}}var N=new x;class L extends k{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");if(!r)return;let n=Number(r.dataset.goto);e(n)})}_generateMarkup(){let e=Math.ceil(this._data.results.length/this._data.resultsPerPage);return(// Page 1, and there are other pages
1===this._data.page&&e>1?this._getNextBtnMarkup():this._data.page===e&&e>1?this._getPrevBtnMarkup():this._data.page<e?`${this._getPrevBtnMarkup()}${this._getNextBtnMarkup()}`:"")}_getPrevBtnMarkup(){return`
        <button data-goto="${this._data.page-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${/*@__PURE__*/e(m)}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
        </button >`}_getNextBtnMarkup(){return`
        <button data-goto="${this._data.page+1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page+1}</span>
            <svg class="search__icon">
                <use href="${/*@__PURE__*/e(m)}#icon-arrow-right"></use>
            </svg>
        </button >`}}var P=new L;class T extends k{_parentElement=document.querySelector(".upload");_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");_successMessage="Recipe was successfully uploaded";// constructor() {
//     super();
//     this._addHandlerShowWindow();
// }
toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault();let r=[...new FormData(this)],n=Object.fromEntries(r);e(n)})}_generateMarkup(){}}var A=new T;// https://forkify-api.herokuapp.com/v2
// from Parcel
// if (module.hot) {
//   module.hot.accept();
// }
const j=async function(){try{let e=window.location.hash.slice(1);if(!e)return;$.renderSpinner(),q.update(p()),N.update(c.bookmarks),// 2) Loading recipe
await d(e),$.render(c.recipe)}catch(e){$.renderError()}},R=async function(){try{q.renderSpinner();// 1) Get search query
let e=M.getQuery();if(!e)return;// 2) Load search
await u(e),q.render(p()),P.render(c.search)}catch(e){console.log(e.message)}},I=async function(e){try{A.renderSpinner(),// Upload new recipe
await v(e),$.render(c.recipe),A.renderMessage(),N.render(c.bookmarks),// Change ID in url
window.history.pushState(null,"",`#${c.recipe.id}`),// Close form window
setTimeout(function(){A.toggleWindow()},2500)}catch(e){A.renderError(e.message)}};A.addHandlerShowWindow(),A.addHandlerHideWindow(),N.addHandlerRender(function(){N.render(c.bookmarks)}),$.addHandlerRenderer(j),$.addHandlerUpdateServings(function(e){// Update the recipe servings (in state)
g(e),$.update(c.recipe)}),$.addHandlerAddBookmark(function(){c.recipe.bookmarked?f(c.recipe.id):_(c.recipe),$.update(c.recipe),N.render(c.bookmarks)}),M.addHandlerSearch(R),P.addHandlerClick(function(e){q.render(p(e)),P.render(c.search)}),A.addHandlerUpload(I);//# sourceMappingURL=index.bcb668ea.js.map

//# sourceMappingURL=index.bcb668ea.js.map
