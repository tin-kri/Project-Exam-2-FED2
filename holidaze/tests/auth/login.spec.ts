import { test, expect } from "@playwright/test";

test.describe("login", () => {
  test("a user can log in with valid credentials", async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env",
      );
    }

    await page.goto("/login");

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("shows validation errors for wrong input", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Password is required.")).toBeVisible();
  });

  test("shows an error for a non-noroff email domain", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("test@testi.com");
    await page.getByLabel("Password").fill("testitest123");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(
      page.getByText("Email must be a stud.noroff.no address."),
    ).toBeVisible();
  });
  test("shows an error for a wrong password", async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL;
    await page.goto("/login");

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill("wrongpassword123");

    await page.getByRole("button", { name: "Log in" }).click();

    await expect(
      page.getByText("API error 401: Invalid email or password"),
    ).toBeVisible();
  });
});
