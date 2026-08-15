
# Yoga108 website

Simple static site scaffold for the Yoga108 app. Replace the placeholder assets in `images/` with app screenshots and update store links in `index.html` if needed.

Quick preview:

Open `index.html` in a browser (double-click or serve with a static server).

Deploy options (Cloudflare Pages):

- Git-backed (recommended):
	1. Create a git repo in this folder and push to GitHub/Bitbucket.
	2. In the Cloudflare dashboard, create a new Pages project and connect the repo.
	3. Set the build settings: Framework "None", Build command empty, Build output directory `/`.

- Manual publish with Wrangler (no Git required):
	1. Install Wrangler: `npm install -g @cloudflare/wrangler`.
	2. Authenticate: `wrangler login`.
	3. From this folder run:

```bash
wrangler pages publish . --project-name=yoga108-website
```

Replace `--project-name` with your desired project name. After publishing, configure your custom domain in the Pages dashboard and follow the domain verification steps.

Notes:
- Replace `images/` files with higher-resolution screenshots for best results.
- App store links are already present in `index.html`; update them if you have localized store links.
- I can wire up automatic deploys, add a CI workflow, or optimize images — tell me which you'd like.

