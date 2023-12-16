import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "nc8y31kd",
  dataset: "production",
  apiVersion: "2023-08-23",
  token: process.env.SANITY_PROJECT_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
