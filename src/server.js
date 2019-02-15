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

// module.exports = (proxies = {}) => {
//   const app = express()

//   for (let sub in proxies) {
//     app.use(
//       subdomain(sub, express.Router().use(proxy({ target: proxies[sub] })))
//     )
//   }

//   return app
// }
