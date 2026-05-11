---
slug: shipping-fullstack-projects
title: Shipping Full-Stack Projects with Deployment Basics
category: projects
audienceStage: underclassmen
outcome: Deliver deployed projects with production basics documented.
timeToReadMinutes: 7
contentVolatility: medium
batch: 2
draftStatus: phase-c
---

# Shipping Full-Stack Projects with Deployment Basics

You can walk someone through your app on your laptop and still lose them the second you close the lid. Recruiters skim on phones. Sponsors at org events want a link they can open later. Classmates who offered to refer you need something shareable in chat. If the only URL is `localhost`, you built practice. You did not ship proof.

In interview English, full-stack is three jobs you can say out loud: the **client** (what runs in the browser or on the phone), the **server** (what handles requests, auth, and business rules), and the **database** (where durable data lives). Serverless functions and hosted backends-as-a-service can collapse some wiring, but they trade one problem for another: fewer servers to babysit, more glue around cold starts, limits, and vendor-specific config. In the room, you need a story that matches reality: “React on the frontend, Node on the API, Postgres in prod,” not a hand-wavy diagram.

## Pick a host pattern before you drown in tabs

Older tutorials often split a “static frontend + Node API + Heroku” story. The **mental model** still helps: two build outputs, two processes, one production database URL. The **free Heroku dyno tier is gone** (since November 2022); treat those walkthroughs as pattern references, not current pricing. If you still want Heroku, read [Heroku’s GitHub Students page](https://www.heroku.com/github-students) and the [GitHub Student Developer Pack](https://education.github.com/pack/) for how students actually pay for credits now, and always read the host’s own pricing page before you click deploy.

Use a **small decision table** as a starting map, not a vendor shootout:

| Pattern | When it fits | What you wire up |
| --- | --- | --- |
| Frontend host + API host | Classic student MERN-style repos: React or Vite in one folder, Express in another | Two deployments, env-based API base URL, CORS on the API |
| Single full-stack host | One repo with one build/start story you control end to end | One service definition, one env file story, still separate “build” vs “start” mentally |
| Serverless / edge + managed DB | Mostly CRUD with short request times; you accept vendor limits | Functions + connection pooling discipline; read limits before you architect |

“Free” is not uniform. [Render’s free tier](https://render.com/docs/free) is a clear classroom example for **sleep**: web services spin down after idle time (documented around fifteen minutes without traffic), then wake on the next request with a cold start you should expect in demos. [Vercel Hobby](https://vercel.com/docs/plans/hobby) and [Netlify’s free plan](https://www.netlify.com/pricing/) still exist for personal projects, with bandwidth and build-minute caps you should skim before you bet a class deadline on them. [Railway](https://www.railway.com/pricing) and [Fly.io](https://fly.io/docs/about/billing/) are better described as **trials and low monthly floors**, not “free forever,” especially once trial credits burn. When cost is the silent blocker, the GitHub Student Pack is usually the honest bridge: link to [education.github.com/pack](https://education.github.com/pack/) and read what you qualify for instead of memorizing dollar amounts that change.

## Environment variables are where projects go to die

Never commit `.env`. Ship `.env.example` with the same keys, dummy values, and one-line comments for what each key does. Set real secrets only in the host dashboard or CLI for that environment.

Students lose hours on **build-time vs runtime** exposure. Frameworks encode the rule in the variable name: browser-visible bundles pull from `NEXT_PUBLIC_*`, `VITE_*`, `REACT_APP_*`, depending on your stack. Server-only secrets must not use those prefixes. If you can read a database URL in the browser devtools Network tab, you already lost. Read your vendor’s env docs ([Vercel environment variables](https://vercel.com/docs/environment-variables), [Render environment variables](https://render.com/docs/configure-environment-variables)) instead of copying a three-year-old screenshot thread.

If a key ever hits GitHub, assume it is burned: rotate it in the provider, update the host env, redeploy, and scan your git history with your campus security lab’s guidance if the repo was public.

## Production build is not “it worked on my machine”

Your host runs `install`, then `build`, then `start` (or platform equivalents). If you use an ORM with migrations, production often needs an explicit migrate step in the build or release phase. Tutorials that mention `prisma generate` or `prisma migrate deploy` are pointing at the same rule: **the running app and the live schema must match**. “I tweaked the table in the hosted SQL console” is how you strand your teammates on drift.

Put the production database URL in env, not in source. For toy projects, “good enough” backup awareness means: know whether your managed DB includes automated snapshots, and keep a seed script or export path you can rerun after you inevitably nuke an experiment. You are not running a bank; you are avoiding the story where your only copy of demo data lived on a free instance you deleted.

## A student-grade ship checklist

Work top to bottom once per project; repeat on every major dependency upgrade.

1. **CI or local parity:** `build` passes clean from a fresh clone using only `.env.example` plus documented keys.
2. **Env complete:** every key referenced in code exists in production; no stray `localhost` API URLs in client bundles.
3. **Smoke test in prod:** log in (if applicable), create one record, and read it back through the deployed UI. Postman alone often misses a broken bundle or env that the browser actually hits.
4. **Logs once:** open the host log stream, trigger your smoke path, confirm you see expected lines and not a wall of stack traces you ignored locally.
5. **CORS and HTTPS:** if the UI and API are on different origins, the browser treats that as cross-origin. The classic failure is “works on localhost, CORS errors in prod.” Your API must allow the deployed frontend origin explicitly; HTTPS is default on these hosts, which is why mixed-content bugs show up the second you leave dev.

Rollback at your scale is usually “redeploy the last good commit” or click rollback in the dashboard if the host offers it. You do not need blue-green fleets; you need a habit of small deploys.

## Hygiene without pretending you are Netflix

You want **one** place you look when users hit errors: structured logs from the API, and a client-side error boundary or global handler that at least tells you the route and message. A tiny `/health` route that returns 200 is optional; it gives monitors, demos, and future-you a cheap ping.

Set **billing alerts** anywhere the vendor documents spending caps or usage notifications, and read what “sleep” means on the tier you picked (Render’s documented spin-down is the teaching example). Tear down experiments you are not showing in interviews anymore so they do not silently pick at credits.

## Security baseline that matches your claims

If the README says “users can sign up,” you need real auth, hashed passwords handled by a library you did not invent, and cookies scoped correctly over HTTPS at a headline level. If the project is a portfolio demo with fake data and no accounts, say that plainly. Do not CVE-hunt for a class project; do not lie about what attackers could do if you shipped credentials in the client bundle.

## README as runbook, not decoration

Write for a stranger with your laptop dead. Prerequisites (Node version, package manager), clone, `cp .env.example .env`, install, migrate/seed commands, dev command, and **the production URL at the top** after you ship. Add a short “when env is wrong” section: the symptom (blank page, 401 loop, CORS red text) and the first dashboard you open (host logs, env panel). Link the official docs you relied on so the next reader can open the same vendor pages instead of guessing from your README.

## Portable proof in org pipelines and DMs

For Black and Latinx CS students moving through campus org pipelines, career programming, and referral-heavy paths, a **stable URL** is portable proof. It survives a resume drop, a DM, and a five-minute phone screen in a way a screen share cannot. You still need the story behind the project. The link is what makes that story inspectable on someone else’s time.

## Next 24 hours

Pick one row from the table and commit: either split hosts or one full-stack host, but not “I will read fifteen comparison posts first.” Add `.env.example`, wire the production API base URL through env, deploy, run the smoke path on the live site, paste the URL under the title in your README, and read pricing from the vendor’s own page once so your card does not become the lesson.
