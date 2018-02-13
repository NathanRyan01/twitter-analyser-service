'use strict'

var path = require('path')
var execFile = require('child_process').execFile
var execFileSync = require('child_process').execFileSync
var common = require(path.join(__dirname, '..', 'lib', 'common'))

function deleteService(name, callback) {
  execFile('cf', ['delete-service', name, '-f'], function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    return callback && callback(null, details)
  })
}

function deleteServiceSync(name) {
  try {
    return execFileSync('cf', ['delete-service', name, '-f'])
  } catch(e) {
    var errorMsg
    if (e.stderr.length) errorMsg = e.stderr.toString()
    else errorMsg = e.stdout.toString()
    throw new Error(errorMsg);
  }
}

module.exports = function(sync) {
  if (sync) return deleteServiceSync
  else return deleteService
}
