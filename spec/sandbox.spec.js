const puppeteer = require("puppeteer");
const assert = require("assert");

let page;
let browser;

describe("Sandbox", () => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://e2e-boilerplates.github.io/sandbox/", {
        waitUntil: "networkidle0"
      })
      .catch(() => {});
  }, 20000);

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on the sandbox", async () => {
    await page.waitFor("h1");
    const title = await page.$eval("h1", el => el.textContent);

    assert.strictEqual(await page.title(), "Sandbox");
    assert.strictEqual(title, "Sandbox");
  });
});
