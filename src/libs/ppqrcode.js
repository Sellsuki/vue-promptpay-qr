var CRC = require('crc')

export const encode = function (jsonData) {
  var post = jsonData

  if (post.pointOfInitiation) {
    if (!post.payloadFormat) {
      post.payloadFormat = '01'
    }

    if (!post.pointOfInitiation) {
      post.pointOfInitiation = '11'
    }

    var result = ''
    if (Object.keys(post.merchantAccPromptpay).length) {
      post.merchantAccPromptpay.aid = 'A000000677010111'
      var aid = 0
      var mobileNumber = 0
      var nationalId = 0
      var ewalletId = 0
      var bankAccount = 0
      aid = post.merchantAccPromptpay.aid.length + 4
      if (post.merchantAccPromptpay.mobileNumber) {
        mobileNumber = post.merchantAccPromptpay.mobileNumber.length + 4
      }
      if (post.merchantAccPromptpay.nationalId) {
        nationalId = post.merchantAccPromptpay.nationalId.length + 4
      }
      if (post.merchantAccPromptpay.ewalletId) {
        ewalletId = post.merchantAccPromptpay.ewalletId.length + 4
      }
      if (post.merchantAccPromptpay.bankAccount) {
        bankAccount = post.merchantAccPromptpay.bankAccount.length + 4
      }
      result = '29' + (aid + mobileNumber + nationalId + ewalletId + bankAccount)
      if (post.merchantAccPromptpay.aid) {
        result += '00' + zero(post.merchantAccPromptpay.aid.length) + post.merchantAccPromptpay.aid
      }
      if (post.merchantAccPromptpay.mobileNumber) {
        result += '01' + zero(post.merchantAccPromptpay.mobileNumber.length) + post.merchantAccPromptpay.mobileNumber
      }
      if (post.merchantAccPromptpay.nationalId) {
        result += '02' + zero(post.merchantAccPromptpay.nationalId.length) + post.merchantAccPromptpay.nationalId
      }
      if (post.merchantAccPromptpay.ewalletId) {
        result += '03' + zero(post.merchantAccPromptpay.ewalletId.length) + post.merchantAccPromptpay.ewalletId
      }
      if (post.merchantAccPromptpay.bankAccount) {
        result += '04' + zero(post.merchantAccPromptpay.bankAccount.length) + post.merchantAccPromptpay.bankAccount
      }
    }

    if (Object.keys(post.merchant).length) {
      if (post.merchant.mcc) {
        result += '52' + zero(post.merchant.mcc.length) + post.merchant.mcc
      }
      if (post.merchant.countryCode) {
        result += '58' + zero(post.merchant.countryCode.length) + post.merchant.countryCode
      }
      if (post.merchant.merchantName) {
        result += '59' + zero(post.merchant.merchantName.length) + post.merchant.merchantName
      }
      if (post.merchant.merchantCity) {
        result += '60' + zero(post.merchant.merchantCity.length) + post.merchant.merchantCity
      }
      if (post.merchant.merchantLanguage) {
        var localLang = 0
        var merchantName = 0
        var merchantCity = 0
        if (post.merchant.merchantLanguage.localLang) {
          localLang = post.merchant.merchantLanguage.localLang.length + 4
        }
        if (post.merchant.merchantLanguage.merchantName) {
          merchantName = post.merchant.merchantLanguage.merchantName.length + 4
        }
        if (post.merchant.merchantLanguage.merchantCity) {
          merchantCity = post.merchant.merchantLanguage.merchantCity.length + 4
        }
        result += '64' + (localLang + merchantName + merchantCity)
        if (post.merchant.merchantLanguage.localLang) {
          result += '00' + zero(localLang - 4) + post.merchant.merchantLanguage.localLang
        }
        if (post.merchant.merchantLanguage.merchantName) {
          result += '01' + zero(merchantName - 4) + post.merchant.merchantLanguage.merchantName
        }
        if (post.merchant.merchantLanguage.merchantCity) {
          result += '02' + zero(merchantCity - 4) + post.merchant.merchantLanguage.merchantCity
        }
      }
    }

    if (Object.keys(post.transaction).length) {
      if (post.transaction.transactionAmount) {
        result += '54' + zero(post.transaction.transactionAmount.length) + post.transaction.transactionAmount
      }
      if (!post.transaction.transactionCurrency) {
        post.transaction.transactionCurrency = '764'
      }
      if (post.transaction.transactionCurrency) {
        result += '53' + zero(post.transaction.transactionCurrency.length) + post.transaction.transactionCurrency
      }
      if (post.transaction.tip) {
        result += '55' + zero(post.transaction.tip.length) + post.transaction.tip
      }
    }

    if (Object.keys(post.additionalData).length) {
      var billNumber = 0
      mobileNumber = 0
      var storeId = 0
      var customerId = 0
      var terminalId = 0
      var consumerData = 0
      var referenceId = 0
      if (post.additionalData.billNumber) {
        billNumber = post.additionalData.billNumber.length + 4
      }
      if (post.additionalData.mobileNumber) {
        mobileNumber = post.additionalData.mobileNumber.length + 4
      }
      if (post.additionalData.storeId) {
        storeId = post.additionalData.storeId.length + 4
      }
      if (post.additionalData.referenceId) {
        referenceId = post.additionalData.referenceId.length + 4
      }
      if (post.additionalData.customerId) {
        customerId = post.additionalData.customerId.length + 4
      }
      if (post.additionalData.terminalId) {
        terminalId = post.additionalData.terminalId.length + 4
      }
      if (post.additionalData.consumerData) {
        consumerData = post.additionalData.consumerData.length + 4
      }
      result += '62' + (billNumber + mobileNumber + storeId + customerId + terminalId + consumerData + referenceId)
      if (post.additionalData.billNumber) {
        result += '01' + zero(billNumber - 4) + post.additionalData.billNumber
      }
      if (post.additionalData.mobileNumber) {
        result += '02' + zero(mobileNumber - 4) + post.additionalData.mobileNumber
      }
      if (post.additionalData.storeId) {
        result += '03' + zero(storeId - 4) + post.additionalData.storeId
      }
      if (post.additionalData.referenceId) {
        result += '05' + zero(referenceId - 4) + post.additionalData.referenceId
      }
      if (post.additionalData.customerId) {
        result += '06' + zero(customerId - 4) + post.additionalData.customerId
      }
      if (post.additionalData.terminalId) {
        result += '07' + zero(terminalId - 4) + post.additionalData.terminalId
      }
      if (post.additionalData.consumerData) {
        result += '09' + zero(consumerData - 4) + post.additionalData.consumerData
      }
    }

    if (Object.keys(post.unreserved).length) {
      var guid = 0
      var merchantAccInfo = 0
      if (post.unreserved.guid) {
        guid = post.unreserved.guid.length + 4
      }
      if (post.unreserved.merchantAccInfo) {
        merchantAccInfo = post.unreserved.merchantAccInfo.length + 4
      }
      result += '91' + (guid + merchantAccInfo)
      if (post.unreserved.guid) {
        result += '03' + zero(guid - 4) + post.unreserved.guid
      }
      if (post.unreserved.merchantAccInfo) {
        result += '06' + zero(merchantAccInfo - 4) + post.unreserved.merchantAccInfo
      }
    }

    var crc1 = '00' + zero(post.payloadFormat.length) + post.payloadFormat + '01' + zero(post.pointOfInitiation.length) + post.pointOfInitiation + result + '6304'

    var crcCal = strToCrc(crc1)

    var json = { data: crc1 + crcCal }
  } else if (post.pointOfInitiation === '12' && !post.transaction.transactionAmount) {
    json = { msg: 'if pointOfInitiation equal 12 transactionAmount not null' }
  } else {
    json = { msg: 'data not null or field pointOfInitiation not null' }
  }

  return json
  // res.status(200).json(json)
}

export const decode = function (text) {
  // var text = req.body.text
  if (checkCRC(text)) {
    if (text.slice(0, 2) === '00') {
      var arr = []
      for (var i = 0; i < text.length;) {
        var tag = text.slice(i, i + 2)
        var tLength = text.slice(i + 2, i + 4)
        var tText = text.slice(i + 4, i + (parseInt(tLength) + 4))
        if (parseInt(tag) === parseInt('00')) {
          arr.push({
            tag: tag,
            tagDesc: 'Payload Format Indicator',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('01')) {
          arr.push({
            tag: tag,
            tagDesc: 'Point of Initiation Method',
            value: tText
          })
        } else if (parseInt(tag) > parseInt('01') && parseInt(tag) < parseInt('52')) {
          var subArr = []
          for (var ii = 0; ii < tText.length;) {
            var ttag = tText.slice(ii, ii + 2)
            var ttLength = tText.slice(ii + 2, ii + 4)
            var ttText = tText.slice(ii + 4, ii + (parseInt(ttLength) + 4))
            var desc = ''
            if (parseInt(ttag) === parseInt('00')) {
              desc = 'Globally Unique Identifier'
            } else if (parseInt(tag) > parseInt('00') && parseInt(tag) < parseInt('100')) {
              desc = 'Merchant Account Information'
            }
            subArr.push({
              tag: ttag,
              tagDesc: desc,
              value: ttText
            })
            ii = ii + (parseInt(ttLength) + 4)
          }
          arr.push({
            tag: tag,
            tagDesc: 'Merchant Account Information',
            value: subArr
          })
        } else if (parseInt(tag) === parseInt('52')) {
          arr.push({
            tag: tag,
            tagDesc: 'Merchant Category Code',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('53')) {
          arr.push({
            tag: tag,
            tagDesc: 'Transaction Currency',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('54')) {
          arr.push({
            tag: tag,
            tagDesc: 'Transaction Amount',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('55')) {
          arr.push({
            tag: tag,
            tagDesc: 'Tip or Convenience Indicator',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('56')) {
          arr.push({
            tag: tag,
            tagDesc: 'Value of Convenience Fee Fixed',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('57')) {
          arr.push({
            tag: tag,
            tagDesc: 'Value of Convenience Fee Percentage',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('58')) {
          arr.push({
            tag: tag,
            tagDesc: 'Country Code',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('59')) {
          arr.push({
            tag: tag,
            tagDesc: 'Merchant Name',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('60')) {
          arr.push({
            tag: tag,
            tagDesc: 'Merchant City',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('62')) {
          subArr = []
          for (ii = 0; ii < tText.length;) {
            ttag = tText.slice(ii, ii + 2)
            ttLength = tText.slice(ii + 2, ii + 4)
            ttText = tText.slice(ii + 4, ii + (parseInt(ttLength) + 4))
            desc = ''
            if (parseInt(ttag) === parseInt('01')) {
              desc = 'Bill Number'
            } else if (parseInt(ttag) === parseInt('02')) {
              desc = 'Mobile Number'
            } else if (parseInt(ttag) === parseInt('03')) {
              desc = 'Store ID'
            } else if (parseInt(ttag) === parseInt('04')) {
              desc = 'Loyalty Number'
            } else if (parseInt(ttag) === parseInt('05')) {
              desc = 'Reference ID'
            } else if (parseInt(ttag) === parseInt('06')) {
              desc = 'Customer ID'
            } else if (parseInt(ttag) === parseInt('07')) {
              desc = 'Terminal ID'
            } else if (parseInt(ttag) === parseInt('08')) {
              desc = 'Purpose of Transaction'
            } else if (parseInt(ttag) === parseInt('09')) {
              desc = 'Additional Consumer Data Request'
            }
            subArr.push({
              tag: ttag,
              tagDesc: desc,
              value: ttText
            })
            ii = ii + (parseInt(ttLength) + 4)
          }
          arr.push({
            tag: tag,
            tagDesc: 'Additional Data Field Template',
            value: subArr
          })
        } else if (parseInt(tag) === parseInt('63')) {
          arr.push({
            tag: tag,
            tagDesc: 'CRC',
            value: tText
          })
        } else if (parseInt(tag) === parseInt('64')) {
          subArr = []
          for (ii = 0; ii < tText.length;) {
            ttag = tText.slice(ii, ii + 2)
            ttLength = tText.slice(ii + 2, ii + 4)
            ttText = tText.slice(ii + 4, ii + (parseInt(ttLength) + 4))
            desc = ''
            if (parseInt(ttag) === parseInt('00')) {
              desc = 'Local Language'
            } else if (parseInt(ttag) === parseInt('01')) {
              desc = 'Merchant Name – Alternate Language'
            } else if (parseInt(ttag) === parseInt('02')) {
              desc = 'Merchant City – Alternate Language'
            }
            subArr.push({
              tag: ttag,
              tagDesc: desc,
              value: ttText
            })
            ii = ii + (parseInt(ttLength) + 4)
          }
          arr.push({
            tag: tag,
            tagDesc: 'Language Template',
            value: subArr
          })
          // } else if (parseInt(tag) > parseInt('64') && parseInt(tag) < parseInt('80')) {
          //     var subArr = []
          //     for (var ii = 0; ii < tText.length;) {
          //         var ttag = tText.slice(ii, ii + 2);
          //         var ttLength = tText.slice(ii + 2, ii + 4);
          //         var ttText = tText.slice(ii + 4, ii + (parseInt(ttLength) + 4));
          //         var desc = '';
          //         if (parseInt(ttag) === parseInt('00')) {
          //             desc = 'Language Preference';
          //         } else if (parseInt(ttag) === parseInt('01')) {
          //             desc = 'Merchant Name - Alternate Language';
          //         } else if (parseInt(ttag) === parseInt('02')) {
          //             desc = 'Merchant City - Alternate Language';
          //         }
          //         subArr.push({
          //             tag: ttag,
          //             value: ttText
          //         });
          //         ii = ii + (parseInt(ttLength) + 4);
          //     }
          //     arr.push({
          //         tag: tag,
          //         tagDesc: 'RFU for EMVCo',
          //         value: subArr
          //     });
        } else if (parseInt(tag) > parseInt('79') && parseInt(tag) < parseInt('100')) {
          subArr = []
          for (ii = 0; ii < tText.length;) {
            ttag = tText.slice(ii, ii + 2)
            ttLength = tText.slice(ii + 2, ii + 4)
            ttText = tText.slice(ii + 4, ii + (parseInt(ttLength) + 4))
            desc = ''
            if (parseInt(ttag) === parseInt('00')) {
              desc = 'Globally Unique Identifier'
            } else if (parseInt(tag) > parseInt('00') && parseInt(tag) < parseInt('100')) {
              desc = 'Context Specific Data'
            }
            subArr.push({
              tag: ttag,
              tagDesc: desc,
              value: ttText
            })
            ii = ii + (parseInt(ttLength) + 4)
          }
          arr.push({
            tag: tag,
            tagDesc: 'Unreserved Templates',
            value: subArr
          })
        }
        i = i + (parseInt(tLength) + 4)
        // req.qrcode = arr
        // // console.log(arr.find(o => o.tag === '29'))
        // req.merchant_wallet_id = arr.find(o => o.tag === '29').value.find(c => c.tag === '03').value
        // req.reference_no = arr.find(o => o.tag === '62').value.find(c => c.tag === '05').value
        // req.amount = arr.find(o => o.tag === '54').value
        // next()
      }
      return arr
    } else {
      // appUtils.getErrorMessage(req.language, errorMessages.err_more_then_balance.res_code, (restJson) => {
      //   logUtils.create_response_log(req.request_uid, restJson, errorMessages.err_more_then_balance.res_code, req.headers, req.url)
      //   res.status(200).json(restJson)
      // })
      return { status: false, msg: 'QR code invalid' }
    }
  } else {
    return { status: false, msg: 'CRC invalid' }
  }
  // res.status(200).json(arr)
}

function zero (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

function checkCRC (str) {
  var length = str.length
  var text = str.slice(0, length - 4)
  var crc = str.slice(length - 4)
  var cal = strToCrc(text)
  if (cal === crc) {
    return true
  } else {
    return false
  }
}

function strToCrc (str) {
  var crc = CRC.crc16ccitt(str).toString(16)
  var upper = crc.toUpperCase()
  var result = (upper.length < 4 ? '0' + upper : upper)
  return result
}

// exports.encode = encode
// exports.decode = decode
