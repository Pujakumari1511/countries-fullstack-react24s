import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5180",
    chromeWebSecurity: false,
    experimentalCspAllowList: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
