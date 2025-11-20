export default {
  import: ['src/test/steps/**/*.ts', 'src/helper/hooks/hooks.ts'],
  requireModule: ['ts-node/register'],
  paths: ['src/test/features/**/*.feature'],
  format: [
    'progress',
    'json:test-results/cucumber-report.json'
  ]
};