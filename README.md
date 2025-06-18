# SurveyJS + Angular + Node/SQLite

This project is a full-stack survey application using SurveyJS for the frontend and Node.js with SQLite for the backend.

## Features
- Modern Angular frontend with SurveyJS integration
- Collapsible, styled responses grid
- Node.js backend with SQLite database
- API for saving, updating, and retrieving survey responses
- Toast notifications and loading indicators for UX

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   cd server && npm install && cd ..
   ```
2. **Run both frontend and backend:**
   ```sh
   npm start
   ```
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3001/api/response

3. **Database:**
   - Data is stored in `server/survey.db` (SQLite)
   - To migrate old JSON data, use `node server/migrate-to-sqlite.js` (optional)

## Project Structure
- `src/app/` – Angular app code
- `server/` – Node.js backend and SQLite DB

## Customization
- Edit `src/app/survey-json.ts` to change the survey
- Update styles in `src/app/app.css` and `src/app/responses.component.ts`

## License
MIT
