import { test, expect } from "@mobilewright/test";
import { launchSwagLabsApp } from "../helpers/launchApp";
import { execSync } from "child_process";

test.beforeEach(async ({}) => {
  launchSwagLabsApp();
});

test.afterAll(async ({}) => {
  execSync("adb shell am force-stop com.swaglabsmobileapp");
});

test("User login with valid credentials", async ({ screen }) => {
  // Fields Login
  const email = screen.getByLabel("test-Username");
  const password = screen.getByLabel("test-Password");
  const btnLogin = screen.getByLabel("test-LOGIN");

  await email.fill("standard_user");
  await password.fill("secret_sauce");
  await btnLogin.tap();

  // Assert
  await expect(screen.getByLabel("test-Cart")).toBeVisible({
    timeout: 5000,
  });
});

test("User login with Invalid credentials", async ({ screen }) => {
  // Fields Login
  const email = screen.getByLabel("test-Username");
  const password = screen.getByLabel("test-Password");
  const btnLogin = screen.getByLabel("test-LOGIN");

  await email.fill("standard_user");
  await password.fill("xxx");
  await btnLogin.tap();

  // Assert
  await expect(
    screen.getByText(
      "Username and password do not match any user in this service.",
    ),
  ).toBeVisible({});
});

test("User login with locked account", async ({ screen }) => {
  // Fields Login
  const email = screen.getByLabel("test-Username");
  const password = screen.getByLabel("test-Password");
  const btnLogin = screen.getByLabel("test-LOGIN");

  await email.fill("locked_out_user");
  await password.fill("secret_sauce");
  await btnLogin.tap();

  // Assert
  await expect(
    screen.getByText("Sorry, this user has been locked out."),
  ).toBeVisible({});
});

test("User with not all any field filled", async ({ screen }) => {
  // Login without username and password
  const btnLogin = screen.getByLabel("test-LOGIN");
  await btnLogin.tap();

  // Assert
  await expect(screen.getByText("Username is required")).toBeVisible({});

  // Fill Username only
  await screen.getByLabel("test-Username").fill("standard_user");
  await btnLogin.tap();

  // Assert
  await expect(screen.getByText("Password is required")).toBeVisible({});
});
