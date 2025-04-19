const express = require('express')
const generalController = require('../controllers/generalController.js')

const router = express.Router()

const routes = [
    { method: 'get', path: '/get-contents', action: generalController.getContentsFromDatabase}, //V // ngeshow semua task yang ada dan blom completed
    { method: 'post', path: '/get-content/', action: generalController.getSpecificContentFromDatabase}, //V // ngeshow semua task yang ada dan blom completed
  ]
  
  routes.forEach(route => {
    router[route.method](route.path, route.action)
  })

module.exports = router