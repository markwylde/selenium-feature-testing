import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';
import test from 'basictap';

import startBrowserStackLocal from './browserStackLocal.js';
import createServer from '../../index.js';

export { default as webdriver } from 'selenium-webdriver';

const seleniumHost = process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub'

const capabilities = {
  'browser': 'chrome',
  'browser_version': '91.0',
  'os': 'OS X',
  'os_version': 'Big Sur',
  'build': 'browserstack-build-1',
  'name': 'Parallel test 1',
  'browserstack.local': 'true'
};

let stopBrowserStackLocal;
if (seleniumHost.includes('browserstack.com/')) {
  stopBrowserStackLocal = await startBrowserStackLocal(accessKey);
}

export const driver = new webdriver.Builder()
  .usingServer(seleniumHost)
  .withCapabilities({
    ...capabilities,
    ...capabilities['browser'] && { browserName: capabilities['browser']}
  })
  .build();

async function byTexts (testText) {
  const elements = await driver.findElements(webdriver.By.css('*'));

  const matchedElementsPromise = elements
    .map(async element => {
      const text = await element.getText();
      if (text === testText) {
        return element;
      }
    })

  const matchedElements = (
    await Promise.all(matchedElementsPromise)
  ).filter(element => !!element);

  return matchedElements;
}

async function byText (testText) {
  const matchedElements = await byTexts(testText);

  if (matchedElements.length > 1) {
    throw new Error(`multiple elements matching text "${testText}" where found`);
  }

  return matchedElements[0];
}

export const query = {
  byText,
  byTexts
}

export const server = await createServer();
export const baseUrl = `http://localhost:${server.address().port}`

function cleanup () {
  console.log('cleaning up selenium');
  try {
    driver.quit();
    stopBrowserStackLocal && stopBrowserStackLocal();
    server.close();
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', (error) => {
  cleanup();
  throw error;
});
test.on('finish', cleanup);
