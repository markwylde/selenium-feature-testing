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

export const server = await createServer();
export const baseUrl = `http://localhost:${server.address().port}`

test.on('finish', function testFinishHook () {
  driver.quit();
  stopBrowserStackLocal && stopBrowserStackLocal();
  server.close();
});
