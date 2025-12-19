import { z } from "zod";
import { readFile } from "fs/promises";

const newsItemSchema = z.object({
  level: z.enum(["high", "moderate", "low"]),
  id: z.string(),
  title: z.string(),
  body: z.string(),
  publishedAt: z.iso.datetime(),
  waspVersionsAffected: z.string(),
});
const newsSchema = z.array(newsItemSchema);

const newsJsonPath = new URL("../news.json", import.meta.url);
const newsData = JSON.parse(await readFile(newsJsonPath, "utf-8"));
try {
  newsSchema.parse(newsData);
  console.log("news.json is valid");
} catch (error) {
  console.error("news.json is invalid");
  console.error(z.prettifyError(error));
  process.exitCode = 1;
}
