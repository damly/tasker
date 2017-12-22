const {spawn} = require('child_process')
const path = require('path')

const adbCmd = path.join(__dirname, '/../adb/') + 'adb'
const appApk = path.join(__dirname, '/../adb/') + 'app.apk'
const testApk = path.join(__dirname, '/../adb/') + 'test.apk'

function process (args, progress, err, end) {
  var adb = spawn(adbCmd, args)

  adb.stdout.on('data', data => {
    progress(data.toString())
  })
  adb.stderr.on('data', data => {
    err(data.toString())
  })
  adb.on('close', () => {
    end()
  })
}

function installTest (err, end) {
  process(['install', testApk], function (data) {
    console.log('adb install test progress:', data)
  }, function (data) {
    console.log('adb install test err:', data)
    err(data)
  }, function () {
    console.log('adb install test end')
    end()
  })
}

export function init (err, end) {
  process(['install', appApk], function (data) {
    console.log('adb install app:', data)
  }, function (data) {
    console.log('adb install app err:', data)
    err(data)
  }, function () {
    console.log('adb install app end')
    installTest(err, end)
  })
}

export function forward (err, end) {
  var adb = spawn(adbCmd, ['forward', 'tcp:9008', 'tcp:9008'])

  adb.stdout.on('data', data => {
  })
  adb.stderr.on('data', data => {
    console.log('adb forward err:', data.toString())
    err(data.toString())
  })
  adb.on('close', () => {
    console.log('adb forward close')
    end()
  })
}

export function start (err, end) {
  var adb = spawn(adbCmd, ['shell', 'am', 'instrument -w', 'com.github.uiautomator.test/android.support.test.runner.AndroidJUnitRunner'])
  adb.stdout.on('data', data => {
  })
  adb.stderr.on('data', data => {
    console.log('adb instrument err:', data.toString())
    err(data.toString())
  })
  adb.on('close', () => {
    console.log('adb instrument close')
    end()
  })
}
