const request = require('supertest')
const server = require('../../../index')
const Nannies = require('../../../models/Nannies')
const db = require('../../../data/db-config')

beforeEach(() => {
  return db('nannies').truncate()
})

describe('Nannies API Endpoint', () => {
  describe('[GET] api/nannies/test endpoint', () => {
    test('NODE_ENV should be testing', () => {
      expect(process.env.NODE_ENV).toBe('testing')
    })

    test('should return status 200 OK', async () => {
      const response = await request(server).get('/api/nannies/test')
      expect(response.status).toBe(200)
    })

    test('should return the correct body', async () => {
      const response = await request(server).get('/api/nannies/test')
      expect(response.body).toEqual({ message: 'Nannies route works' })
    })
  })

  describe('[GET] api/nannies/ endpoint', () => {
    test('should return no nannies', async () => {
      const response = await request(server).get('/api/nannies')
      expect(response.body).toEqual({ message: 'No nannies were found' })
    })

    test('should return 2 nannies from the db', async () => {
      Nannies.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      Nannies.save({ username: 'test2', email: 'test2@test.com', password: '123456' })
      const response = await request(server).get('/api/nannies')
      expect(response.body.length).toBe(2)
    })
  })

  describe('[GET] api/nannies/:id', () => {
    test('should return nanny not found', async () => {
      const response = await request(server).get('/api/nannies/1')
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'No nanny with the given id was found' })
    })

    test('should return the found user', async () => {
      Nannies.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      const response = await request(server).get('/api/nannies/1')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ nanny_id: 1, username: 'test1', email: 'test1@test.com', password: '123455' })
    })
  })

  describe('[POST] api/nannies', () => {
    test('should save a nanny to the database', async () => {
      const response = await request(server).post('/api/nannies/register').send({ username: 'test1', email: 'test1@test.com', password: '123455' })
      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'Nanny saved successfully' })
    })

    test('should return error with no body provided', async () => {
      const response = await request(server).post('/api/nannies/register').send({})
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Username, email and password fields are required' })
    })
  })

  describe('[DELETE] api/nannies/:id', () => {
    test('should delete a nanny from the database', async () => {
      Nannies.save({ username: 'test1', email: 'test1@test.com', password: '123455' })
      const response = await request(server).delete('/api/nannies/1')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Nanny deleted successfully' })
    })
  })
})
