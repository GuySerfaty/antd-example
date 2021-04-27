const puppeteer = require("puppeteer");
const nock = require("nock");
const useNock = require("nock-puppeteer");
const { takeScreenshot, BASE_CONFIG, delay, BASE_URL } = require("./test.util");
const { MOCK_INGREDIENTS, MOCK_COCKTAILS } = require("./mocks");
const folderPath = `cocktailsList`;
const SELECTED_INGREDIENT = "Gin";

let browser;
let page;
jest.setTimeout(30000);

describe("Screenshot testing", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    useNock(page, [BASE_URL]);
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Take screenshot of home page", async () => {
    await nock(BASE_URL).get("/api/ingredients").reply(200, MOCK_INGREDIENTS);
    await page.goto(BASE_URL);
    await page.setViewport(BASE_CONFIG);
    await delay(3);
    const selectedIngredientCard = await page.$(
      `[alt="${SELECTED_INGREDIENT}"]`
    );
    await selectedIngredientCard.click();
    await nock(BASE_URL)
      .get(`/api/cocktails?ingredient=${selectedIngredientCard}`)
      .reply(200, MOCK_COCKTAILS);
    await delay(6);
    // await takeScreenshot("example2", folderPath, page);
  });
});
