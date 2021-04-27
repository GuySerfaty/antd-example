const puppeteer = require("puppeteer");
const nock = require("nock");
const useNock = require("nock-puppeteer");
const { takeScreenshot, BASE_CONFIG, delay, BASE_URL } = require("./test.util");
const { MOCK_INGREDIENTS } = require("./mocks");
const folderPath = `homepage`;

let browser;
let page;
jest.setTimeout(30000);

describe("Screenshot testing", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
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
    await takeScreenshot("example", folderPath, page);
  });
});
