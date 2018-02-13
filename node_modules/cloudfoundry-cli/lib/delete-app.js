'use strict'

var path = require('path')
var execFile = require('child_process').execFile
var execFileSync = require('child_process').execFileSync

function deleteApp(appName, callback) {
  execFile('cf', ['delete', appName, '-f'], function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    return callback && callback(null)
  })
}

function deleteAppSync(appName) {
  try {
    return execFileSync('cf', ['delete', appName, '-f'])
  } catch(e) {
    var errorMsg
    if (e.stderr.length) errorMsg = e.stderr.toString()
    else errorMsg = e.stdout.toString()
    throw new Error(errorMsg);
  }
}

module.exports = function(sync) {
  if (sync) return deleteAppSync
  else return deleteApp
}
