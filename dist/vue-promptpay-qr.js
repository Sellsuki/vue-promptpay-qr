(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('promptpay-qr'), require('qrcode')) :
	typeof define === 'function' && define.amd ? define(['promptpay-qr', 'qrcode'], factory) :
	(global['vue-promptpay-qr'] = factory(global.generatePayload,global.qr));
}(this, (function (generatePayload,qr) {

generatePayload = generatePayload && generatePayload.hasOwnProperty('default') ? generatePayload['default'] : generatePayload;
qr = qr && qr.hasOwnProperty('default') ? qr['default'] : qr;

var PromptpayQr$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"200px, height:200px"},domProps:{"innerHTML":_vm._s(_vm.qrString)}})},staticRenderFns: [],
  props: {
    id: { type: String, required: true },
    amount: { type: Number, required: true }
  },
  data: function data () {
    return {
      qrString: ''
    }
  },
  watch: {
    id: function id (newId) {
      this.generateSvg();
    },
    amount: function amount (newAmount) {
      this.generateSvg();
    }
  },
  methods: {
    generateSvg: function generateSvg () {
      var this$1 = this;

      qr.toString(generatePayload(this.id, { amount: this.amount }), { type: 'svg', errorCorrectionLevel: 'L' }, function (err, svg) {
        if (err) {
          window.alert('Cannot generate QR code: ' + String(err));
          return
        }
        this$1.qrString = svg;
      });
    }
  },
  mounted: function mounted () {
    this.generateSvg();
  }
};

PromptpayQr$1.install = function (Vue) {
  Vue.component('promptpay-qr', PromptpayQr$1);
};

return PromptpayQr$1;

})));
