const request = require('supertest')
const status = require('http-status')
const app = require('../src/app')

const template = { description: 'Penguin' }
const feature = '/api/kinds'

describe('Kind feature', () => {
  test('should get kinds', async () => {
    const { text, statusCode } = await request(app).get(feature).send(template)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(status.OK)
    expect(error).toBeFalsy()
  })

  test('should create kind', async () => {
    const { text, statusCode } = await request(app).post(feature).send(template)
    const kind = JSON.parse(text)

    expect(statusCode).toBe(status.CREATED)
    expect(kind.description).toBe(template.description)
  })

  test('Kinds description is required', async () => {
    await testWithoutProperty('description', 'kind.description')
  })

  test('should return error', async () => {
    const sqlInjectionURL = `${feature}/?limit=1&page='1=1'`
    const { text, statusCode } = await request(app).get(sqlInjectionURL).send(template)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(status.BAD_REQUEST)
    expect(error).toBeTruthy()
  })

  const testWithoutProperty = async (property, propertyName) => {
    const kind = { ...template }
    delete kind[property]
    const { text, statusCode } = await request(app).post(feature).send(kind)
    const { error } = JSON.parse(text)

    expect(statusCode).toBe(status.BAD_REQUEST)
    expect(error).toContain(propertyName)
    expect(error).toContain('notNull')
  }

})