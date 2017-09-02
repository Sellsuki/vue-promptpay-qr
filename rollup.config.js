const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
export default {
    plugins: [ vue({compileTemplate: true}), buble() ]
};
