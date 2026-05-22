# Strapi MCP (local + prod) and publish webhooks

## Strapi MCP — two servers

The Cursor MCP server `@bschauer/strapi-mcp-server` reads **`~/.mcp/strapi-mcp-server.config.json`** (not repo `.cursor/mcp.json`). Project `.cursor/mcp.json` only starts the npx command.

```json
{
  "navigate-tech-hub-local": {
    "api_url": "http://localhost:1337",
    "api_key": "<Admin API token from local Strapi>",
    "version": "5.*"
  },
  "navigate-tech-hub-prod": {
    "api_url": "https://sincere-cheese-55b8e6e6d0.strapiapp.com",
    "api_key": "<Admin API token from Strapi Cloud>",
    "version": "5.*"
  }
}
```

### Token

1. Strapi Admin → **Settings → API Tokens → Create new API Token**
2. Type: **Full access** (read-only tokens cannot manage webhooks; MCP may omit invalid servers on startup)
3. Paste into `api_key` for the matching server entry

### After editing config

1. **Cursor → Settings → MCP → Strapi → Restart**
2. In chat, ask the agent to run `strapi_list_servers` — both `navigate-tech-hub-local` and `navigate-tech-hub-prod` should appear

If only local appears, prod failed validation (wrong URL, expired token, or typo in server name).

### Local vs prod content

MCP connects to whichever server you name; it does **not** sync databases. Copying prod → local is a separate task (export/import, seed scripts, or manual publish). Do not assume local articles match prod when testing cache or webhooks.

---

## Publish webhook (production)

Strapi sends an HTTP POST to your app when content changes. Navigate uses it only to **invalidate Next.js fetch cache tags**, not to pull CMS JSON in the webhook body.

| Piece | Value |
|--------|--------|
| URL | `https://navigatetechhub.com/api/revalidate/strapi` |
| Method | POST |
| Secret header | `X-Revalidate-Secret: <same as STRAPI_REVALIDATE_SECRET in Vercel>` |

### Strapi Admin setup

1. **Settings → Global settings → Webhooks → Create new webhook**
2. **Name:** `Navigate prod revalidate`
3. **URL:** table above
4. **Headers:** `X-Revalidate-Secret` = your secret (generate with `openssl rand -hex 32` or similar)
5. **Events** (enable for both content types):
   - `entry.publish`
   - `entry.unpublish`
   - `entry.update`
   - `entry.delete`
6. Save → **Trigger** once to verify `200` and `{ "ok": true, "revalidatedTags": [...] }`

### Vercel env

Add to project **`navigate-tech-hub`** (Production):

| Variable | Purpose |
|----------|---------|
| `STRAPI_REVALIDATE_SECRET` | Must match Strapi webhook header |

Keep `STRAPI_REVALIDATE_SECONDS=180` as a safety net if a webhook fails.

### Content-type UIDs (for debugging payloads)

| Type | UID |
|------|-----|
| Guides | `api::resource.resource` |
| External directory | `api::external-resource.external-resource` |

---

## References

1. `frontend/lib/strapi.ts` — fetch tags and ISR
2. `frontend/app/api/revalidate/strapi/route.ts` — webhook handler
3. `docs/ARCHITECTURE.md` — request lifecycle
