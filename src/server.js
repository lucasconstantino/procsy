const express = require('express')
const proxy = require('http-proxy-middleware')
const subdomain = require('express-subdomain')

const { Router } = express

module.exports = (proxies = []) =>
  proxies.reduce(
    (app, [domain, target]) =>
      app.use(subdomain(domain, Router().use(proxy({ target })))),
    express()
  )
