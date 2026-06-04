import { defineConfig } from "mobilewright";

export default defineConfig({
  platform: "android",
  //deviceName: '9B121FFAZ002G3',
  globalSetup: "./helpers/app.ts",
});
