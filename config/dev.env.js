'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'"http://debug.dctrain.cn:8080/debug/"',
  OPEN_PROXY: true // 是否开启代理, 重置后需重启vue-cli
})
