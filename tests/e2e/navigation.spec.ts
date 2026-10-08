import { test, expect } from "@playwright/test";

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  await expect(mobileNav.getByRole("link", { name: "Exhibitors" })).toBeVisible();

  await mobileNav.getByRole("link", { name: "Exhibitors" }).click();
  await expect(page).toHaveURL(/\/exhibitors$/);
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Page Not Found")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
});

test("news page loads", async ({ page }) => {
  await page.goto("/news");
  await expect(page.getByRole("heading", { name: "News & Updates" })).toBeVisible();
});

test("admin routes redirect unauthenticated users to login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", { name: /Admin/i })).toBeVisible();
});

test("reduced motion preference does not break the homepage", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Kenya Buildcon/i }).first()).toBeVisible();
});
