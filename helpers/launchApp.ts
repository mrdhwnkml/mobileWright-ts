import { execSync } from "child_process";

export function appLaunch() {
  execSync(
    "adb shell am start -n com.meratus.superapp.dev/com.meratus.super_app.MainActivity",
  );
}

export function launchSwagLabsApp() {
  execSync("adb shell am force-stop com.swaglabsmobileapp");

  execSync(
    "adb shell am start -n com.swaglabsmobileapp/com.swaglabsmobileapp.MainActivity",
  );
}
