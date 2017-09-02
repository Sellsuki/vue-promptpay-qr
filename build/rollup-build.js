const rollup = require('rollup').rollup
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const uglify = require('uglify-js')
const CleanCSS = require('clean-css')
const fs = require('fs')
const stylus = require('stylus')
const libName = 'vue-promptpay-qr'

rollup({
  input: 'index.js',
  globals: {
    'qrcode.vue': 'qrcode.vue'
  },
  plugins: [
    vue({
      compileTemplate: true,
      // css (styles, stylesNodes) {
      //   write('dist/' + libName + '.styl', styles)
      //   stylus.render(styles, function (err, css) {
      //     if (err) throw err
      //     write('dist/' + libName + '.css', css)
      //     write('dist/' + libName + '.min.css', new CleanCSS().minify(css).styles)
      //   })
      // }
    }),
    buble()
  ]
})
  .then(function (bundle) {
    return bundle.generate({
      format: 'umd',
      name: libName,
      strict: false
    }).then(function (code) {
      return write('dist/' + libName + '.js', code.code).then(function () {
        return code.code
      })
    })
  })
  .then(function (code) {
    var minified = uglify.minify(code, {
      fromString: true,
      output: {
        ascii_only: true
      }
    }).code
    return write('dist/' + libName + '.min.js', minified)
  })
  .catch(logError)

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
