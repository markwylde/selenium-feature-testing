import test from 'basictap';

import { driver, webdriver, baseUrl} from './helpers/runner.js';

test('has the correct header 1', async t => {
  t.plan(1);

  await driver.get(baseUrl + '/');
  const header = await driver.findElement(webdriver.By.css('header'));

  t.equal(await header.getText(), 'My Example Website');
})

test('has the correct header 2', async t => {
  t.plan(1);

  await driver.get(baseUrl + '/');
  const header = await driver.findElement(webdriver.By.css('header'));

  t.equal(await header.getText(), 'My Example Website');
})

test('has the correct header 3', async t => {
  t.plan(1);

  await driver.get(baseUrl + '/');
  const header = await driver.findElement(webdriver.By.css('header'));

  t.equal(await header.getText(), 'My Example Website');
})
