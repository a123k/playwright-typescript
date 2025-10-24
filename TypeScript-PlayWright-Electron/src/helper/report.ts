const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Beta GUI test report",
    displayDuration: false,
    metadata: {
        device: "Local test machine",
        platform: {
            name: "Ubuntu",
            version: "22",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Beta GUI" },
            { label: "Release", value: "1.0.0" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});