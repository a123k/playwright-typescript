import { Before, After, Status, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { logger } from '../helper/logger';
import fs from 'fs';



const req_trace: any[] = [];

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  this.logger = logger(scenarioName);
  const tags = pickle.tags.map((tag) => tag.name);
  this.Requirements = tags.filter((tag) => tag.startsWith('@REQ-'));
  if (this.Requirements.length === 0) {
    this.Requirements = ['UNMAPPED'];
  }
  this.testcaseName = pickle.name;
});

After(async function (scenario) {
  if (this.electronApp) {
    await this.electronApp.close();
  }
  this.logger.info('App closed');
  const test_status = scenario.result?.status || Status.FAILED;
  const test_outcome = test_status.toLowerCase();
  for (const req of this.Requirements) {
    req_trace.push({
      requirement: req,
      testcaseID: this.testcaseName,
      test_outcome,
    });
  }
  const capitalise = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  const csvHeader = 'requirements\ttest\toutcome';
  const csvRows = req_trace.map(row =>
    `${row.requirement}\t${row.testcaseID}\t${capitalise(row.test_outcome)}`
  );
  const csvContent = [csvHeader, ...csvRows].join('\n');

  fs.writeFileSync('requirement_trace.csv', csvContent);
});

