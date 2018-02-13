# cloudfoundry-cli

Node.js library for interfacing with the [Cloud Foundry command line interface](https://docs.cloudfoundry.org/cf-cli/) (`cf`).

`cf` must be installed and configured on the system for this module to work. Refer to https://docs.cloudfoundry.org/cf-cli/install-go-cli.html for installation on the system of your interest.

If you don't want to install `cf`, you can use a module like [cf-nodejs-client](https://github.com/IBM-Bluemix/cf-nodejs-client).

The advantage of `cloudfoundry-cli` over `cf-nodejs-client` is that, `cloudfoundry-cli` does not need to know any authentication
details, since it relies on the underlying `cf` for it. 

## Quick examples

Listing services:

```js
const cf = require('cloudfoundry-cli')
var services = cf.getServicesSync()
console.log(services) // list of provisioned services
```

Provisioning a service:

```js
const cf = require('cloudfoundry-cli')
cf.provisionService({
  name: 'mongoNo1',
  type: 'compose-for-mongodb',
  plan: 'Standard'
}, function(err) {
  if (err) return console.log(err)
  console.log('Service provisioned')
})
```

## Usage

NOTE: Complete interface support to `cf` is still a work in progress, only completed interfaces are documented. 

### Instantiation

```js
const cf = require('cloudfoundry-cli');
```

All further code samples will refer to the variable `cf` instantiated above.

### Apps

#### `.pushApp([dir], [callback])`

#### `.pushAppSync([dir])`

#### `.getApps([filters], [callback])`

`filters` is defined in the [querystring](https://nodejs.org/api/querystring.html) format.

```js
cf.getApps(function(err, apps) {
  if (err) return console.log(err)
  console.log(apps)
})
```

#### `.getAppsSync([filters])`

```js
var apps = cf.getAppsSync()
console.log(apps)
```

#### `.deleteApp(<name>, [callback])`

#### `.deleteAppSync(<name>)`

### Services

#### `.getServices([filters], [callback])`

```js
cf.getApps(function(err, services) {
  if (err) return console.log(err)
  console.log(services)
})
```

#### `.getServicesSync([filters])`

```js
var services = cf.getServicesSync([filters])
console.log(services)
```

#### `.createService(<details>, [callback])`

`details` object can have the following following properties:

- `name`: Name of the service
- `type`: Service type
- `plan`: Plan type of the service

```js
cf.createService({
  name: 'mongoNo1',
  type: 'compose-for-mongodb',
  plan: 'Standard'
}, function(err) {
  if (err) return console.log(err, service)
  console.log('Service provisioned')
  console.log(service)
})
```

#### `.createServiceSync(<details>)`

`details` object can have the following following properties:

- `name`: Name of the service
- `type`: Service type
- `plan`: Plan type of the service

```js
var service = cf.provisionService({
  name: 'mongoNo1',
  type: 'compose-for-mongodb',
  plan: 'Standard'
})
console.log(service)
```

#### `.deleteService(<name>, [callback])`

- `name`: Name of the service
- `callback`: Callback function

#### `.deleteServiceSync(<name>)`

- `name`: Name of the service

## LICENSE

[MIT](LICENSE)
