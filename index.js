import puppeteer from "puppeteer";
import { verify } from "./verify.js";

async function scrapeAndVerify() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("YOUR_URL_HERE");

  await page.setViewport({ width: 1080, height: 1024 });

  const questionSelector = await page.locator("#questionBox").waitHandle();
  const question = await questionSelector?.evaluate((el) => el.textContent);

  const answerSelector = await page
    .locator(".text_blurContainer__1gM66")
    .waitHandle();
  const answer = await answerSelector?.evaluate((el) => el.textContent);

  await browser.close();

  if (question && answer) {
    await verify(question, answer);
  } else {
    console.error("Failed to extract question and answer.");
  }
}

scrapeAndVerify();
