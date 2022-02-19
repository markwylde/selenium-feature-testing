import test from 'basictap';

import { driver, query, webdriver, baseUrl} from './helpers/runner.js';

test.skip('has the correct header 1', async t => {
  t.plan(1);

  await driver.get(baseUrl + '/');
  const header = await driver.findElement(webdriver.By.css('header'));

  t.equal(await header.getText(), 'My Example Website');
})

test('ok button is on the page', async t => {
  t.plan(1);

  await driver.get(baseUrl + '/');
  const button = await query.byText('Click Me!')

  t.equal(await button.getText(), 'Click Me!');
})
