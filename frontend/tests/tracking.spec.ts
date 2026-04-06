import { test, expect, Page } from '@playwright/test';

test('Shipment Tracking Portal', async ({ page }: { page: Page }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // We use a known tracking ID from our seed logic
  const trackingId = 'TRK-123456789';
  
  await page.goto(`${API_URL}/track/${trackingId}`);
  
  // Verify it contains the correct Header
  await expect(page.locator('h1')).toContainText('Tracking Portal');
  
  // Check for the tracking ID on the page
  await expect(page.locator('h2')).toContainText(trackingId);
  
  // Verify the MapContainer exists
  const mapExists = await page.locator('.leaflet-container').isVisible();
  expect(mapExists).toBeTruthy();
});

test('Auth Redirect Protection', async ({ page }: { page: Page }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Trying to access shipments without login should redirect to register
  await page.goto(`${API_URL}/shipments`);
  await expect(page).toHaveURL(/.*register/);
});
