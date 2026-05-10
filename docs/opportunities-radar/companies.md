# Opportunity Radar — Company List
# Format: <slug> | <display name> | <industry tag> | <official careers URL or blank>
# Industry tags: big-tech, quant, fintech, enterprise, consumer, defense, consulting, healthtech, boston-local, gov-lab
#
# Seeding rules:
#   - ~120 companies; expand after Phase 1 proves out
#   - Include only companies with realistic named underclassmen programs or insight days
#   - Generic intern reqs are excluded by the skill; these entries just define the search scope
#   - Add deny-list.md entries for companies with 3 consecutive empty runs

# ─────────────────────────────────────────────────────────────
# BIG TECH (FAANG + tier-1 adjacents)
# ─────────────────────────────────────────────────────────────

google           | Google                          | big-tech      | https://careers.google.com/students/
microsoft        | Microsoft                       | big-tech      | https://careers.microsoft.com/students
meta             | Meta                            | big-tech      | https://www.metacareers.com/students
amazon           | Amazon                          | big-tech      | https://www.amazon.jobs/en/teams/university-recruiting
apple            | Apple                           | big-tech      | https://jobs.apple.com/en-us/search?team=internships-STDNT-INTRN
netflix          | Netflix                         | big-tech      | https://jobs.netflix.com/students
nvidia           | NVIDIA                          | big-tech      | https://www.nvidia.com/en-us/about-nvidia/careers/university-recruiting/
salesforce       | Salesforce                      | big-tech      | https://careers.salesforce.com/en/university/
adobe            | Adobe                           | big-tech      | https://www.adobe.com/careers/university.html
linkedin         | LinkedIn                        | big-tech      | https://careers.linkedin.com/pathways-programs
snap             | Snap                            | big-tech      | https://careers.snap.com/students
pinterest        | Pinterest                       | big-tech      | https://www.pinterestcareers.com/university/
roblox           | Roblox                          | big-tech      | https://careers.roblox.com/students
cloudflare       | Cloudflare                      | big-tech      | https://www.cloudflare.com/careers/university-recruiting/
stripe           | Stripe                          | big-tech      | https://stripe.com/jobs/university
datadog          | Datadog                         | big-tech      | https://www.datadoghq.com/careers/students/
snowflake        | Snowflake                       | big-tech      | https://careers.snowflake.com/us/en/students
coinbase         | Coinbase                        | big-tech      | https://www.coinbase.com/careers/university
reddit           | Reddit                          | big-tech      | https://www.redditinc.com/careers
discord          | Discord                         | big-tech      | https://discord.com/careers
zoom             | Zoom                            | big-tech      | https://careers.zoom.us/students

# ─────────────────────────────────────────────────────────────
# QUANT / PROP TRADING (highest comp, short windows)
# ─────────────────────────────────────────────────────────────

two-sigma        | Two Sigma                       | quant         | https://www.twosigma.com/careers/students/
citadel          | Citadel                         | quant         | https://www.citadel.com/careers/students/
citadel-sec      | Citadel Securities              | quant         | https://www.citadelsecurities.com/careers/students/
jane-street      | Jane Street                     | quant         | https://www.janestreet.com/join-jane-street/programs/
hrt              | Hudson River Trading            | quant         | https://www.hudsonrivertrading.com/careers/
optiver          | Optiver                         | quant         | https://optiver.com/working-at-optiver/career-opportunities/
imc              | IMC Trading                     | quant         | https://careers.imc.com/us/en/students
drw              | DRW                             | quant         | https://drw.com/careers/students/
jump-trading     | Jump Trading                    | quant         | https://www.jumptrading.com/careers/
sig              | Susquehanna International Group | quant         |
de-shaw          | D.E. Shaw                       | quant         | https://www.deshaw.com/careers/students
akuna-capital    | Akuna Capital                   | quant         | https://akunacapital.com/careers#careers
five-rings       | Five Rings                      | quant         |

# ─────────────────────────────────────────────────────────────
# FINTECH / BANKS WITH ENGINEERING PIPELINES
# ─────────────────────────────────────────────────────────────

bloomberg        | Bloomberg                       | fintech       | https://www.bloomberg.com/careers/technology/university/
jpmorgan         | JPMorgan Chase                  | fintech       | https://careers.jpmorgan.com/us/en/students
goldman-sachs    | Goldman Sachs                   | fintech       | https://www.goldmansachs.com/careers/students/
morgan-stanley   | Morgan Stanley                  | fintech       | https://www.morganstanley.com/people-opportunities/students-graduates/
capital-one      | Capital One                     | fintech       | https://www.capitalonecareers.com/students
blackrock        | BlackRock                       | fintech       | https://careers.blackrock.com/early-careers/
plaid            | Plaid                           | fintech       | https://plaid.com/careers/
block            | Block (Square)                  | fintech       | https://block.xyz/careers/students
ramp             | Ramp                            | fintech       | https://ramp.com/careers
brex             | Brex                            | fintech       | https://www.brex.com/careers

# ─────────────────────────────────────────────────────────────
# ENTERPRISE / LEGACY TECH
# ─────────────────────────────────────────────────────────────

oracle           | Oracle                          | enterprise    | https://www.oracle.com/careers/students-grads/
ibm              | IBM                             | enterprise    | https://www.ibm.com/employment/us-en/students.html
sap              | SAP                             | enterprise    | https://www.sap.com/about/careers/students.html
servicenow       | ServiceNow                      | enterprise    | https://careers.servicenow.com/students
workday          | Workday                         | enterprise    | https://www.workday.com/en-us/company/careers/students.html
atlassian        | Atlassian                       | enterprise    | https://www.atlassian.com/company/careers/students
splunk           | Splunk                          | enterprise    | https://www.splunk.com/en_us/careers/students.html
palo-alto        | Palo Alto Networks              | enterprise    | https://www.paloaltonetworks.com/company/careers/university

# ─────────────────────────────────────────────────────────────
# CONSUMER / SOCIAL / MARKETPLACE
# ─────────────────────────────────────────────────────────────

spotify          | Spotify                         | consumer      | https://www.lifeatspotify.com/students
airbnb           | Airbnb                          | consumer      | https://careers.airbnb.com/students/
uber             | Uber                            | consumer      | https://www.uber.com/us/en/careers/uberstar/
lyft             | Lyft                            | consumer      | https://www.lyft.com/careers/students
doordash         | DoorDash                        | consumer      | https://careers.doordash.com/students
instacart        | Instacart                       | consumer      | https://instacart.careers/students/
duolingo         | Duolingo                        | consumer      | https://careers.duolingo.com/
dropbox          | Dropbox                         | consumer      | https://www.dropbox.jobs/en/emerging-talent/

# ─────────────────────────────────────────────────────────────
# DEFENSE / NATIONAL LABS
# Note: May require US citizenship; skill should surface that flag
# ─────────────────────────────────────────────────────────────

anduril          | Anduril Industries              | defense       | https://www.anduril.com/careers/
palantir         | Palantir                        | defense       | https://www.palantir.com/careers/students/
lockheed         | Lockheed Martin                 | defense       | https://www.lockheedmartinjobs.com/student-programs
raytheon         | Raytheon (RTX)                  | defense       | https://careers.rtx.com/global/en/students-and-graduates
booz-allen       | Booz Allen Hamilton             | defense       | https://careers.boozallen.com/students
mitre            | MITRE                           | gov-lab       | https://www.mitre.org/careers/students
lawrence-livermore | Lawrence Livermore National Lab | gov-lab     | https://www.llnl.gov/join-our-team/careers/students-and-postdocs

# ─────────────────────────────────────────────────────────────
# BOSTON-LOCAL (audience is at Northeastern — these have Boston presence)
# ─────────────────────────────────────────────────────────────

liberty-mutual   | Liberty Mutual                  | boston-local  | https://jobs.libertymutualgroup.com/students-and-grads
wayfair          | Wayfair                         | boston-local  | https://www.wayfair.com/careers/students
hubspot          | HubSpot                         | boston-local  | https://www.hubspot.com/careers/students
toast            | Toast                           | boston-local  | https://pos.toasttab.com/careers/students
klaviyo          | Klaviyo                         | boston-local  | https://www.klaviyo.com/careers/students
akamai           | Akamai Technologies             | boston-local  | https://www.akamai.com/company/careers/students-and-graduates
mathworks        | MathWorks                       | boston-local  | https://www.mathworks.com/company/jobs/students.html
draftkings       | DraftKings                      | boston-local  |
rapid7           | Rapid7                          | boston-local  |
brightcove       | Brightcove                      | boston-local  |

# ─────────────────────────────────────────────────────────────
# CONSULTING WITH TECH TRACKS
# ─────────────────────────────────────────────────────────────

deloitte         | Deloitte                        | consulting    | https://www.deloitte.com/global/en/careers/students.html
accenture        | Accenture                       | consulting    | https://www.accenture.com/us-en/careers/explore-careers/entry-level
slalom           | Slalom                          | consulting    | https://www.slalom.com/us/en/careers/students
zs-associates    | ZS Associates                   | consulting    | https://www.zs.com/careers/students
pwc              | PricewaterhouseCoopers (PwC)    | consulting    | https://www.pwc.com/us/en/careers/campus.html
mckinsey         | McKinsey & Company              | consulting    | https://www.mckinsey.com/careers/students

# ─────────────────────────────────────────────────────────────
# HEALTHTECH (growing CS hiring, early-career programs emerging)
# ─────────────────────────────────────────────────────────────

epic             | Epic Systems                    | healthtech    | https://careers.epic.com/students
meditech         | MEDITECH                        | healthtech    |
veeva            | Veeva Systems                   | healthtech    | https://www.veeva.com/about/careers/students/
tempus           | Tempus AI                       | healthtech    |
flatiron         | Flatiron Health                 | healthtech    | https://flatiron.com/careers/
color-health     | Color Health                    | healthtech    |
oscar-health     | Oscar Health                    | healthtech    |

# ─────────────────────────────────────────────────────────────
# ADDITIONAL BIG-TECH ADJACENTS
# ─────────────────────────────────────────────────────────────

twilio           | Twilio                          | big-tech      | https://www.twilio.com/en-us/company/jobs/students
zendesk          | Zendesk                         | big-tech      |
asana            | Asana                           | big-tech      | https://asana.com/jobs
figma            | Figma                           | big-tech      | https://www.figma.com/careers/
notion           | Notion                          | big-tech      |
linear           | Linear                          | big-tech      |
vercel-company   | Vercel                          | big-tech      |
retool           | Retool                          | big-tech      |
anthropic        | Anthropic                       | big-tech      | https://www.anthropic.com/careers
openai           | OpenAI                          | big-tech      | https://openai.com/careers
cohere           | Cohere                          | big-tech      |
databricks       | Databricks                      | big-tech      | https://www.databricks.com/company/careers/students
elastic          | Elastic                         | big-tech      |
hashicorp        | HashiCorp                       | big-tech      |
confluent        | Confluent                       | big-tech      |
grafana          | Grafana Labs                    | big-tech      |
