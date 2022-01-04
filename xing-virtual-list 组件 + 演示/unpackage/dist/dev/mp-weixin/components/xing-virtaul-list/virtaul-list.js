(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/xing-virtaul-list/virtaul-list"],{

/***/ 23:
/*!************************************************************************************************************!*\
  !*** C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtaul-list.vue?vue&type=template&id=062d2df2&scoped=true& */ 24);
/* harmony import */ var _virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./virtaul-list.vue?vue&type=script&lang=js& */ 26);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./virtaul-list.vue?vue&type=style&index=0&id=062d2df2&scoped=true&lang=css& */ 32);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "062d2df2",
  null,
  false,
  _virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/xing-virtaul-list/virtaul-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 24:
/*!*******************************************************************************************************************************************************!*\
  !*** C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=template&id=062d2df2&scoped=true& ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./virtaul-list.vue?vue&type=template&id=062d2df2&scoped=true& */ 25);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_template_id_062d2df2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 25:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=template&id=062d2df2&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.visibleItems, function(item, index) {
    var $orig = _vm.__get_orig(item)

    var m0 = _vm.getKey(_vm.actualStart, index)

    if (_vm.$scope.data.scopedSlotsCompiler === "augmented") {
      _vm.$setScopedSlotsParams("default", {
        item: $orig,
        index: _vm.visibleItemsIndex[index]
      })
    }

    return {
      $orig: $orig,
      m0: m0
    }
  })

  var l1 = _vm.__map(_vm.measureItems, function(item, index) {
    var $orig = _vm.__get_orig(item)

    if (_vm.$scope.data.scopedSlotsCompiler === "augmented") {
      _vm.$setScopedSlotsParams("default", {
        item: $orig,
        index: index
      })
    }

    return {
      $orig: $orig
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 26:
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./virtaul-list.vue?vue&type=script&lang=js& */ 27);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 27:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 34));















































var _PrefixSumManage = _interopRequireDefault(__webpack_require__(/*! ./PrefixSumManage */ 28));
var _utils = __webpack_require__(/*! ./utils */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default2 =
{
  props: {
    dataSources: {
      // 数据源 还需要在 mouted 生命周期
      type: Array,
      required: true },

    dataKey: {
      // key 可以是键名可以是函数
      type: [String, Function],
      default: function _default(_item, index) {return index;} },

    height: {
      type: [Number, String], // 视口高,
      required: true },

    preRender: {
      // 预渲染数
      type: [Number, Array],
      default: 5 },

    calculteMax: {
      // 计算高度最大值，用于分片
      type: Number,
      default: 100 },

    throttle: {
      //节流间隔
      type: [Boolean, Number],
      default: false },

    customStyle: {
      type: String,
      default: '' },

    customClass: {
      type: String,
      default: '' },

    lowerThreshold: {
      type: [Number, String],
      default: 50 },

    upperThreshold: {
      type: [Number, String],
      default: 50 },

    scrollTop: [Number, String],
    scrollIntoView: String,
    scrollWithAnimation: {
      type: Boolean,
      default: false },

    enableBackToTop: {
      type: Boolean,
      default: false },

    refresherEnabled: {
      type: Boolean,
      default: false },

    refresherThreshold: {
      type: Number,
      default: 45 },

    refresherDefaultStyle: {
      type: String,
      default: 'black' },

    refresherBackground: {
      type: String,
      default: '#FFF' },

    refresherTriggered: {
      type: Boolean,
      default: false },

    enableFlex: {
      type: Boolean,
      default: false },

    scrollAnchoring: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      start: 0,
      end: 0, // 截取 [start,end]
      lastScrollTop: 0, // 上次滚动的位置
      prefixSum: [],
      measureItems: [],
      scrollDomHeight: 0 };

  },
  computed: {
    /* props 处理 */
    calcHeight: function calcHeight() {
      return Number.isNaN(+this.height) ? this.height : this.height + 'px';
    },
    style: function style() {
      return "".concat(this.customStyle, ";height: ").concat(this.calcHeight, ";position: relative !important;");
    },
    scrollHeight: function scrollHeight() {
      return Math.max(
      this.scrollDomHeight + this.lowerThreshold,
      this.prefixSum[this.prefixSum.length - 1]);

    },
    getKey: function getKey() {var _this = this;
      return typeof this.dataKey === 'string' // 小程序模板中无法写表达式所以需要方法
      ? function (item) {return item[_this.dataKey];} :
      typeof this.dataKey === 'function' ?
      this.dataKey :
      function (_item, index) {return index;};
    },
    preRenderNums: function preRenderNums() {
      var preRender = this.preRender;
      return typeof preRender === 'number' ? [preRender, preRender] : preRender;
    },

    /* start end items 处理 */
    actualStart: function actualStart() {
      var start = this.start - this.preRenderNums[0];
      return start < 0 ? 0 : start;
    },
    actualEnd: function actualEnd() {
      var end = this.end + this.preRenderNums[1];
      return end >= this.dataSources.length ? this.dataSources.length - 1 : end;
    },
    visibleItems: function visibleItems() {
      return this.dataSources.slice(this.actualStart, this.actualEnd + 1); // [actualStart, actualEnd] 所以 end + 1
    },
    visibleItemsIndex: function visibleItemsIndex() {var _this2 = this;
      return this.visibleItems.map(function (_, i) {return _this2.actualStart + i;});
    },
    scrollTopPosition: function scrollTopPosition() {
      return this.prefixSum[this.actualStart - 1];
    } },

  created: function created() {
    this.$on('shouldCalculate', this.measureDoms);
    this.$on('prefixSumChanged', this.reCalculatePostion);
    this.$on('prefixSumChanged', this.deletetolower);
  },
  beforeDestroy: function beforeDestroy() {
    this.$off();
  },
  methods: {
    /* 初始化 */
    initDataSources: function initDataSources(dataSources) {
      if (!this.prefixSumManage) {
        this.prefixSumManage = new _PrefixSumManage.default({
          prefixSum: this.prefixSum,
          vm: this,
          calculteMax: this.calculteMax });

      }
      return this.prefixSumManage.initOrigin(dataSources);
    },

    /* 测量 */
    measureDoms: function measureDoms(_ref) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this3$measureItems;var items, feedback, query;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:items = _ref.items, feedback = _ref.feedback;
                (_this3$measureItems = _this3.measureItems).push.apply(_this3$measureItems, _toConsumableArray(items));_context.next = 4;return (
                  _this3.$nextTick());case 4:
                query = uni.
                createSelectorQuery().
                in(_this3).
                selectAll('.measure');
                query.
                boundingClientRect(function (doms) {
                  _this3.measureItems = [];
                  feedback(doms.map(function (dom) {return dom.height;}));
                }).
                exec();case 6:case "end":return _context.stop();}}}, _callee);}))();
    },
    queryScrollHeight: function queryScrollHeight(e) {var _this4 = this;
      var query = uni.
      createSelectorQuery().
      in(this).
      select('#cycle-list');
      query.boundingClientRect(function (dom) {return _this4.scrollDomHeight = dom.height;}).exec();
    },

    /* 计算位置 */
    reCalculatePostion: function reCalculatePostion() {var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},index = _ref2.index;
      this.calculateRenderPostion(this.lastScrollTop, index);
    },
    _calculateRenderPostion: function _calculateRenderPostion(scrollTop, index) {
      if (index === undefined) index = this.start;
      this.start = this.prefixSumManage.search(scrollTop, index);
      this.end = this.prefixSumManage.search(
      scrollTop + this.scrollDomHeight,
      this.start);

      this.lastScrollTop = scrollTop;
    },

    /* 事件 */
    scrolltoupper: function scrolltoupper(ev) {
      this.$emit('scrolltoupper', ev);
    },
    scrolltolower: function scrolltolower(ev) {
      this.$emit('scrolltolower', ev);
    },
    scroll: function scroll(ev) {
      var scrollTop = ev.detail.scrollTop;
      this.calculateRenderPostion(scrollTop);
      this.$emit('scroll', ev);
    },
    click: function click(ev) {
      this.$emit('click', ev);
    },
    refresherpulling: function refresherpulling(ev) {
      this.$emit('refresherpulling', ev);
    },
    refresherrefresh: function refresherrefresh(ev) {
      this.$emit('refresherrefresh', ev);
    },
    refresherrestore: function refresherrestore(ev) {
      this.$emit('refresherrestore', ev);
    },
    refresherabort: function refresherabort(ev) {
      this.$emit('refresherabort', ev);
    },
    deletetolower: function deletetolower() {
      // 删除 item 导致的 index 触底
      if (
      // type === 'delete' &&
      this.prefixSum[this.prefixSum.length - 1] < this.scrollDomHeight)
      {
        this.$emit('deletetolower');
      }
    } },

  watch: {
    throttle: {
      handler: function handler() {
        if (this.throttle === false)
        this.calculateRenderPostion = this._calculateRenderPostion;else
        {
          this.calculateRenderPostion = (0, _utils.throttle)(
          this._calculateRenderPostion,
          typeof this.throttle === 'number' ? this.throttle : 50);

        }
      },
      immediate: true },

    height: function height() {
      this.$nextTick(this.queryScrollHeight);
    },
    scrollDomHeight: function scrollDomHeight() {
      this.reCalculatePostion();
    },
    calculteMax: function calculteMax() {
      this.prefixSumManage.calculteMax = this.calculteMax;
    }
    // prefixSum(){
    // 	console.log(this.prefixSum)
    // },
    // dataSources() {
    // 	this.prefixSumManage.initOrigin(this.dataSources); // dataSources 引用改变即重置
    // },
  } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 32:
/*!*********************************************************************************************************************************************************************!*\
  !*** C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=style&index=0&id=062d2df2&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./virtaul-list.vue?vue&type=style&index=0&id=062d2df2&scoped=true&lang=css& */ 33);
/* harmony import */ var _E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_virtaul_list_vue_vue_type_style_index_0_id_062d2df2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 33:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/星星/Desktop/项目/小程序组件/xing-virtual-list 组件 + 演示/components/xing-virtaul-list/virtaul-list.vue?vue&type=style&index=0&id=062d2df2&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/xing-virtaul-list/virtaul-list.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/xing-virtaul-list/virtaul-list-create-component',
    {
        'components/xing-virtaul-list/virtaul-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(23))
        })
    },
    [['components/xing-virtaul-list/virtaul-list-create-component']]
]);
