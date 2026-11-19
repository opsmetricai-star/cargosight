export const BRAND = "cargosight";
export const PAYMENT_LINKS = {
  starter: "https://selar.com/57plan?currency=USD",
  pro: "https://selar.com/97plan?currency=USD",
};

export type NavLink = { label: string; href: string; desc?: string };
export type NavGroup = { title: string; href?: string; links: NavLink[] };
export type NavMenu = { label: string; href: string; groups: NavGroup[] };

export const NAV: NavMenu[] = [
  {
    label: "Platform", href: "/platform",
    groups: [
      { title: "Overview", href: "/platform", links: [
        { label: "Platform Overview", href: "/platform" },
        { label: "Carrier Onboarding", href: "/carrier-onboarding" },
      ]},
      { title: "Transportation Management", href: "/platform/tms", links: [
        { label: "Port Intel", href: "/platform/tms/port-intel", desc: "Global port congestion data" },
        { label: "Sailing Schedules", href: "/platform/tms/sailing-schedules", desc: "Ocean route and carrier schedules" },
        { label: "Rating & Booking", href: "/platform/tms/rating-booking", desc: "Real-time rates and bookings" },
        { label: "Documents", href: "/platform/tms/documents", desc: "Centralized document management" },
        { label: "Freight Procurement Analytics", href: "/platform/tms/freight-procurement-analytics", desc: "Lane intelligence for smart contracts" },
      ]},
      { title: "Visibility", href: "/platform/visibility", links: [
        { label: "Ocean", href: "/platform/visibility/ocean", desc: "Container, RoRo, barge and emissions" },
        { label: "Over-the-Road", href: "/platform/visibility/over-the-road", desc: "FTL, LTL and parcel" },
        { label: "Air", href: "/platform/visibility/air", desc: "Airport-to-airport and beyond" },
        { label: "Rail", href: "/platform/visibility/rail", desc: "Rail and intermodal" },
        { label: "Ports & Terminals", href: "/platform/visibility/ports-terminals", desc: "Terminal milestones and D&D cost" },
        { label: "Emissions", href: "/platform/visibility/sustainability", desc: "Measurement and reporting" },
        { label: "Theft Prevention", href: "/platform/visibility/theft-prevention", desc: "Cargo theft detection and response" },
        { label: "Tariff Analytics", href: "/platform/visibility/tariff-analytics", desc: "Product-level tariff intelligence" },
      ]},
      { title: "Yard Management", href: "/platform/yard", links: [
        { label: "Appointment Management", href: "/platform/yard/appointment-management", desc: "Inbound yard scheduling" },
        { label: "Yard Management", href: "/platform/yard/yard-management", desc: "Automate and manage your yards" },
        { label: "Yard Automation", href: "/platform/yard/yard-automation", desc: "Automated, IoT-enabled yards" },
      ]},
      { title: "eCommerce Logistics", href: "/platform/ecommerce", links: [
        { label: "Predictive Delivery Dates", href: "/platform/ecommerce/predictive-delivery-dates" },
        { label: "Consumer Visibility", href: "/platform/ecommerce/consumer-visibility" },
        { label: "Last-Mile Resolution & Insights", href: "/platform/ecommerce/last-mile-resolution-and-insights" },
      ]},
    ],
  },
  {
    label: "AI Orchestration", href: "/ai-agent-orchestration",
    groups: [{ title: "AI Orchestration", links: [
      { label: "AI Agents", href: "/ai-agent-orchestration", desc: "Agents that detect, decide and act" },
      { label: "Agentic Workflow Manager", href: "/ai-agent-orchestration/agentic-workflow-manager", desc: "Design and govern automated playbooks" },
      { label: "Sage Assistant", href: "/ai-agent-orchestration/sage", desc: "Ask your supply chain anything" },
    ]}],
  },
  {
    label: "Solutions", href: "/sectors",
    groups: [
      { title: "Sectors", href: "/sectors", links: [
        { label: "Shippers", href: "/sectors/shippers" },
        { label: "Logistics Service Providers", href: "/sectors/lsps" },
      ]},
      { title: "Industries", href: "/industries", links: [
        { label: "Automotive", href: "/industries/automotive" },
        { label: "Chemical", href: "/industries/chemical" },
        { label: "Food & Beverage", href: "/industries/food-beverage" },
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Life Sciences", href: "/industries/life-sciences" },
        { label: "Retail", href: "/industries/retail" },
      ]},
      { title: "Partner Ecosystem", href: "/partner-ecosystem", links: [
        { label: "Preferred Partners", href: "/partner-ecosystem/preferred-partners" },
        { label: "System Integrators", href: "/partner-ecosystem/system-integrators" },
        { label: "Telematics Partners", href: "/partner-ecosystem/telematics-partners" },
        { label: "Integrations", href: "/partner-ecosystem/integrations" },
      ]},
      { title: "Featured", links: [{ label: "Tariff Tracker", href: "/tariff-tracker", desc: "Live tariff exposure monitor" }] },
    ],
  },
  {
    label: "Carriers", href: "/carriers",
    groups: [
      { title: "Why Join", links: [
        { label: "For Carriers", href: "/carriers" },
        { label: "Carrier FAQs", href: "/carriers/faqs" },
        { label: "Support Portal", href: "/help-center" },
      ]},
      { title: "How to Connect", href: "/carriers/how-to-connect", links: [
        { label: "Mobile Driver App", href: "/carriers/connect/driver-app", desc: "Drayage and owner-operators" },
        { label: "Telematics", href: "/carriers/connect/telematics", desc: "Asset-based carriers" },
        { label: "API / EDI", href: "/carriers/connect/api", desc: "Very high volumes" },
      ]},
      { title: "Preferred Network", links: [
        { label: "Preferred Carriers", href: "/carriers/preferred-carrier-program" },
        { label: "Preferred Telematics", href: "/carriers/preferred-telematics" },
      ]},
    ],
  },
  {
    label: "Resources", href: "/resources",
    groups: [
      { title: "Explore", links: [
        { label: "All Resources", href: "/resources" },
        { label: "Customer Hub", href: "/customer-hub" },
        { label: "Reviews & Recognition", href: "/reviews-and-recognition" },
        { label: "Supply Chain Glossary", href: "/resources/glossary" },
      ]},
      { title: "Learn + Connect", links: [
        { label: "Blog", href: "/blog" },
        { label: "Events & Webinars", href: "/events" },
        { label: "Podcast", href: "/podcast" },
      ]},
      { title: "Newsroom & Help", links: [
        { label: "Press Releases", href: "/newsroom" },
        { label: "Help Center", href: "/help-center" },
        { label: "Contact Us", href: "/contact" },
      ]},
    ],
  },
  {
    label: "Company", href: "/company",
    groups: [
      { title: "About", links: [
        { label: "About Us", href: "/company" },
        { label: "Leadership", href: "/company/leadership" },
        { label: "Pricing", href: "/pricing" },
      ]},
      { title: "Careers", links: [
        { label: "Careers", href: "/company/careers" },
        { label: "Open Roles", href: "/company/careers/open-roles" },
      ]},
      { title: "Trust", links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Security", href: "/security" },
      ]},
    ],
  },
];
