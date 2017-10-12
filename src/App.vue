<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-sm-center">
        <div class="col-sm-10 col-md-8 col-lg-6">
          <div class="card" style="width: 100%">
            <promptpay-qr :id="id" :amount="parseFloat(amount)"></promptpay-qr>
            <div class="card-block" style="padding: 10px 10px 0px 10px;">
              <div class="form-group row">
                <div class="col-12">
                  <input class="form-control" type="text" v-model="id" placeholder="ID or Mobile"></input>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <input class="form-control" type="number" v-model="amount" placeholder="Amount"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromptpayQr from './components/PromptpayQr.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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

<style>
  #app svg {
    width: 100%;
    height: 100%;
  }
  .container {
    padding: 20px;
  }
</style>

