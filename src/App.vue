<template>
  <div id="app">
    <promptpay-qr :id="id" :amount="parseFloat(amount)"></promptpay-qr>
    <input type="text" v-model="id" placeholder="id or mobile"></input>
    <input type="number" v-model="amount" placeholder="amount"></input>
  </div>
</template>

<script>
import PromptpayQr from './components/PromptpayQr.vue'
export default {
  name: 'app',
  data () {
    return {
      id: '',
      amount: ''
    }
  },
  components: {
    PromptpayQr
  }
}
</script>
