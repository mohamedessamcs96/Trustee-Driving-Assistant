# Trustee Monorepo

Starter build for the Trustee driver assistant app based on the brand guide.

## What is here

- `backend/` - Django REST backend for feed posts, news, morning tasks, and safety summary endpoints
- `mobile/` - React Native starter app with brand-aligned first screen and feature cards
- `Trustee_Brand_Guide (1).md` - source brand and feature reference

## Backend

From `backend/`:

1. Create and activate a Python environment.
2. Install requirements with `pip install -r requirements.txt`.
3. Run migrations with `python manage.py makemigrations` and `python manage.py migrate`.
4. Start the API with `python manage.py runserver`.

Main endpoints:

- `GET /api/health/`
- `GET /api/safety/summary/`
- `GET /api/v1/feed/posts/`
- `GET /api/v1/news/articles/`
- `GET /api/v1/morning/tasks/`

## Mobile

From `mobile/`:

1. Install packages with `npm install` or `yarn`.
2. Start the app with `npm start`.
3. Open it in Expo Go or a simulator.

## Next build step

Connect the mobile app to the Django API and replace the placeholder actions with real navigation and state.
