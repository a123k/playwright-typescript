import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';


enum zap_api_endpoint {
   spider_scan = 'http://localhost:8081/JSON/spider/action/scan/',
   spider_status = 'http://localhost:8081/JSON/spider/view/status/',
   active_scan = 'http://localhost:8081/JSON/ascan/action/scan/',
   active_scan_status = 'http://localhost:8081/JSON/ascan/view/status/',
   alert = 'http://localhost:8081/JSON/alert/view/alerts/',
   report = 'http://localhost:8081/OTHER/core/other/htmlreport/`'
}
export type ZapAlert = { risk: string; [key: string]: any };
/**
   * Scanning the application url using spider scan api
*/
export async function zapSpiderScan(applicationtUrl: string): Promise<void> {
  console.log(`Starting ZAP spider scan for ${applicationtUrl}`);
  const spiderResponse = await axios.get(`${zap_api_endpoint.spider_scan}`, {
    params: { url: applicationtUrl },
  });
  
  const scanId = spiderResponse.data.scan;

  // Poll status until complete
  let progress = 0;
  while (progress < 100) {
    await new Promise((r) => setTimeout(r, 1000));
    const statusResp = await axios.get(`${zap_api_endpoint.spider_status}`, {
      params: { scanId },
    });
    progress = parseInt(statusResp.data.status, 10);
    console.log('Spider progress: ${progress}%');
  }
  console.log('Spider scan complete');
}
/**
   * Scanning the application url using active scan api
*/
export async function zapActiveScan(applicationtUrl: string): Promise<void> {
  console.log('Starting ZAP active scan for ${applicationtUrl}');
  const scanResponse = await axios.get(`${zap_api_endpoint.active_scan}`, {
    params: { url: applicationtUrl },
  });
  const scanId = scanResponse.data.scan;

  // Poll status until complete
  let progress = 0;
  while (progress < 100) {
    await new Promise((r) => setTimeout(r, 2000));
    const statusResp = await axios.get(`${zap_api_endpoint.active_scan_status}`, {
      params: { scanId },
    });
    progress = parseInt(statusResp.data.status, 10);
    console.log(`Active scan progress: ${progress}%`);
  }
  console.log('Active scan complete');
}
/**
   * Getting scanning alert
*/
export async function zapGetAlerts(): Promise<any[]> {
  const alertsResponse = await axios.get(`${zap_api_endpoint.alert}`, {
    params: { baseurl: 'http://localhost:3000' },
  });
  return alertsResponse.data.alerts;
}
/**
   * Saving the zap scanning report
*/
export async function zapGetHtmlReport(outputPath = 'test-results/zap-report.html'): Promise<void> {
  console.log('Fetching ZAP HTML report...');
  const response = await axios.get(`${zap_api_endpoint.report}`, {
    responseType: 'text',
  });

  const fullPath = path.resolve(outputPath);
  await fs.writeFile(fullPath, response.data, 'utf-8');
  console.log(`ZAP HTML report saved to: ${fullPath}`);
}

