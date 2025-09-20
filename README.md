# Three Service Network Manifest

This folder contains a ready-to-publish example repository that wires together the Better File Explorer, AI Connector, and Tagging Service. You can turn this into an importable service-manifest module with the following steps:

1. Initialise a new Git repository based on this directory:
   ```bash
   cd service-manifests/three-service-network
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Push the repository to your preferred remote (update the command with your organisation/namespace):
   ```bash
   git remote add origin git@github.com:your-org/three-service-network.git
   git push -u origin main
   ```
3. Update the `repoUrl` field inside `service-manifest.json` to match the URL you pushed the repository to. This will ensure the catalog registers the network manifest as an app.
4. Import the module into AppHub using the manifest import endpoint:
   ```bash
   curl -X POST "http://127.0.0.1:4000/service-networks/import" \
     -H "Content-Type: application/json" \
     -d '{
           "repo": "https://github.com/your-org/three-service-network.git"
         }'
   ```
   If you use the authenticated `service-config/import` endpoint, include the bearer token as required by your environment.

## Files

- `service-config.json` — Declares the module and points at the local manifest file.
- `service-manifest.json` — Lists the three services, their base URLs, full environment variable expectations (mirroring each repo’s `.env.example`), and the service network definition that ties them together.
- `Dockerfile`, `package.json`, `server.js` — Minimal runtime placeholder so the network repository can be built during ingestion.

## Notes

- The individual services reference the upstream GitHub repositories owned by @benediktbwimmer. Adjust the `repoUrl` values if you maintain forks or mirrors.
- The manifest includes all environment variables declared in each repo’s `.env.example`. Update the placeholder values (such as `OPENAI_API_KEY`, `CATALOG_TOKEN`, or `START_PATH`) to match your deployment requirements before pushing.
- The network manifest uses sample ports that match the default dev configuration: 4174 (Better File Explorer), 8300 (AI Connector), and 5103 (Tagging Service).
- Feel free to extend the manifest with additional metadata (e.g., dev commands or capability descriptors) to match your deployment needs.
