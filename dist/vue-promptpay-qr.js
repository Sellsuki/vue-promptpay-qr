(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('qrcode.vue')) :
	typeof define === 'function' && define.amd ? define(['qrcode.vue'], factory) :
	(global['vue-promptpay-qr'] = factory(global.QrcodeVue));
}(this, (function (QrcodeVue) {

QrcodeVue = QrcodeVue && QrcodeVue.hasOwnProperty('default') ? QrcodeVue['default'] : QrcodeVue;

var CRC = require('crc');

var encode = function (jsonData) {
  var post = jsonData;

  if (post.pointOfInitiation) {
    if (!post.payloadFormat) {
      post.payloadFormat = '01';
    }

    if (!post.pointOfInitiation) {
      post.pointOfInitiation = '11';
    }

    var result = '';
    if (Object.keys(post.merchantAccPromptpay).length) {
      post.merchantAccPromptpay.aid = 'A000000677010111';
      var aid = 0;
      var mobileNumber = 0;
      var nationalId = 0;
      var ewalletId = 0;
      var bankAccount = 0;
      aid = post.merchantAccPromptpay.aid.length + 4;
      if (post.merchantAccPromptpay.mobileNumber) {
        mobileNumber = post.merchantAccPromptpay.mobileNumber.length + 4;
      }
      if (post.merchantAccPromptpay.nationalId) {
        nationalId = post.merchantAccPromptpay.nationalId.length + 4;
      }
      if (post.merchantAccPromptpay.ewalletId) {
        ewalletId = post.merchantAccPromptpay.ewalletId.length + 4;
      }
      if (post.merchantAccPromptpay.bankAccount) {
        bankAccount = post.merchantAccPromptpay.bankAccount.length + 4;
      }
      result = '29' + (aid + mobileNumber + nationalId + ewalletId + bankAccount);
      if (post.merchantAccPromptpay.aid) {
        result += '00' + zero(post.merchantAccPromptpay.aid.length) + post.merchantAccPromptpay.aid;
      }
      if (post.merchantAccPromptpay.mobileNumber) {
        result += '01' + zero(post.merchantAccPromptpay.mobileNumber.length) + post.merchantAccPromptpay.mobileNumber;
      }
      if (post.merchantAccPromptpay.nationalId) {
        result += '02' + zero(post.merchantAccPromptpay.nationalId.length) + post.merchantAccPromptpay.nationalId;
      }
      if (post.merchantAccPromptpay.ewalletId) {
        result += '03' + zero(post.merchantAccPromptpay.ewalletId.length) + post.merchantAccPromptpay.ewalletId;
      }
      if (post.merchantAccPromptpay.bankAccount) {
        result += '04' + zero(post.merchantAccPromptpay.bankAccount.length) + post.merchantAccPromptpay.bankAccount;
      }
    }

    if (Object.keys(post.merchant).length) {
      if (post.merchant.mcc) {
        result += '52' + zero(post.merchant.mcc.length) + post.merchant.mcc;
      }
      if (post.merchant.countryCode) {
        result += '58' + zero(post.merchant.countryCode.length) + post.merchant.countryCode;
      }
      if (post.merchant.merchantName) {
        result += '59' + zero(post.merchant.merchantName.length) + post.merchant.merchantName;
      }
      if (post.merchant.merchantCity) {
        result += '60' + zero(post.merchant.merchantCity.length) + post.merchant.merchantCity;
      }
      if (post.merchant.merchantLanguage) {
        var localLang = 0;
        var merchantName = 0;
        var merchantCity = 0;
        if (post.merchant.merchantLanguage.localLang) {
          localLang = post.merchant.merchantLanguage.localLang.length + 4;
        }
        if (post.merchant.merchantLanguage.merchantName) {
          merchantName = post.merchant.merchantLanguage.merchantName.length + 4;
        }
        if (post.merchant.merchantLanguage.merchantCity) {
          merchantCity = post.merchant.merchantLanguage.merchantCity.length + 4;
        }
        result += '64' + (localLang + merchantName + merchantCity);
        if (post.merchant.merchantLanguage.localLang) {
          result += '00' + zero(localLang - 4) + post.merchant.merchantLanguage.localLang;
        }
        if (post.merchant.merchantLanguage.merchantName) {
          result += '01' + zero(merchantName - 4) + post.merchant.merchantLanguage.merchantName;
        }
        if (post.merchant.merchantLanguage.merchantCity) {
          result += '02' + zero(merchantCity - 4) + post.merchant.merchantLanguage.merchantCity;
        }
      }
    }

    if (Object.keys(post.transaction).length) {
      if (post.transaction.transactionAmount) {
        result += '54' + zero(post.transaction.transactionAmount.length) + post.transaction.transactionAmount;
      }
      if (!post.transaction.transactionCurrency) {
        post.transaction.transactionCurrency = '764';
      }
      if (post.transaction.transactionCurrency) {
        result += '53' + zero(post.transaction.transactionCurrency.length) + post.transaction.transactionCurrency;
      }
      if (post.transaction.tip) {
        result += '55' + zero(post.transaction.tip.length) + post.transaction.tip;
      }
    }

    if (Object.keys(post.additionalData).length) {
      var billNumber = 0;
      mobileNumber = 0;
      var storeId = 0;
      var customerId = 0;
      var terminalId = 0;
      var consumerData = 0;
      var referenceId = 0;
      if (post.additionalData.billNumber) {
        billNumber = post.additionalData.billNumber.length + 4;
      }
      if (post.additionalData.mobileNumber) {
        mobileNumber = post.additionalData.mobileNumber.length + 4;
      }
      if (post.additionalData.storeId) {
        storeId = post.additionalData.storeId.length + 4;
      }
      if (post.additionalData.referenceId) {
        referenceId = post.additionalData.referenceId.length + 4;
      }
      if (post.additionalData.customerId) {
        customerId = post.additionalData.customerId.length + 4;
      }
      if (post.additionalData.terminalId) {
        terminalId = post.additionalData.terminalId.length + 4;
      }
      if (post.additionalData.consumerData) {
        consumerData = post.additionalData.consumerData.length + 4;
      }
      result += '62' + (billNumber + mobileNumber + storeId + customerId + terminalId + consumerData + referenceId);
      if (post.additionalData.billNumber) {
        result += '01' + zero(billNumber - 4) + post.additionalData.billNumber;
      }
      if (post.additionalData.mobileNumber) {
        result += '02' + zero(mobileNumber - 4) + post.additionalData.mobileNumber;
      }
      if (post.additionalData.storeId) {
        result += '03' + zero(storeId - 4) + post.additionalData.storeId;
      }
      if (post.additionalData.referenceId) {
        result += '05' + zero(referenceId - 4) + post.additionalData.referenceId;
      }
      if (post.additionalData.customerId) {
        result += '06' + zero(customerId - 4) + post.additionalData.customerId;
      }
      if (post.additionalData.terminalId) {
        result += '07' + zero(terminalId - 4) + post.additionalData.terminalId;
      }
      if (post.additionalData.consumerData) {
        result += '09' + zero(consumerData - 4) + post.additionalData.consumerData;
      }
    }

    if (Object.keys(post.unreserved).length) {
      var guid = 0;
      var merchantAccInfo = 0;
      if (post.unreserved.guid) {
        guid = post.unreserved.guid.length + 4;
      }
      if (post.unreserved.merchantAccInfo) {
        merchantAccInfo = post.unreserved.merchantAccInfo.length + 4;
      }
      result += '91' + (guid + merchantAccInfo);
      if (post.unreserved.guid) {
        result += '03' + zero(guid - 4) + post.unreserved.guid;
      }
      if (post.unreserved.merchantAccInfo) {
        result += '06' + zero(merchantAccInfo - 4) + post.unreserved.merchantAccInfo;
      }
    }

    var crc1 = '00' + zero(post.payloadFormat.length) + post.payloadFormat + '01' + zero(post.pointOfInitiation.length) + post.pointOfInitiation + result + '6304';

    var crcCal = strToCrc(crc1);

    var json = { data: crc1 + crcCal };
  } else if (post.pointOfInitiation === '12' && !post.transaction.transactionAmount) {
    json = { msg: 'if pointOfInitiation equal 12 transactionAmount not null' };
  } else {
    json = { msg: 'data not null or field pointOfInitiation not null' };
  }

  return json
  // res.status(200).json(json)
};



function zero (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

function strToCrc (str) {
  var crc = CRC.crc16ccitt(str).toString(16);
  var upper = crc.toUpperCase();
  var result = (upper.length < 4 ? '0' + upper : upper);
  return result
}

// exports.encode = encode
// exports.decode = decode

var PromptpayQr$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('qrcode-vue',{attrs:{"value":_vm.qrString,"size":250}})],1)},staticRenderFns: [],
  props: {
    id: { type: Number, required: true },
    amount: { type: Number, required: true }
  },
  data: function data () {
    return {
      qrString: ''
    }
  },
  mounted: function mounted () {
    var mid = {};
    mid = { nationalId: this.id + '' };

    this.qrString = encode({
      pointOfInitiation: '11',
      merchantAccPromptpay: mid,
      merchant: { countryCode: 'TH' },
      transaction: { transactionCurrency: '764', transactionAmount: this.amount + '' },
      additionalData: {},
      unreserved: {}
    }).data;
  },
  components: {
    QrcodeVue: QrcodeVue
  }
};

PromptpayQr$1.install = function (Vue) {
  Vue.component('promptpay-qr', PromptpayQr$1);
};

return PromptpayQr$1;

})));
