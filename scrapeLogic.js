const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://colab.research.google.com/drive/1j3CoFol2o9I-92-yic7otdhZdodieyVK");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

   /*
   // Type into search box
    await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = ".search-box__link";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "text/Customize and automate"
    );
    const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);*/
    
  
    const signInBtn = await page.waitForSelector("body>div[6]>div[1]>div>div[2]>div[2]>div[3]>div>div>div>div>div>a");
    const fullTitle = await signInBtn.evaluate((el) => el.textContent);
    /*
    await page.click(searchResultSelector);

    await page.waitForSelector(".search-box__link");    
    await page.type(".search-box__input", "automate beyond recorder");
    await page.keyboard.press('Enter')
    */
    
    
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
    
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
