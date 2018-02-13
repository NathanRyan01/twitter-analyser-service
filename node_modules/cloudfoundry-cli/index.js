'use strict'

var path = require('path')
var pushApp = require(path.join(__dirname, 'lib', 'push-app'))
var getApps = require(path.join(__dirname, 'lib', 'get-apps'))
var deleteApp = require(path.join(__dirname, 'lib', 'delete-app'))
var getServices = require(path.join(__dirname, 'lib', 'get-services'))
var createService = require(path.join(__dirname, 'lib', 'create-service'))
var deleteService = require(path.join(__dirname, 'lib', 'delete-service'))
var bindService = require(path.join(__dirname, 'lib', 'bind-service'))

var cloudFoundry = {}

cloudFoundry.pushApp = pushApp()
cloudFoundry.pushAppSync = pushApp(true)

cloudFoundry.getApps = getApps()
cloudFoundry.getAppsSync = getApps(true)

cloudFoundry.deleteApp = deleteApp()
cloudFoundry.deleteAppSync = deleteApp(true)

cloudFoundry.getServices = getServices()
cloudFoundry.getServicesSync = getServices(true)

cloudFoundry.createService = createService()
cloudFoundry.createServiceSync = createService(true)

cloudFoundry.deleteService = deleteService()
cloudFoundry.deleteServiceSync = deleteService(true)

cloudFoundry.bindService = bindService()
cloudFoundry.bindServiceSync = bindService(true)

module.exports = cloudFoundry
