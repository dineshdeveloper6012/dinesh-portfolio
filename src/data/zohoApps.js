const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const C = 'CRM & Sales', F = 'Finance & Inventory', A = 'Automation & Custom Apps', O = 'Others';
const c = id => asset(`/apps/cat/${id}.webp`);
// icon: file in /public/apps/cat. Apps without a file (Deluge, REST APIs, ...) keep the monogram design.
export const zohoApps = [
  { id: 'crm', name: 'Zoho CRM', short: 'CRM', cat: C, icon: c('crm'), desc: 'CRM customization, workflows, automation, APIs, widgets and client scripts.', skills: ['Blueprints', 'Deluge', 'Widgets', 'APIs'] },
  { id: 'bigin', name: 'Bigin', short: 'BGN', cat: C, icon: c('bigin'), desc: 'Lightweight pipeline CRM for small teams, connected to the wider Zoho suite.', skills: ['Pipelines', 'Automation', 'Integrations'] },
  { id: 'salesiq', name: 'SalesIQ', short: 'SIQ', cat: C, icon: c('salesiq'), desc: 'Chat automation, WhatsApp booking flows and AI-assisted smart widgets.', skills: ['Zobot', 'Widgets', 'WhatsApp'] },
  { id: 'bookings', name: 'Bookings', short: 'BKG', cat: C, icon: c('bookings'), desc: 'Appointment scheduling with automated reminders and CRM sync.', skills: ['Scheduling', 'Reminders', 'CRM sync'] },
  { id: 'campaigns', name: 'Campaigns', short: 'CMP', cat: C, icon: c('campaigns'), desc: 'Email campaigns driven by CRM data and automation.', skills: ['Email', 'Segments', 'Automation'] },
  { id: 'marketing', name: 'Marketing Automation', short: 'MKT', cat: C, icon: c('marketing'), desc: 'Multichannel journeys that nurture leads from first touch to sale.', skills: ['Journeys', 'Lead scoring', 'Triggers'] },
  { id: 'social', name: 'Social', short: 'SOC', cat: C, icon: c('social'), desc: 'Social media publishing and engagement tied back to leads.', skills: ['Publishing', 'Monitoring', 'Leads'] },
  { id: 'forms', name: 'Forms', short: 'FRM', cat: C, icon: c('forms'), desc: 'Digital intake forms wired straight into CRM and Creator records.', skills: ['Intake', 'Validation', 'Sync'] },
  { id: 'survey', name: 'Survey', short: 'SRV', cat: C, icon: c('survey'), desc: 'Surveys and feedback collection that feed insights into your CRM.', skills: ['Feedback', 'Logic', 'Reports'] },
  { id: 'commerce', name: 'Commerce', short: 'COM', cat: C, icon: c('commerce'), desc: 'Online store connected to inventory, payments and CRM.', skills: ['Storefront', 'Orders', 'Sync'] },
  { id: 'backstage', name: 'Backstage', short: 'BKS', cat: C, icon: c('backstage'), desc: 'Event management with registrations, ticketing and attendee follow-up.', skills: ['Events', 'Tickets', 'Registrations'] },
  { id: 'sign', name: 'Sign', short: 'SGN', cat: C, icon: c('sign'), desc: 'E-signature steps triggered automatically inside business workflows.', skills: ['E-sign', 'Templates', 'Webhooks'] },
  { id: 'more', name: 'More...', short: '+', cat: C, desc: 'Development for other platforms and tools, built to fit your needs.', skills: ['Custom', 'Integrations'] },

  { id: 'books', name: 'Zoho Books', short: 'BKS', cat: F, icon: c('books'), desc: 'Invoicing and finance flows connected to operations data.', skills: ['Invoices', 'Sync', 'APIs'] },
  { id: 'invoice', name: 'Invoice', short: 'INV', cat: F, icon: c('invoice'), desc: 'Simple invoicing and payment tracking for service businesses.', skills: ['Invoices', 'Payments', 'Reminders'] },
  { id: 'expense', name: 'Expense', short: 'EXP', cat: F, icon: c('expense'), desc: 'Expense capture, approvals and reimbursements.', skills: ['Approvals', 'Receipts', 'Policies'] },
  { id: 'billing', name: 'Billing', short: 'BIL', cat: F, icon: c('billing'), desc: 'Subscription billing with recurring invoices and renewals.', skills: ['Subscriptions', 'Recurring', 'Renewals'] },
  { id: 'inventory', name: 'Inventory', short: 'INV', cat: F, icon: c('inventory'), desc: 'Stock, purchase and supplier workflows tied to production.', skills: ['Stock', 'Purchase', 'BOM'] },
  { id: 'payroll', name: 'Payroll', short: 'PAY', cat: F, icon: c('payroll'), desc: 'Payroll processing and compliance workflows.', skills: ['Salaries', 'Compliance', 'Payslips'] },
  { id: 'payments', name: 'Payments', short: 'PMT', cat: F, icon: c('payments'), desc: 'Online payment collection connected to your finance apps.', skills: ['Gateways', 'Reconciliation', 'Sync'] },
  { id: 'checkout', name: 'Checkout', short: 'CHK', cat: F, icon: c('checkout'), desc: 'Payment pages and links for fast, simple checkout.', skills: ['Payment pages', 'Links', 'Sync'] },
  { id: 'practice', name: 'Practice', short: 'PRC', cat: F, icon: c('practice'), desc: 'Practice management for accounting and professional-services firms.', skills: ['Clients', 'Tasks', 'Billing'] },
  { id: 'more', name: 'More...', short: '+', cat: F, desc: 'Development for other platforms and tools, built to fit your needs.', skills: ['Custom', 'Integrations'] },

  { id: 'creator', name: 'Zoho Creator', short: 'CRT', cat: A, icon: c('creator'), desc: 'Custom low-code business applications with forms, reports and role-based access.', skills: ['Deluge', 'Pages', 'Custom APIs'] },
  { id: 'flow', name: 'Zoho Flow', short: 'FLW', cat: A, icon: c('flow'), desc: 'Cross-app automation between Zoho and third-party tools.', skills: ['Triggers', 'Actions', 'Webhooks'] },
  { id: 'rpa', name: 'Zoho RPA', short: 'RPA', cat: A, icon: c('rpa'), desc: 'Robotic process automation for repetitive, rule-based desktop and web tasks.', skills: ['Bots', 'Workflows', 'Scheduling'] },
  { id: 'analytics', name: 'Zoho Analytics', short: 'ANL', cat: A, icon: c('analytics'), desc: 'Reports and dashboards over data from across your Zoho apps.', skills: ['Reports', 'Dashboards'] },
  { id: 'dataprep', name: 'Zoho DataPrep', short: 'DPR', cat: A, icon: c('dataprep'), desc: 'Data cleansing and preparation pipelines before analysis or migration.', skills: ['Cleaning', 'Pipelines', 'Migration'] },
  // { id: 'catalyst', name: 'Zoho Catalyst', short: 'CTL', cat: A, icon: c('catalyst'), desc: 'Serverless platform for custom backends, functions and full-stack apps.', skills: ['Functions', 'Serverless', 'APIs'] },
  // { id: 'qntrl', name: 'Qntrl', short: 'QNT', cat: A, icon: c('qntrl'), desc: 'Workflow orchestration for cross-team business processes.', skills: ['Orchestration', 'Approvals', 'Visibility'] },
  { id: 'deluge', name: 'Deluge', short: 'DLG', cat: A, desc: 'Zoho\u2019s scripting language for automation, custom functions and system logic.', skills: ['Functions', 'Schedulers', 'invokeUrl'] },
  { id: 'api', name: 'REST APIs', short: 'API', cat: A, desc: 'Integrating Zoho with third-party services over REST and OAuth.', skills: ['OAuth', 'Webhooks', 'JSON'] },
  { id: 'widgets', name: 'CRM Widgets', short: 'WGT', cat: A, desc: 'HTML, CSS and JavaScript widgets embedded in CRM, Desk and Creator.', skills: ['JS SDK', 'HTML/CSS'] },
  { id: 'scripts', name: 'Client Scripts', short: 'CLS', cat: A, desc: 'Browser-side logic that validates and guides users inside Zoho UIs.', skills: ['Validation', 'UI rules'] },
  { id: 'more', name: 'More...', short: '+', cat: A, desc: 'Development for other platforms and tools, built to fit your needs.', skills: ['Custom', 'Integrations'] },

  { id: 'shopify', name: 'Shopify', short: 'SHP', cat: O, icon: c('shopify'), desc: 'Shopify store setup, themes and custom app development.', skills: ['Stores', 'Themes', 'Custom apps'] },
  { id: 'webdev', name: 'Web Development', short: 'WEB', cat: O, icon: c('webdev'), desc: 'Responsive websites and web apps built with modern front-end tools.', skills: ['React', 'HTML/CSS', 'JavaScript'] },
  { id: 'more', name: 'More...', short: '+', cat: O, desc: 'Development for other platforms and tools, built to fit your needs.', skills: ['Custom', 'Integrations'] }
];
// The hero 3D orbit keeps its original app set and icons (unchanged by the category update).
const i = id => asset(`/apps/${id}.webp`);
export const orbitApps = [
  { id: 'crm', name: 'Zoho CRM', icon: i('crm') },
  { id: 'sign', name: 'Zoho Sign', icon: i('sign') },
  { id: 'creator', name: 'Zoho Creator', icon: i('creator') },
  { id: 'books', name: 'Zoho Books', icon: i('books') },
  { id: 'inventory', name: 'Zoho Inventory', icon: i('inventory') },
  { id: 'recruit', name: 'Zoho Recruit', icon: i('recruit') },
  { id: 'desk', name: 'Zoho Desk', icon: i('desk') },
  { id: 'sprints', name: 'Zoho Sprints', icon: i('sprints') },
  { id: 'analytics', name: 'Zoho Analytics', icon: i('analytics') },
  { id: 'flow', name: 'Zoho Flow', icon: i('flow') }
];
// Scroll story in the 3D scene: ecosystem -> CRM -> Creator -> Books -> Desk -> Flow -> Analytics
export const STAGE_IDS = [null, 'crm', 'creator', 'books', 'desk', 'flow', 'analytics'];
