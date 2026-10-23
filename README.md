# Dinesh Kumar | Zoho Developer portfolio
npm install
npm run dev      # local dev
npm run build    # production build in dist/

Edit before publishing:
- src/data/contact.js: LinkedIn URL placeholder
- Theme colour: --brand (#0047AB) and --accent in src/styles/global.css
- Add missing app icons (SalesIQ, Forms, ...): drop a transparent PNG/WebP into public/apps/,
  then set `icon: '/apps/<file>'` for that app in src/data/zohoApps.js (it joins the 3D orbit automatically)
