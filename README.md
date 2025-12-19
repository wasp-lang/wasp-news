# Wasp News

- Deployed to Railway (https://railway.com/project/91b4f786-8635-40e9-89b5-7263022011ee).
- Uses Github Actions with a project token to deploy the app (https://blog.railway.com/p/github-actions#lights,-camera,-action)
- Deploys the app as a static site which uses Caddy as a reverse proxy.
- Uses a custom Caddyfile to serve news.json at the root path (https://railpack.com/languages/staticfile#custom-caddyfile)
