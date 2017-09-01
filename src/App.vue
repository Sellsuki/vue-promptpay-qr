<template>
  <div id="app">
    <promptpay-qr :id="1234567890123" :amount="500"></promptpay-qr>
  </div>
</template>

<script>
import PromptpayQr from './components/PromptpayQr.vue'
export default {
  name: 'app',
  components: {
    PromptpayQr
  }
}
</script>
