# vue-promptpay-qr

> Component to generate promptpay qrcode. Demo here https://sellsuki.github.io/vue-promptpay-qr/

## Installation

``` bash
npm install -D vue-promptpay-qr
```

## Usage

``` bash
import Vue from 'vue'
import VuePromptpayQr from 'vue-promptpay-qr'

Vue.use(VuePromptpayQr)
```

## Props

**id** String id or mobilenumber

**amount** Number amount in THB

## Example

``` bash
<promptpay-qr id="1234567890123" :amount="500"></promptpay-qr>
```

## Thanks to

dtinth for awesome generator library https://github.com/dtinth/promptpay-qr
