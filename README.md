# SurveyJS + Angular + Node/SQLite

This project is a full-stack survey application using SurveyJS for the frontend and Node.js with SQLite for the backend.

## Features
- Modern Angular frontend with SurveyJS integration
- SurveyJS Form Creator page for building and editing surveys visually
- Collapsible, styled responses grid
- Node.js backend with SQLite database
- API for saving, updating, and retrieving survey responses and survey config
- Toast notifications and loading indicators for UX
- All SurveyJS styles loaded globally for consistent appearance

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   cd server && npm install && cd ..
   ```
2. **Build the Angular app:**
   ```sh
   npm run build
   ```
   This outputs static files to `public/` for serving by the backend.

3. **Run the backend (serves both API and frontend):**
   ```sh
   node server/index.js
   ```
   - App: http://localhost:10000
   - API: http://localhost:10000/api/survey-config

4. **Development (optional):**
   - You can run the Angular dev server with `npm start` for hot reload at http://localhost:4200, but for full integration, use the backend as above.

## Project Structure
- `src/app/` – Angular app code
- `server/` – Node.js backend and SQLite DB
- `public/` – Built Angular app (served by backend)

## Customization
- Use the SurveyJS Form Creator page (`/surveyjs-creator`) to visually build and edit surveys
- Edit `src/app/survey-json.ts` for manual survey JSON changes
- Update styles in `src/styles.css` and `src/app/app.css`

## SurveyJS Styles
- SurveyJS core and creator styles are imported globally in `src/styles.css` for consistent appearance across all components.

## License
MIT
