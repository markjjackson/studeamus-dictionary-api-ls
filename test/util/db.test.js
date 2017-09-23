const assert = require('assert')
const {
  constructMongoUri,
  getDbName,
  getHostname,
  getPort,
  getUserPass
} = require('../../util/db')

describe('Database Utility', () => {
  describe('getUserPass', () => {
    it('should return a MongoDB uri string with user and password if both are defined', () => {
      assert.equal('mongodb://testuser:testpassword@', getUserPass({ DB_USERNAME: 'testuser', DB_PASSWORD: 'testpassword' })('mongodb://'))
    })
    it('should return the input string if neither the username nor password are defined, or they are empty strings', () => {
      assert.equal('mongodb://', getUserPass({ DB_USERNAME: 'testuser' })('mongodb://'))
      assert.equal('mongodb://', getUserPass({ DB_PASSWORD: 'testpassword' })('mongodb://'))
      assert.equal('mongodb://', getUserPass({ DB_USERNAME: 'testuser', DB_PASSWORD: '' })('mongodb://'))
      assert.equal('mongodb://', getUserPass({ DB_USERNAME: '', DB_PASSWORD: 'testpassword' })('mongodb://'))
      assert.equal('mongodb://', getUserPass({})('mongodb://'))
    })
  })

  describe('getHostname', () => {
    it('should return a MongoDB uri string with hostname if it is defined', () => {
      assert.equal('mongodb://testhostname', getHostname({ DB_HOSTNAME: 'testhostname' })('mongodb://'))
    })
    it('should return the input string if the hostname is not defined, or it is an empty string', () => {
      assert.equal('mongodb://', getHostname({ DB_HOSTNAME: '' })('mongodb://'))
      assert.equal('mongodb://', getHostname({})('mongodb://'))
    })
  })

  describe('getPort', () => {
    it('should return a MongoDB uri string with port if it is defined', () => {
      assert.equal('mongodb://:8888', getPort({ DB_PORT: '8888' })('mongodb://'))
    })
    it('should return the input string if the port is not defined, or it is an empty string', () => {
      assert.equal('mongodb://', getPort({ DB_PORT: '' })('mongodb://'))
      assert.equal('mongodb://', getPort({})('mongodb://'))
    })
  })

  describe('getDbName', () => {
    it('should return a MongoDB uri string with database name if it is defined', () => {
      assert.equal('mongodb:///testdatabase', getDbName({ DB_NAME: 'testdatabase' })('mongodb://'))
    })
    it('should return the input string if the datbase name is not defined, or it is an empty string', () => {
      assert.equal('mongodb://', getDbName({ DB_NAME: '' })('mongodb://'))
      assert.equal('mongodb://', getDbName({})('mongodb://'))
    })
  })

  describe('constructMongoUri', () => {
    it('should return a MongoDB uri string with all relevant information', () => {
      assert.equal('mongodb://testusername:testpassword@testhostname:8888/testdatabase', constructMongoUri({
        DB_USERNAME: 'testusername',
        DB_PASSWORD: 'testpassword',
        DB_HOSTNAME: 'testhostname',
        DB_PORT: '8888',
        DB_NAME: 'testdatabase'
      }))
    })
    it('should work if some properties are missing from the configuration object', () => {
      assert.equal('mongodb://testhostname:8888', constructMongoUri({
        DB_HOSTNAME: 'testhostname',
        DB_PORT: '8888',
        DB_NAME: ''
      }))
    })
  })
})
