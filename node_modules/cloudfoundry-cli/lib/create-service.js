'use strict'

var path = require('path')
var execFile = require('child_process').execFile
var execFileSync = require('child_process').execFileSync
var common = require(path.join(__dirname, '..', 'lib', 'common'))

function createService(details, callback) {
  var params = configureParams(details)
  execFile('cf', params, function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    return callback && callback(null, details)
  })
}

function createServiceSync(details) {
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
var NAME_NOT_SPECIFIED = 'Service name not specified'
var TYPE_NOT_SPECIFIED = 'Service type not specified'
var PLAN_NOT_SPECIFIED = 'Service plan not specified'

function configureParams(details, callback) {
  if (!details) {
    if (callback) return callback(new Error(DETAILS_REQUIRED))
    else throw new Error(DETAILS_REQUIRED)
  }
  if (!('name' in details)) {
    if (callback) return callback(new Error(NAME_NOT_SPECIFIED))
    else throw new Error(NAME_NOT_SPECIFIED)
  }
  if (!('type' in details)) {
    if (callback) return callback(new Error(TYPE_NOT_SPECIFIED))
    else throw new Error(TYPE_NOT_SPECIFIED)
  }
  if (!('plan' in details)) {
    if (callback) return callback(new Error(PLAN_NOT_SPECIFIED))
    else throw new Error(PLAN_NOT_SPECIFIED)
  }
  var params =['create-service', details.type, details.plan, details.name]
  if ('config' in details) {
    params.push('-c')
    params.push(JSON.toString(details.config))
  }
  return params
}

module.exports = function(sync) {
  if (sync) return createServiceSync
  else return createService
}
