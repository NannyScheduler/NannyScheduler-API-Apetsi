const request = require('supertest')
const server = require('../../../index')
const Parents = require('../../../models/Parents')
const db = require('../../../data/db-config')

beforeEach(() => {
  return db('parents').truncate()
})

describe('Parents API Endpoint', () => {
  describe('[GET] api/parents/test endpoint', () => {
    test('NODE_ENV should be testing', () => {
      expect(process.env.NODE_ENV).toBe('testing')
    })

    test('should return status 200 OK', async () => {
      const response = await request(server).get('/api/parents/test')
      expect(response.status).toBe(200)
    })

    test('should return the correct body', async () => {
      const response = await request(server).get('/api/parents/test')
      expect(response.body).toEqual({ message: 'Parents route works' })
    })
  })

  describe('[GET] api/parents/ endpoint', () => {
    test('should return no parents', async () => {
      const response = await request(server).get('/api/parents')
      expect(response.body).toEqual({ message: 'No parents found' })
    })

    test('should return 2 parents from the db', async () => {
      Parents.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      Parents.save({ username: 'test2', email: 'test2@test.com', password: '123456' })
      const response = await request(server).get('/api/parents')
      expect(response.body.length).toBe(2)
    })
  })

  describe('[GET] api/nannies/:id', () => {
    test('should return nanny not found', async () => {
      const response = await request(server).get('/api/parents/1')
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Parent not found with the given id' })
    })

    test('should return the found user', async () => {
      Parents.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      const response = await request(server).get('/api/parents/1')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ parent_id: 1, username: 'test1', email: 'test1@test.com', password: '123455' })
    })
  })

  describe('[POST] api/parents/register', () => {
    test('should save a parent to the database', async () => {
      const response = await request(server).post('/api/parents/register').send({ username: 'test1', email: 'test1@test.com', password: '123455' })
      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'Parent saved successfully' })
    })

    test('should return error with no body provided', async () => {
      const response = await request(server).post('/api/nannies/register').send({})
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Username, email and password fields are required' })
    })
  })

  describe('[DELETE] api/parents/:id', () => {
    test('should delete a parent from the database', async () => {
      Parents.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      const response = await request(server).delete('/api/parents/1')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Parent deleted successfully' })
    })
  })
})
