import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Expo Go IoT Monitoring/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Connecting the Physical World to Your')
  })

  test('main navigation reaches how it works', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'How It Works' })
      .click()
    await expect(page).toHaveURL(/\/how-it-works$/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('homepage fits a phone-width viewport without horizontal page overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(pageWidth).toBe(viewportWidth)
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible()
  })

  test('code examples document matching sensor API routes', async ({ page }) => {
    await page.goto('/code-examples')
    await expect(page.getByRole('heading', { name: 'Code examples' })).toBeVisible()
    await expect(page.getByRole('heading', { name: /FastAPI \+ SQLite/ })).toBeVisible()
    await expect(page.getByText('/api/readings/latest', { exact: false }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copy' }).first()).toBeVisible()
  })
})
