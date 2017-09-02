<template>
  <div v-html="qrString"></div>
</template>

<script>
  import generatePayload from 'promptpay-qr'
  import qr from 'qrcode'

  export default {
    props: {
      id: { type: String, required: true },
      amount: { type: Number, required: true }
    },
    data () {
      return {
        qrString: ''
      }
    },
    watch: {
      id (newId) {
        this.generateSvg()
      },
      amount (newAmount) {
        this.generateSvg()
      }
    },
    methods: {
      generateSvg () {
        qr.toString(generatePayload(this.id, { amount: this.amount }), { type: 'svg', errorCorrectionLevel: 'L' }, (err, svg) => {
          if (err) {
            window.alert('Cannot generate QR code: ' + String(err))
            return
          }
          this.qrString = svg
        })
      }
    },
    mounted () {
      this.generateSvg()
    }
  }
</script>
