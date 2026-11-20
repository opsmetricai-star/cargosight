# Reference audit (project44.com, captured 2026-11-19)

## Design tokens
- Font: PP Mori (400/500/600) body; "Owners XWide 500" display accents. Fallback Helvetica/Arial (substitute: licensed-free "Inter"/"Manrope" until a font is supplied).
- Primary blue #0072E9 (buttons: pill, radius 85px, 14px/600, padding 5px 15px). Announcement bar blue ~#0B5FC0, white text.
- H1 44px/48.4px weight 400 white over dark hero video; H2 21px/600; body 16px/25.6; lead p 18px/28.8.
- Header: white, 56px tall, centred nav, right cluster = search circle, globe circle (grey #C9CCCF), Login text, Demo pill.
- Cards: radius ~24px, pale blue-grey translucent over photography.

## Homepage section order
1. Announcement bar (signal44 event, Register Now, dismiss X)
2. Hero: video bg, "Your Supply Chain at Work", subline, product-tab carousel (Freight Procurement, Network Operations, Slot Booking, Exception Management, Disruption Management) + "See all"
3. "Proven results. Better outcomes." – 5 metric cards (2 rows: 3 + 2)
4. Customer stories – 3 cards (Agriculture, Retail, Manufacturing) + "See all customer testimonials"
5. Decision Intelligence Platform – 4 numbered product families
6. "Fueling AI with industry leading context" – 7 stats
7. Testimonial carousel (many quotes)
8. "Our customers are industry leaders" – 6 stat tiles
9. Resources and insights – 3 cards + View all
10. CTA band "Your supply chain deserves better than the status quo" – Get Started / Contact Us
11. Footer

## Mega-menu / page inventory
- Platform: Overview, Carrier Onboarding; TMS (Port Intel, Sailing Schedules, Rating & Booking, Documents, Freight Procurement Analytics); Visibility (Ocean, Over-the-Road, Air, Rail, Ports & Terminals, Emissions, Theft Prevention, Tariff Analytics); Yard (Appointment Mgmt, Yard Mgmt, Yard Automation); eCommerce (Predictive Delivery Dates, Consumer Visibility, Last-mile Resolution & Insights)
- AI Orchestration: AI Agents, Agentic Workflow Manager, Mo (assistant)
- Solutions: Sectors (Shippers, LSPs), Industries (Automotive, Chemical, Food & Bev, Manufacturing, Life Sciences, Retail), Partner Ecosystem (Preferred, System Integrators, Telematics, Integrations), Tariff Tracker
- Carriers: Why Join, How to Connect (DriveView, Telematics, API/EDI), Preferred Network, FAQs, Support
- Resources: Customer Hub (case studies, testimonials), Blog, Newsroom, Events, Help Center/Contact, Reviews, Glossary, Podcast
- Company: About, Leadership, Careers (open roles, teams), Privacy, Security
- Utility: Login, Demo (get-a-demo form), Signal44 event, language switcher

## Not inspected yet
Individual subpages' bodies (to be audited per page while building), logged-in Movement app (auth-gated – not bypassed).

## Visual comparison log (2026-11-20, homepage)
Fixed: added logo strip; two-tone headings; light story cards with video thumbnails; platform families inside large blue panel; black "Fueling AI" section with glow and bordered tiles (suffix in blue); black two-column industry tiles; centred resources section with image cards and arrow badges; hero Route Details panel with blue chips on dotted map.
Known remaining gaps: photographic/video imagery (hero video, card photos, customer logos) replaced by CSS gradients and fictional wordmarks; PP Mori font is licensed (Manrope used); testimonial carousel is text-only; subpages use one shared template; tablet layouts not individually reviewed.
