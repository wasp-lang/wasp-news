# Wasp News

Server part for the Wasp News feature. The `./public/news.json` contents is served on https://news.wasp.sh

### Editing the list of news

1. You edit the list of news by editing the `./public/news.json` file.
2. Create a PR, the CI will validate the JSON
against the [Zod schema](https://github.com/wasp-lang/wasp-news/blob/main/scripts/validate-news-format.js#L6).
3. Once you merge to `main`, the changes will be automatically deployed.

### CI/CD details

On each push, the news JSON file is validated using the [Zod schema](https://github.com/wasp-lang/wasp-news/blob/main/scripts/validate-news-format.js#L6). The server is deployed using a Railway project token on push to the `main` branch.

The server is deployed to Railway ([link to project](https://railway.com/project/91b4f786-8635-40e9-89b5-7263022011ee)). We use Railpack to serve this as a static site. We modified the [`Caddyfile`](https://railpack.com/languages/staticfile#custom-caddyfile) to serve `./public/news.json` at the root path.

### Deployment details

The server is deployed as a Caddy server that serves the JSON file at `/`. The response include cache control headers which tell Cloudflare for how long to cache the response. Cloudflare is configured to cache the JSON response using a custom `Cache Rule`.
