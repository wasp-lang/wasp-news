import { readFile } from "node:fs/promises";
import { z } from "zod";

// If you are updating the schema here, make sure to update the
// types in `Wasp.Cli.Command.News.Core` in `wasp-lang/wasp` repo.
const newsItemSchema = z.strictObject({
  id: z.string(),
  // Title max length is related to the max line length of 80, for details
  // check the `Wasp.Cli.Command.News.Display` module in `wasp-lang/wasp` repo.
  title: z.string().max(60),
  body: z.string(),
  level: z.enum(["critical", "important", "info"]),
  publishedAt: z.iso.datetime(),
});
const newsSchema = z.array(newsItemSchema);

const newsJsonPath = new URL("../public/news.json", import.meta.url);
const newsData = JSON.parse(await readFile(newsJsonPath, "utf-8"));
try {
  newsSchema.parse(newsData);
  console.log("news.json is valid");
} catch (error) {
  console.error("news.json is invalid");
  console.error(z.prettifyError(error));
  process.exitCode = 1;
}
