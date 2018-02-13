'use strict'

var common = {}

common.getAppsArray = function(input, filters) {
  var apps = []
  var lines = input.split('\n')
  var header = lines[3].toString()
  lines = lines.slice(4)
  lines.forEach(function(line) {
    if (line.length) {
      var app = {}
      app.name = line.substring(header.indexOf('name'), header.indexOf('requested state')).trim()
      app.state = line.substring(header.indexOf('requested state'), header.indexOf('instances')).trim()
      app.instances = line.substring(header.indexOf('instances'), header.indexOf('memory')).trim()
      app.memory = line.substring(header.indexOf('memory'), header.indexOf('disk')).trim()
      app.disk = line.substring(header.indexOf('disk'), header.indexOf('urls')).trim()
      app.urls = line.substring(header.indexOf('urls')).trim()
      if (filters) {
        var matched = true
        var keys = Object.keys(filters)
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i]
          if ((key in filters) && app[key] !== filters[key]) {
            matched = false
            break
          }
        }
        if (matched) apps.push(app)
      } else {
        apps.push(app)
      }
    }
  })
  return apps
}

common.getServicesArray = function(input, filters) {
  var services = []
  var lines = input.split('\n')
  var header = lines[3].toString()
  lines = lines.slice(4)
  lines.forEach(function(line) {
    if (line.length) {
      var service = {}
      service.name = line.substring(header.indexOf('name'), header.indexOf('service')).trim()
      service.type = line.substring(header.indexOf('service'), header.indexOf('plan')).trim()
      service.plan = line.substring(header.indexOf('plan'), header.indexOf('bound apps')).trim()
      service.boundApps = line.substring(header.indexOf('bound app'), header.indexOf('last operation')).trim()
      service.lastOperation = line.substring(header.indexOf('last operation')).trim()
      if (filters) {
        var matched = true
        var keys = Object.keys(filters)
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i]
          if ((key in filters) && service[key] !== filters[key]) {
            matched = false
            break
          }
        }
        if (matched) services.push(service)
      } else {
        services.push(service)
      }
    }
  })
  return services
}

module.exports = common
