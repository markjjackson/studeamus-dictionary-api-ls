const R = require('ramda')

// Returns the username and password added to the uri if both exist
// Object -> String -> String
const getUserPass = env => str => {
  if (
    env.DB_USERNAME &&
    env.DB_USERNAME !== '' &&
    env.DB_PASSWORD &&
    env.DB_PASSWORD !== ''
  ) {
    return `${str}${env.DB_USERNAME}:${env.DB_PASSWORD}@`
  } else {
    return str
  }
}

// Returns the hostname added to the uri if it exists
// Object -> String -> String
const getHostname = env => str => {
  if (env.DB_HOSTNAME && env.DB_HOSTNAME !== '') {
    return `${str}${env.DB_HOSTNAME}`
  } else {
    return str
  }
}

// Returns the port added to the uri if it exists
// Object -> String -> String
const getPort = env => str => {
  if (env.DB_PORT && env.DB_PORT !== '') {
    return `${str}:${env.DB_PORT}`
  } else {
    return str
  }
}

// Returns the database name added to the uri if it exists
// Object -> String -> String
const getDbName = env => str => {
  if (env.DB_NAME && env.DB_NAME !== '') {
    return `${str}/${env.DB_NAME}`
  } else {
    return str
  }
}

// Compose functions to construct Mongo DB uri
// Object -> String
const constructMongoUri = env => {
  return R.pipe(
    getUserPass(env),
    getHostname(env),
    getPort(env),
    getDbName(env)
  )('mongodb://')
}

module.exports = {
  constructMongoUri,
  getDbName,
  getHostname,
  getPort,
  getUserPass
}
