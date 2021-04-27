/**
 * @jest-environment node
 */
const request = require("supertest");
const app = require("../app");
const mocks = require('./mocks');
const nock = require('nock');


describe("API testing - ingredients", () => {
  test("Should return list of ingredients", async () => {
    const response = await request(app)
      .get("/api/ingredients")
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("API testing - cocktails", () => {
  test("Should return cocktails by the ingredient and call thecocktaildb API", async () => {
    const mockIngredient = 'Vodka';
    const scope = await nock('https://www.thecocktaildb.com/api/json/v1/1/')
      .get(`/filter.php?i=${mockIngredient}`)
      .reply(200, mocks.filterApiResponse)

      const response = await request(app)
        .get(`/api/cocktails?ingredient=${mockIngredient}`)

      expect(response.body.length).toBe(mocks.filterApiResponse.drinks.length);
  });
});

