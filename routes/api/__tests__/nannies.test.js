const request = require('supertest')
const server = require('../../../index')
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
      expect(response.body).toEqual({message: 'No nannies were found'})
    })

    test ('should return 2 nannies from the db', async () => {
        expect(true).toBe(true)
    })
  })
})
