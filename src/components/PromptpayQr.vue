<template>
  <div>
    <qrcode-vue :value="qrString" :size="250"></qrcode-vue>
  </div>
</template>

<script>
  import { encode } from '../libs/ppqrcode.js'
  import QrcodeVue from 'qrcode.vue'

  export default {
    props: {
      id: { type: Number, required: true },
      amount: { type: Number, required: true }
    },
    data () {
      return {
        qrString: ''
      }
    },
    mounted () {
      let mid = {}
      mid = { nationalId: this.id + '' }

      this.qrString = encode({
        pointOfInitiation: '11',
        merchantAccPromptpay: mid,
        merchant: { countryCode: 'TH' },
        transaction: { transactionCurrency: '764', transactionAmount: this.amount + '' },
        additionalData: {},
        unreserved: {}
      }).data
    },
    components: {
      QrcodeVue
    }
  }
</script>
