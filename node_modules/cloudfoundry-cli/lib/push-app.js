'use strict'

var path = require('path')
var childProcess = require('child_process')
var execFile = childProcess.execFile
var execFileSync = childProcess.execFileSync

function pushApp(appDir, callback) {
  if (appDir) process.chdir(appDir)
  execFile('cf', ['push'], function(error, stdout, stderr) {
    if (error) {
      if (stderr) return callback(stderr)
      else return callback(stdout)
    }
    return callback && callback(null)
  })
}

function pushAppSync(appDir) {
  if (appDir) process.chdir(appDir)
  try {
    return execFileSync('cf', ['push'])
  } catch(e) {
    var errorMsg
    if (e.stderr.length) errorMsg = e.stderr.toString()
    else errorMsg = e.stdout.toString()
    throw new Error(errorMsg);
  }
}

module.exports = function(sync) {
  if (sync) return pushAppSync
  else return pushApp
}
