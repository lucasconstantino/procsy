const express = require('express')
const proxy = require('http-proxy-middleware')
const subdomain = require('express-subdomain')

const paywall = express.Router().use(proxy({ target: 'http://localhost:4000' }))
const next = express.Router().use(proxy({ target: 'http://localhost:3000' }))

express()
  .use(subdomain('paywall', paywall))
  .use(subdomain('*', next))
  .listen(2000)
