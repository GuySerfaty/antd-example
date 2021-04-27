const puppeteer = require("puppeteer");
const nock = require('nock');
const useNock = require('nock-puppeteer');
const { takeScreenshot, BASE_CONFIG } = require("./test.util");
const folderPath = `homepage`;

const BASE_URL = 'http://localhost:3000'

const MOCK_INGREDIENTS = [
  {
    name: "Vodka",
    id: "Vodka",
    image: "https://www.thecocktaildb.com/images/ingredients/vodka-Small.png",
  },
  {
    name: "Gin",
    id: "Gin",
    image: "https://www.thecocktaildb.com/images/ingredients/gin-Small.png",
  },
];

let browser;
let page;
jest.setTimeout(30000);

describe("Screenshot testing", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    useNock(page, [BASE_URL])
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Take screenshot of home page", async () => {
    await nock(BASE_URL)
      .get('/api/ingredients')
      .reply(200, MOCK_INGREDIENTS);
    await page.goto(BASE_URL);
    await page.setViewport(BASE_CONFIG);

    await new Promise((r) => setTimeout(r, 5000))
    await takeScreenshot("example", folderPath, page);
  });
});