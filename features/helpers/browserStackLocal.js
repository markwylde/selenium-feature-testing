import { Local as BrowserStackLocal } from 'browserstack-local';

export default function startBrowserStackLocal (accessKey) {
  return new Promise(resolve => {
    const browserstackLocal = new BrowserStackLocal();
    browserstackLocal.start({ key: accessKey }, () => {
      resolve(() => new Promise(resolve => {
        browserstackLocal.stop(resolve);
      }));
    });
  });
}
