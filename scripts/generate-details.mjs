// Generates details/<slug>.html pages from the project data.
// Run: node scripts/generate-details.mjs
import { writeFileSync, mkdirSync } from 'fs'

export const PROJECTS = [
  {
    slug: 'helpmeread-web',
    name: 'Help Me Read (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/helpmeread-web/',
    repo: 'https://github.com/MAGEGY/helpmeread-web',
    origin: 'Web rewrite of the HelpMeRead Android app',
    short: [
      'Help Me Read is a web app for people who cannot read text - illiterate, visually impaired, or foreign-language speakers.',
      'You point your camera at any text or upload a photo, and it recognizes the words with OCR.',
      'The app then reads the text out loud, and you can tap any line to hear just that line.',
      'It can also translate the text into 15 languages, including Arabic, and read the translation aloud too.',
      'Everything you scan is saved in a history list so you can open and hear it again later.',
    ],
    features: [
      'Camera capture or image upload with OCR (Tesseract.js, CDN-loaded)',
      '15 OCR languages: English, Arabic, French, Spanish, German, Hindi, Chinese, Japanese, Korean, Russian, Italian, Portuguese, Turkish, Urdu, Bengali',
      'Read-aloud via the browser Speech Synthesis API with speed and volume sliders',
      'Tap-to-read: every recognized line is a clickable block',
      'Translation via the free MyMemory API, with read-aloud of the translation',
      'History (last 50 scans) stored in localStorage',
      'Accessibility-first design: large fonts and big buttons',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), Web Speech API, MyMemory API, GitHub Pages',
    notes: 'Camera access requires HTTPS - the GitHub Pages URL qualifies. The first scan in each language downloads a ~10-15 MB OCR model, cached afterwards.',
  },
  {
    slug: 'helpmeread',
    name: 'HelpMeRead (Android)',
    type: 'Android app (Kotlin, Jetpack Compose)',
    status: 'GITHUB',
    live: null,
    repo: 'https://github.com/MAGEGY/helpmeread',
    origin: 'Original Android app (this workspace)',
    short: [
      'HelpMeRead is the original Android version of the reading assistant.',
      'It captures images with the camera and detects text using Google ML Kit OCR.',
      'The app reads the detected text aloud with adjustable volume and speed.',
      'It translates text into more than 15 supported languages.',
      'A web version of this app is also published and linked from the main page.',
    ],
    features: [
      'Camera with live preview and one-tap capture',
      'ML Kit text recognition with visual highlighting',
      'Tap-to-read on highlighted text areas',
      'Read-all mode with sequential highlighting',
      'Translation to 15+ languages',
      'Adjustable TTS volume and speed',
    ],
    tech: 'Kotlin, Jetpack Compose, ML Kit OCR, Tesseract, Room-style history manager',
    notes: '19 Kotlin files, ~3,100 lines. Web rewrite published at /helpmeread-web/.',
  },
  {
    slug: 'sonicrx-reader',
    name: 'SonicRx Reader (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/sonicrx-reader/',
    repo: 'https://github.com/MAGEGY/sonicrx-reader',
    origin: 'Web rewrite of the SonicRxReader Android app',
    short: [
      'SonicRx Reader scans medical prescriptions and turns them into structured medicine lists.',
      'You capture the prescription with your camera or upload a photo, and OCR extracts the text.',
      'The app recognizes medicine names, dosages, frequencies, and durations with a confidence score for each item.',
      'It shows drug information, side effects, precautions, and interaction warnings between prescribed medicines.',
      'You can correct misread names - the app learns from corrections and uses them in future scans - and every scan is saved with a printable report.',
    ],
    features: [
      'Camera/upload OCR (English and Arabic)',
      'Medicine recognition ported 1:1 from the Android logic (common-medicine dictionary, dosage/frequency/duration regex, confidence scoring)',
      'Drug info cards: usage, dosage, side effects, precautions, contraindications',
      'Interaction warnings between multiple medicines',
      'Correction learning stored in localStorage',
      'History with printable reports (print stylesheet included)',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), localStorage, GitHub Pages',
    notes: 'Faithful port of the Android MedicineRecognizer.kt logic. Drug info uses the same stub data as the Android app (StubDrugInfoApi).',
  },
  {
    slug: 'nutriscan',
    name: 'NutriScan (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/nutriscan/',
    repo: 'https://github.com/MAGEGY/nutriscan',
    origin: 'Web rewrite of the OnLineShop Android app (NutriScan)',
    short: [
      'NutriScan scans restaurant menus and tells you how healthy each item is for you.',
      'You photograph a menu, and OCR pulls out the food items automatically.',
      'Each item gets full nutrition numbers: calories, protein, carbs, fat, fiber, sugar, and sodium.',
      'Every item also gets a 0-100 health score that adapts to your goal - lose weight, gain muscle, low carb, or heart health.',
      'The app detects common allergens, warns you about your own allergens, and keeps a history of your scans.',
    ],
    features: [
      'Menu OCR with the same item-parsing logic as the Android app',
      'Nutrition estimation per food type (salad, burger, pizza, pasta, chicken, fish, steak)',
      'Optional real USDA FoodData Central lookups with a user-provided API key (stored only in the browser)',
      'Goal-based health scoring ported from the Android algorithm',
      'Allergen detection: dairy, gluten, nuts, shellfish, eggs, soy',
      'User profile: name, age, weight, height, goal, allergens, calorie target',
      'Scan history with average health scores',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), USDA API (optional), localStorage, GitHub Pages',
    notes: 'The Android app had a hardcoded USDA API key; the web version deliberately does not embed it - users paste their own key in the Profile tab.',
  },
  {
    slug: 'rxscan',
    name: 'RxScan (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/rxscan/',
    repo: 'https://github.com/MAGEGY/rxscan',
    origin: 'Web rewrite of the RxScanAI Android app',
    short: [
      'RxScan reads prescriptions and finds the medicines in a local drug database.',
      'You scan the prescription, and the recognized lines appear in an editable list.',
      'You can fix any misread line, and the app re-matches instantly.',
      'It fuzzy-matches your text against 1,071 Egyptian medicines using brand name and composition with Levenshtein distance.',
      'Each match shows the brand, generic composition, and price in EGP, and the whole result can be printed.',
    ],
    features: [
      'Camera/upload OCR (English and Arabic)',
      'Editable OCR lines with instant re-matching',
      'Fuzzy matching (Levenshtein <= 3) against the bundled 1,071-medicine Egyptian drug database',
      'Word-level matching added on top of the original whole-string algorithm so real prescriptions actually match',
      'Prices in EGP from the bundled CSV',
      'Printable match report',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), bundled medicines.csv (74 KB), GitHub Pages',
    notes: 'The MobileBERT AI correction from the Android app does not run in the browser; the web version uses the same raw-text fallback the Android app uses when BERT is unavailable.',
  },
  {
    slug: 'personalfinance',
    name: 'Personal Finance (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/personalfinance/',
    repo: 'https://github.com/MAGEGY/personalfinance',
    origin: 'Web rewrite of the PersonalFinance Android app',
    short: [
      'Personal Finance is a complete money-tracking web app.',
      'The dashboard shows your balance, monthly income and expenses, savings rate, and daily average spending.',
      'It generates smart insights - budget warnings, spending trends, and savings tips - using the same analyzer as the Android app.',
      'You can add transactions, set category budgets with progress bars, and create savings goals with contributions.',
      'There is also a bill scanner: photograph a bill and it extracts the total, date, and merchant to create an expense automatically.',
    ],
    features: [
      'Dashboard: balance, monthly overview, savings rate, daily average',
      'Smart insights ported from SpendingAnalyzer.kt (budget overruns, trends, category dominance, balance health, savings rate)',
      'Transactions with 12 categories (income and expense)',
      'Budgets per category with daily/weekly/monthly/yearly periods and progress bars',
      'Savings goals with contributions and completion tracking',
      'Bill scanning: OCR extracts amount, date, merchant, and line items',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), localStorage, GitHub Pages',
    notes: 'All data is stored locally in the browser - nothing leaves your device.',
  },
  {
    slug: 'rxreaderpro',
    name: 'RxReaderPro (Web)',
    type: 'Web app (React + Vite + Tesseract.js)',
    status: 'LIVE',
    live: 'https://magegy.github.io/rxreaderpro/',
    repo: 'https://github.com/MAGEGY/rxreaderpro',
    origin: 'Web rewrite of the RxReaderPro Android app',
    short: [
      'RxReaderPro is the most advanced prescription reader of the family.',
      'It scans a prescription and extracts structured details: patient name, date of birth, ID, doctor, license, and date.',
      'It pulls out each medication with strength, frequency, duration, and instructions using the same pattern engine as the Android app.',
      'It then matches the text against a database of 7,700 medicines with a six-step confidence scoring system.',
      'The final report shows everything with confidence bars and can be printed for the pharmacy.',
    ],
    features: [
      'Structured extraction ported from TextPostProcessor.kt (patient, doctor, date, medications, instructions)',
      'Six-step medicine matching ported from EnhancedMedicineMatcher.kt: exact name, generic, brand, medical context, fuzzy (Levenshtein), word-level, and dosage matching',
      '7,700-medicine database bundled from the Android assets (medicine.csv)',
      'Confidence bars with color coding',
      'Printable report',
    ],
    tech: 'React 19, Vite 8, TypeScript, Tesseract.js 5.1.0 (CDN), bundled medicine.csv (541 KB), GitHub Pages',
    notes: 'The Android app also has image preprocessing and a V7 Go API integration; those parts are native-specific and were not ported.',
  },
  {
    slug: 'mediconnect',
    name: 'MediConnect (Web)',
    type: 'Web app (Expo static export)',
    status: 'LIVE',
    live: 'https://magegy.github.io/mediconnect/',
    repo: 'https://github.com/MAGEGY/mediconnect',
    origin: 'Web export of the MediConnect Expo app',
    short: [
      'MediConnect is a medical app with three roles: doctor, patient, and pharmacist.',
      'Doctors manage patients and create prescriptions, patients view medications and lifestyle plans, pharmacists dispense and track inventory.',
      'The web version is the real Expo (React Native) app exported to static files - it runs entirely in the browser with local accounts.',
      'Try it with the seeded demo accounts: doctor1 / Doctor123!, patient1 / Patient123!, pharmacist1 / Pharma123!.',
      'It includes medicine scanning screens and a built-in medicine database, plus a floating help guide on every screen.',
    ],
    features: [
      'Doctor, patient, and pharmacist navigators',
      'Prescription creation and dispensing screens',
      'Medicine database and scanning screens',
      'Internationalization (English/Arabic locales)',
      'Local demo accounts seeded automatically (doctor1/Doctor123!, patient1/Patient123!, pharmacist1/Pharma123!)',
      'Floating help widget with role-aware function links',
      'Static export - no backend required for the web build',
    ],
    tech: 'Expo (React Native), React Native Web, i18next, GitHub Pages',
    notes: 'Some device-only features (camera scanning, biometrics) are limited in the browser export.',
  },
  {
    slug: 'medrecord',
    name: 'MedRecord (Web)',
    type: 'Web app (Expo static export)',
    status: 'LIVE',
    live: 'https://magegy.github.io/medrecord/',
    repo: 'https://github.com/MAGEGY/medrecord',
    origin: 'Web export of the MediConnect1 Expo app (MedRecord)',
    short: [
      'MedRecord is the second variant of the MediConnect family, focused on medical records.',
      'It has doctor, patient, pharmacist, and OCR scanner sections.',
      'Patients keep medication lists with allergy and lifestyle inputs, doctors manage patients and prescriptions, pharmacists handle dispensing and inventory.',
      'The web version is a static export of the Expo app running fully in the browser.',
      'It also includes QR code generation for sharing records.',
    ],
    features: [
      'Doctor, patient, pharmacist, and OCR sections',
      'Medication management with allergy and lifestyle modals',
      'QR code generator for records',
      'Prescription viewing and dispensing screens',
      'Static export - no backend required for the web build',
    ],
    tech: 'Expo (React Native), React Native Web, GitHub Pages',
    notes: 'Published from the local MediConnect1 project; the app name is MedRecord.',
  },
  {
    slug: 'youg8-web',
    name: 'YouG8 Travel Assistant',
    type: 'Web app (Expo static export PWA)',
    status: 'LIVE',
    live: 'https://magegy.github.io/youg8-web/',
    repo: 'https://github.com/MAGEGY/youg8-web',
    origin: 'Static web export of the YouG8 travel app',
    short: [
      'YouG8 is a travel assistant PWA covering the whole journey.',
      'It includes flight info, currency tools, destination and embassy finders, and an expense tracker.',
      'There are dedicated pages for current location, barcode scanning, and exploration.',
      'The site is a static export, so it works offline-friendly in the browser.',
      'A separate privacy policy page is published for it in the youg8-privacy repository.',
    ],
    features: [
      'Flight info and flight search pages',
      'Currency conversion tools',
      'Destination and embassy finder',
      'Expense tracker',
      'Barcode scanner page',
      'Installable as a PWA',
    ],
    tech: 'Expo static export, HTML/JS, GitHub Pages',
    notes: 'Asset paths are preconfigured for the /youg8-web/ base path.',
  },
  {
    slug: 'gardeningai',
    name: 'Gardening AI',
    type: 'Web app (React + Vite PWA)',
    status: 'LIVE',
    live: 'https://magegy.github.io/gardeningAI/',
    repo: 'https://github.com/MAGEGY/gardeningAI',
    origin: 'Original web project',
    short: [
      'Gardening AI helps you identify plants and keep them healthy.',
      'You can identify a plant from a photo, diagnose diseases, and browse plant knowledge.',
      'The app is built as an installable PWA with offline support.',
      'It is built with React, Vite, and TypeScript.',
      'The build is preconfigured for GitHub Pages with a web manifest.',
    ],
    features: [
      'Plant identification from photos',
      'Disease diagnosis',
      'Plant knowledge base',
      'Installable PWA with auto-updating service worker',
    ],
    tech: 'React 19, Vite 8, TypeScript, vite-plugin-pwa, GitHub Pages',
    notes: 'The Vite config switches the base path automatically for Pages builds (GHPAGES env).',
  },
  {
    slug: 'fill-excel',
    name: 'fill_excel',
    type: 'Static web tool',
    status: 'LIVE',
    live: 'https://magegy.github.io/fill_excel/',
    repo: 'https://github.com/MAGEGY/fill_excel',
    origin: 'Original web project',
    short: [
      'fill_excel fills Excel sheets from scanned pictures.',
      'You upload a photo of a page, and OCR reads the content in the browser.',
      'It builds the Excel file client-side with ExcelJS and JSZip.',
      'No server is involved - everything runs in the browser.',
      'It was the original proof that Tesseract.js works well in this project family.',
    ],
    features: [
      'Image upload with in-browser OCR (Tesseract.js)',
      'Excel generation with ExcelJS',
      'Fully client-side - no backend',
    ],
    tech: 'Vanilla HTML/JS, Tesseract.js, ExcelJS, JSZip (all via CDN), GitHub Pages',
    notes: 'Served directly from the repository root.',
  },
  {
    slug: 'pharmascan',
    name: 'Pharma-Scan',
    type: 'Full-stack web app (Express + SQLite + Expo static client)',
    status: 'LIVE',
    live: 'https://pharmascan.onrender.com',
    repo: 'https://github.com/MAGEGY/pharma-scan',
    origin: 'Deployed from the local Pharma-Scan project',
    short: [
      'Pharma-Scan is a full pharmacy management system with a real backend.',
      'It has user accounts with authentication, an Express API, and a SQLite database.',
      'The frontend is an Expo app exported to static files and served by the same server.',
      'It includes advanced pharmacy features like backup and sync.',
      'It runs on Render free tier - note the database resets on redeploy.',
    ],
    features: [
      'Authentication (JWT, bcrypt)',
      'Express REST API with Drizzle ORM',
      'SQLite database (better-sqlite3)',
      'Expo static client served by the server',
      'Advanced features: backup, sync, system management',
    ],
    tech: 'Node 20, Express, TypeScript, esbuild, Drizzle ORM, SQLite, Expo static export, Render',
    notes: 'SQLite is ephemeral on the Render free tier - data resets on every redeploy. For persistent data, add a Render disk (paid) or switch to Postgres.',
  },
  {
    slug: 'rxreader',
    name: 'RxReader (AI)',
    type: 'Full-stack web app (Next.js + Firebase + Genkit AI)',
    status: 'LIVE',
    live: 'https://rxreader-350m.onrender.com',
    repo: 'https://github.com/MAGEGY/rxreader',
    origin: 'Deployed from the local RxReader project',
    short: [
      'RxReader is a prescription analyzer powered by Google Gemini AI.',
      'You upload a prescription photo and AI-enhanced OCR reads it.',
      'Genkit AI flows extract and verify medication details from the text.',
      'The app is built with Next.js 16, Firebase, and shadcn/ui components.',
      'It runs on Render (the service was auto-renamed to rxreader-350m).',
    ],
    features: [
      'AI-enhanced OCR (Genkit + Gemini 2.5 Flash)',
      'Medication detail extraction and verification flows',
      'Firebase integration (Firestore rules included)',
      'shadcn/ui component library with dark mode',
      'PWA-ready configuration',
    ],
    tech: 'Next.js 16, React 19, Genkit, @genkit-ai/google-genai, Firebase, Tailwind, shadcn/ui, Render',
    notes: 'Set GOOGLE_API_KEY in the Render dashboard Environment tab (value from local RxReader/env.txt) for the AI features to work.',
  },
  {
    slug: 'picfinder',
    name: 'PicToID (picfinder)',
    type: 'API service (Python/FastAPI)',
    status: 'LIVE',
    live: 'https://picfinder.onrender.com',
    repo: 'https://github.com/MAGEGY/PicToID',
    origin: 'Deployed from the local picfinder project',
    short: [
      'PicToID is an image identification service.',
      'You upload a picture and the API finds its ID - what the image shows.',
      'It is a Python FastAPI service with image processing via Pillow and OpenCV.',
      'It can describe images, detect faces, and read EXIF data.',
      'It also handles temporary public hosting of uploaded images for URL-based engines.',
    ],
    features: [
      'Image upload API (FastAPI + python-multipart)',
      'Image description and identification engines',
      'Face detection (OpenCV)',
      'EXIF metadata reading',
      'Temporary public hosting for uploaded images (uguu.se, tmpfiles.org, catbox.moe)',
      'Static file serving',
    ],
    tech: 'Python 3.12, FastAPI, uvicorn, Pillow, OpenCV (headless), httpx, Render',
    notes: 'The API root returns service info; check the repo README for endpoint details.',
  },
  {
    slug: 'teacher-slides',
    name: 'Teacher Slides (AiTeacherAssistant)',
    type: 'Web services (Node on Render)',
    status: 'LIVE',
    live: 'https://teacher-slides-web.onrender.com',
    repo: 'https://github.com/MAGEGY/AiTeacherAssistant',
    origin: 'Deployed from the AiTeacherAssistant project',
    short: [
      'Teacher Slides is the web part of the AI Teacher Assistant project.',
      'It serves a slides web application for teachers.',
      'A second service (teacher-slides-proxy) handles proxying.',
      'Both run on Render free tier and wake up on first request.',
      'The same repository also contains the Android version of the assistant.',
    ],
    features: [
      'Slides web application',
      'Proxy service for external resources',
      'Render blueprint deployment (render.yaml in the repo)',
    ],
    tech: 'Node, Render, GitHub (private repo)',
    notes: 'Live URLs: teacher-slides-web.onrender.com and teacher-slides-proxy.onrender.com.',
  },
  {
    slug: 'youg8-privacy',
    name: 'YouG8 Privacy Policy',
    type: 'Static page',
    status: 'GITHUB',
    live: null,
    repo: 'https://github.com/MAGEGY/youg8-privacy',
    origin: 'Original web project',
    short: [
      'This repository hosts the privacy policy page for the YouG8 Travel Assistant.',
      'It is a simple static HTML page.',
      'It is referenced from the YouG8 app store listings.',
      'It is published on GitHub but not served via Pages.',
      'The main YouG8 app is linked from the main page.',
    ],
    features: ['Static privacy policy page'],
    tech: 'HTML',
    notes: 'Can be enabled on Pages the same way as the other projects if needed.',
  },
  {
    slug: 'pos-egypt',
    name: 'PharmaPOS (pos / pos-egypt)',
    type: 'Web app (Node + Render blueprint)',
    status: 'LIVE',
    live: 'https://pharmapos-6vfx.onrender.com',
    repo: 'https://github.com/MAGEGY/pos-egypt',
    origin: 'Local pos and pos-egypt projects (private repos)',
    short: [
      'PharmaPOS is a pharmacy point-of-sale web application.',
      'It is deployed on Render in two instances - one from the pos project and one from pos-egypt.',
      'Render auto-suffixed the service names, so the URLs are pharmapos-6vfx and pharmapos-61wk.',
      'Both projects include a render.yaml blueprint (service name: pharmapos).',
      'The repos are private on GitHub.',
    ],
    features: [
      'Pharmacy POS functionality',
      'Two Render deployments (pos and pos-egypt variants)',
      'Render blueprint ready (pharmapos service + pharmapos-data)',
    ],
    tech: 'Node, Render blueprint (private repos)',
    notes: 'Live URLs: pharmapos-6vfx.onrender.com and pharmapos-61wk.onrender.com.',
  },
  {
    slug: 'drugdose',
    name: 'DrugDose',
    type: 'Web app (Expo + expo-router + react-native-paper)',
    status: 'LIVE',
    live: 'https://magegy.github.io/DrugDose/',
    repo: 'https://github.com/MAGEGY/DrugDose',
    origin: 'Built from the empty DrugDose scaffold (now functional)',
    short: [
      'DrugDose is a pediatric drug dose calculator.',
      'Pick a drug, enter the child\'s weight, and it computes the dose per administration and the daily total.',
      'It checks every result against single-dose and daily maximums and warns when a dose is capped or exceeded.',
      'It includes a searchable reference of 1,071 Egyptian medicines with compositions and EGP prices, plus a dose schedule generator for OD/BID/TID/QID and hourly regimens.',
      'Calculations can be saved to a history list for later review.',
    ],
    features: [
      'Weight-based dose calculator with 12 common drug presets (paracetamol, ibuprofen, amoxicillin, azithromycin, and more)',
      'Single-dose and daily-maximum safety checks with warnings',
      'Searchable medicine reference (fuzzy search, Egyptian market, prices in EGP)',
      'Dose schedule generator: OD, BID, TID, QID, every 4/6/8 hours, bedtime',
      'Saved dose history (AsyncStorage/localStorage)',
      'Expo Router tabs, React Native Paper UI, works on web and Android',
    ],
    tech: 'Expo SDK 54, expo-router 6, React Native Paper, AsyncStorage, GitHub Pages',
    notes: 'The repo also contains the original native Android implementation (Kotlin: DoseCalculator, DrugDatabase, FDA API service). Educational tool - always verify doses against local guidelines.',
  },
]

const detailPage = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.name} - Project Details</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f8; color: #222; margin: 0; padding: 24px; }
  .container { max-width: 820px; margin: 0 auto; }
  .card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); margin-bottom: 16px; }
  h1 { color: #1a3c5e; margin-top: 0; }
  h2 { color: #2a5d8f; margin-top: 28px; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: #fff; }
  .badge.LIVE { background: #16a34a; }
  .badge.GITHUB { background: #64748b; }
  .badge.NOT-DEPLOYED, .badge.EMPTY { background: #f59e0b; }
  a { color: #1a73e8; }
  .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; background: #1a73e8; color: #fff; text-decoration: none; margin: 4px 8px 4px 0; }
  .btn.secondary { background: #475569; }
  ul { line-height: 1.8; }
  .muted { color: #64748b; }
  .back { margin-bottom: 16px; display: inline-block; }
</style>
</head>
<body>
<div class="container">
  <a class="back" href="../index.html">&larr; Back to all projects</a>
  <div class="card">
    <h1>${p.name} <span class="badge ${p.status}">${p.status}</span></h1>
    <p class="muted">${p.type} &middot; ${p.origin}</p>
    <p>
      ${p.live ? `<a class="btn" href="${p.live}" target="_blank">Open live site</a>` : ''}
      ${p.repo ? `<a class="btn secondary" href="${p.repo}" target="_blank">GitHub repository</a>` : ''}
    </p>
    <h2>What it does</h2>
    <ul>${p.short.map((s) => `<li>${s}</li>`).join('\n    ')}</ul>
    <h2>Features</h2>
    <ul>${p.features.map((f) => `<li>${f}</li>`).join('\n    ')}</ul>
    <h2>Tech stack</h2>
    <p>${p.tech}</p>
    <h2>Notes</h2>
    <p>${p.notes}</p>
  </div>
</div>
</body>
</html>
`

mkdirSync(new URL('../details', import.meta.url), { recursive: true })
for (const p of PROJECTS) {
  const file = new URL(`../details/${p.slug}.html`, import.meta.url)
  writeFileSync(file, detailPage(p))
  console.log('wrote', file.pathname)
}
console.log(`Done: ${PROJECTS.length} detail pages`)
