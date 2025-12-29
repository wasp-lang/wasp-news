import { readFile } from "node:fs/promises";
import { z } from "zod";

// If you are updating the schema here, make sure to update the
// types in `Wasp.Cli.Command.News.Core` in `wasp-lang/wasp` repo.
const newsItemSchema = z.strictObject({
  id: z.string(),
  // Title's max length comes from how Wasp CLI prints the news.
  // In short:
  //   - Maximum line length when displaying the news is 80.
  //   - The formatting (date, separators, etc.) take some space (around 16
  //   characters at the time of writing).
  //   - We limit the title to 60 characters to ensure everything fits nicely.
  // Check the `Wasp.Cli.Command.News.Display` module in `wasp-lang/wasp` to
  // understand more.
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
