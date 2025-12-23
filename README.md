# Wasp News

Server for the Wasp News feature. We store the news in the `./public/news.json` file.

The server is deployed to Railway ([link to project](https://railway.com/project/91b4f786-8635-40e9-89b5-7263022011ee)). We use Railpack to serve this as a static site. We modified the [`Caddyfile`](https://railpack.com/languages/staticfile#custom-caddyfile) to serve `./public/news.json` at the root path.

### CI/CD

On each push, the news JSON file is validated using a Zod schema. The server is deployed using a Railway project token on push to the `main` branch.
