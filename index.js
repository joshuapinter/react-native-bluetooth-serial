const ReactNative = require('react-native')
const { Buffer } = require('buffer')
const { NativeModules, DeviceEventEmitter } = ReactNative
// The New Architecture's TurboModule interop looks module names up verbatim - the old
// architecture's NativeModules registry stripped the "RCT" prefix, which is how this module
// (getName() = "RCTBluetoothSerial") was ever visible as "BluetoothSerial". Try both.
const BluetoothSerial = NativeModules.RCTBluetoothSerial || NativeModules.BluetoothSerial

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 * @returns {ReactNative.EmitterSubscription} subscription on event listener
 */
BluetoothSerial.on = (eventName, handler) => {
  return DeviceEventEmitter.addListener(eventName, handler)
}

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
BluetoothSerial.write = (data) => {
  if (typeof data === 'string') {
    data = new Buffer(data)
  }
  return BluetoothSerial.writeToDevice(data.toString('base64'))
}

module.exports = BluetoothSerial
