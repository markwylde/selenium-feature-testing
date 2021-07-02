# Feature Testing 
> With BrowserStack, Docker and GitHub Actions Test

This project shows how you can toggle running your Selenium feature tests in mutliple environments:
- Running via docker on your local machine
- Running in a GitHub CI job
- Running on BrowserStack's Selenium grid

## Installation
```
git clone https://github.com/markwylde/selenium-feature-testing.git
cd selenium-feature-testing
npm install
```

## Usage
### with BrowserStack
```
export SELENIUM_HOST='http://$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY@hub-cloud.browserstack.com/wd/hub'
npm run test
```

### with local Selenium
```
export SELENIUM_HOST='http://localhost:4444/wd/hub'
./startSelenium.sh
npm run test
```
