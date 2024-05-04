import { boot } from "https://v2-5-1--edge.netlify.com/bootstrap/index-combined.ts";

const functions = {}; const metadata = { functions: {} };


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-about-me.js");

        if (typeof func === "function") {
          functions["meta-about-me"] = func;
          metadata.functions["meta-about-me"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-about-me.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-about-me\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-about-me\u001b[39m:");
        console.error(error);
      }
      


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-booking.js");

        if (typeof func === "function") {
          functions["meta-booking"] = func;
          metadata.functions["meta-booking"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-booking.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-booking\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-booking\u001b[39m:");
        console.error(error);
      }
      


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-contact-me.js");

        if (typeof func === "function") {
          functions["meta-contact-me"] = func;
          metadata.functions["meta-contact-me"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-contact-me.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-contact-me\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-contact-me\u001b[39m:");
        console.error(error);
      }
      


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-events.js");

        if (typeof func === "function") {
          functions["meta-events"] = func;
          metadata.functions["meta-events"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-events.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-events\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-events\u001b[39m:");
        console.error(error);
      }
      


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-home.js");

        if (typeof func === "function") {
          functions["meta-home"] = func;
          metadata.functions["meta-home"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-home.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-home\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-home\u001b[39m:");
        console.error(error);
      }
      


      try {
        const { default: func } = await import("file:///workspaces/serenity-ignited/netlify/edge-functions/meta-log-in.js");

        if (typeof func === "function") {
          functions["meta-log-in"] = func;
          metadata.functions["meta-log-in"] = {"url":"file:///workspaces/serenity-ignited/netlify/edge-functions/meta-log-in.js"}
        } else {
          console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to load Edge Function \u001b[33mmeta-log-in\u001b[39m. The file does not seem to have a function as the default export.");
        }
      } catch (error) {
        console.log("\u001b[91m◈\u001b[39m \u001b[31mFailed\u001b[39m to run Edge Function \u001b[33mmeta-log-in\u001b[39m:");
        console.error(error);
      }
      

boot(functions, metadata);