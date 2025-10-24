import { Given, Then, When, setDefaultTimeout } from '@cucumber/cucumber';
import { _electron as electron, ElectronApplication, Page, expect,Locator } from '@playwright/test';
import { zapSpiderScan, zapActiveScan, zapGetAlerts, zapGetHtmlReport } from '../../zap/zap-control';

import path from 'path';

setDefaultTimeout(30 * 10000);
let electronApp: ElectronApplication;
let page: Page;


Given('I launch the electron app', async function () {
 const appPath = path.resolve(__dirname, '/home/aswathy/Documents/repo/software-testing/beta_bdd_tests/sample_app/hash'); 
 const electronPath = path.join(__dirname, '../../../node_modules/.bin/electron');
 electronApp = await electron.launch({ args: [appPath], executablePath: electronPath });
 page = await electronApp.firstWindow();
 await page.waitForLoadState('domcontentloaded');

// Store globally in the Cucumber world
this.electronApp = electronApp;
this.page = page;
  });

Then('I verify input field is present for user to enter the text', async function () {
  const locator = this.page.locator('#text-input');
  await expect(locator).toBeVisible()
});

Then('I verify that {string} is read only', async function (field: string) {
    let selector: string;

    if (field === 'MD5') {
      selector = '#md5-output';
    } else if (field === 'SHA-1') {
      selector = '#sha1-output';
    } else if (field === 'SHA-256') {
      selector = '#sha256-output';
    } else if (field === 'SHA-512') {
      selector = '#sha512-output';
    } else {
      throw new Error(`Unknown field: ${field}`);
    }

    const locator = this.page.locator(selector);

    // Ensure the element is visible and enabled
    await waitForElementReady(locator);

    // Check that it is not editable (i.e., read-only)
    const tagName = await locator.evaluate((el:Element) => el.tagName.toLowerCase());
    expect(tagName).toBe('pre'); // output fields in this app are <pre> tags (non-editable)

  });

async function waitForElementReady(locator: Locator, timeout = 5000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });

  const isVisible = await locator.isVisible();
  const isEnabled = await locator.isEnabled();

  if (!isVisible) {
    throw new Error('Element is not visible.');
  }

  if (!isEnabled) {
    throw new Error('Element is not enabled.');
  }
}

When('I scan the local server with ZAP', async () => {
  await zapSpiderScan('http://localhost:3000');
  await zapActiveScan('http://localhost:3000');
});

Then('ZAP should report no high-risk vulnerabilities', async () => {
  const alerts = await zapGetAlerts();
  zapGetHtmlReport();
  const high = alerts.filter(a => a.risk === 'High');
  if (high.length > 0) {
    console.log('High Risk Alerts:', high);
    throw new Error('ZAP reported high-risk alerts');
  }
});

Given('I wait for {string} seconds', async function (secondsStr: string) {
  const seconds = Number(secondsStr);
  if (isNaN(seconds) || seconds < 0) {
    throw new Error(`Invalid wait time: ${secondsStr}`);
  }
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
});