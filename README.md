# vue-promptpay-qr

> Component to generate promptpay qrcode

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

