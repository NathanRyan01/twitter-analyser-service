'use strict'

const assert = require('assert')
const querystring = require('querystring')
const fs = require('fs')
const cf = require('../')
const common = require(__dirname + '/../lib/common')
const appsStdout = fs.readFileSync(__dirname + '/fixtures/apps.txt', 'utf8')
const servicesStdout = fs.readFileSync(__dirname + '/fixtures/services.txt', 'utf8')

describe('cloudfoundry-cli', function() {

  it('should parse apps', function() {
    const apps = common.getAppsArray(appsStdout)
    assert(Array.isArray(apps))
    apps.forEach(function(app) {
      assert('name' in app)
      assert('state' in app)
      assert('instances' in app)
      assert('memory' in app)
      assert('disk' in app)
      assert('urls' in app)
    })
  })

  it('should parse apps (filters)', function() {
    const filters = querystring.parse('name=apple book cat mat wat&state=started')
    const apps = common.getAppsArray(appsStdout, filters)
    assert(Array.isArray(apps))
    assert.equal(apps.length, 1)
    assert.equal(apps[0].name, 'apple book cat mat wat')
    assert.equal(apps[0].state, 'started')
  })

  it('should parse services', function() {
    const services = common.getServicesArray(servicesStdout)
    assert(Array.isArray(services))
    services.forEach(function(service) {
      assert('name' in service)
      assert('type' in service)
      assert('plan' in service)
      assert('boundApps' in service)
      assert('lastOperation' in service)
    })
  })

  it('should parse services (filters)', function() {
    const filters = querystring.parse('name=mr. bunny rabbit&plan=Standard')
    const services = common.getServicesArray(servicesStdout, filters)
    assert(Array.isArray(services))
    assert.equal(services.length, 1)
    assert.equal(services[0].name, 'mr. bunny rabbit')
    assert.equal(services[0].plan, 'Standard')
  })

})
