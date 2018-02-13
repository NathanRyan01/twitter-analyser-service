'use strict'

var querystring = require('querystring')
var path = require('path')
var execFile = require('child_process').execFile
var execFileSync = require('child_process').execFileSync
var common = require(path.join(__dirname, '..', 'lib', 'common'))

function getServices(filters, callback) {
  if (typeof filters === 'function') {
    callback = filters
  }
  if (filters) {
    filters = querystring.parse(filters)
  }
  execFile('cf', ['services'], function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    var services = common.getServicesArray(stdout, filters)
    callback(null, services)
  })
}

function getServicesSync(filters) {
  if (filters) {
    filters = querystring.parse(filters)
  }
  try {
    var stdout = execFileSync('cf', ['services'])
    var services = common.getServicesArray(stdout.toString(), filters)
    return services
  } catch (e) {
    var errorMsg
    if (e.stderr.length) errorMsg = e.stderr.toString()
    else errorMsg = e.stdout.toString()
    throw new Error(errorMsg);
  }
}

module.exports = function(sync) {
  if (sync) return getServicesSync
  else return getServices
}
