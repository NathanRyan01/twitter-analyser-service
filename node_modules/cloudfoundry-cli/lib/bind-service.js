'use strict'

var path = require('path')
var execFile = require('child_process').execFile
var execFileSync = require('child_process').execFileSync
var common = require(path.join(__dirname, '..', 'lib', 'common'))

function bindService(details, callback) {
  var params = configureParams(details, callback)
  execFile('cf', params, function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    return callback && callback(null, details)
  })
}

function bindServiceSync(details) {
  var params = configureParams(details)
  try {
    return execFileSync('cf', params)
  } catch(e) {
    var errorMsg
    if (e.stderr.length) errorMsg = e.stderr.toString()
    else errorMsg = e.stdout.toString()
    throw new Error(errorMsg);
  }
}

var DETAILS_REQUIRED = 'Service details required'
var APP_NAME_NOT_SPECIFIED = 'App name not specified'
var SERVICE_NAME_NOT_SPECIFIED = 'Service name not specified'

function configureParams(details, callback) {
  if (!details) {
    if (callback) return callback(new Error(DETAILS_REQUIRED))
    else throw new Error(DETAILS_REQUIRED)
  }
  if (!('appName' in details)) {
    if (callback) return callback(new Error(APP_NAME_NOT_SPECIFIED))
    else throw new Error(APP_NAME_NOT_SPECIFIED)
  }
  if (!('serviceName' in details)) {
    if (callback) return callback(new Error(SERVICE_NAME_NOT_SPECIFIED))
    else throw new Error(SERVICE_NAME_NOT_SPECIFIED)
  }
  var params =['bind-service', details.appName, details.serviceName]
  if ('config' in details) {
    params.push('-c')
    params.push(JSON.toString(details.config))
  }
  return params
}

module.exports = function(sync) {
  if (sync) return bindServiceSync
  else return bindService
}
