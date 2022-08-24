(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./src/Adapt.js":
/*!**********************!*\
  !*** ./src/Adapt.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store_storeModel_webStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store/storeModel/webStore */ \"./src/store/storeModel/webStore.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.js\");\n/**\r\n * @Author：雨落\r\n * @Dir：src\r\n * @Time：2022/8/23 09:41:40\r\n */\n\n\n\n(function () {\n  var computed = {\n    articleNum: _store_storeModel_webStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.sidebar.userInfoArea.info.article\n  };\n  var footer = document.getElementsByClassName('h-footer-wrapper')[0];\n\n  if (computed.articleNum < 5) {\n    var sidebar = document.getElementsByClassName('h-sidebar')[0];\n    var height = parseInt(getComputedStyle(sidebar).height);\n    footer.style.marginTop = height + 'px';\n  }\n\n  if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isDeviceMobile\"])(navigator.userAgent)) {\n    setTimeout(function () {\n      document.body.style.minHeight = footer.getBoundingClientRect().y + 190 + 'px';\n    }, 300);\n  }\n})(window);\n\n//# sourceURL=webpack:///./src/Adapt.js?");

/***/ })

}]);