(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./src/Mixin.js":
/*!**********************!*\
  !*** ./src/Mixin.js ***!
  \**********************/
/*! exports provided: useBackgroundImgMixin, useSubBackgroundImgMixin, useVue2FlipCountdownMixin, useDateFormat, useAdaptHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useBackgroundImgMixin\", function() { return useBackgroundImgMixin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useSubBackgroundImgMixin\", function() { return useSubBackgroundImgMixin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useVue2FlipCountdownMixin\", function() { return useVue2FlipCountdownMixin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useDateFormat\", function() { return useDateFormat; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useAdaptHeight\", function() { return useAdaptHeight; });\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.js\");\n// 设置一级路由背景图及标题\n\n\nvar useBackgroundImgMixin = {\n  data: function data() {\n    return {\n      title: ''\n    };\n  },\n  mounted: function mounted() {\n    var pageData = this.$route.meta;\n    this.title = pageData.label;\n    this.$refs.backgroundImg.style.backgroundImage = \"url(\".concat(pageData.imgUrl, \")\");\n    this.$refs.backgroundImg.style.backgroundRepeat = \"no-repeat\"; //设置背景不平铺\n\n    this.$refs.backgroundImg.style.backgroundPosition = \"center\"; //设置背景图的位置\n\n    this.$refs.backgroundImg.style.backgroundSize = \"cover\"; //设置背景图像的尺寸\n  }\n}; // 设置子路由背景图及标题\n\nvar useSubBackgroundImgMixin = {\n  data: function data() {\n    return {\n      title: ''\n    };\n  },\n  watch: {\n    $route: function $route(to, from) {\n      var pageData = to.meta;\n      this.title = pageData.label;\n      this.$refs.backgroundImg.style.backgroundImage = \"url(\".concat(pageData.imgUrl, \")\");\n      this.$refs.backgroundImg.style.backgroundRepeat = \"no-repeat\"; //设置背景不平铺\n\n      this.$refs.backgroundImg.style.backgroundPosition = \"center\"; //设置背景图的位置\n\n      this.$refs.backgroundImg.style.backgroundSize = \"cover\"; //设置背景图像的尺寸\n    }\n  }\n};\nvar useVue2FlipCountdownMixin = {\n  data: function data() {\n    return {\n      currentYear: new Date().getFullYear()\n    };\n  },\n  methods: {\n    timeElapsedHandle: function timeElapsedHandle() {\n      this.currentYear += 1;\n    }\n  },\n  computed: {\n    deadline: function deadline() {\n      return \"\".concat(this.currentYear, \"-12-23 00:00:00\");\n    }\n  }\n};\nvar useDateFormat = {\n  methods: {\n    formatDate: function formatDate(time) {\n      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"YYYY年MM月DD日 HH:mm:ss\";\n      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(time).format(format);\n    }\n  }\n};\nvar useAdaptHeight = {\n  mounted: function mounted() {}\n};\n\n//# sourceURL=webpack:///./src/Mixin.js?");

/***/ })

}]);