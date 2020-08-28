# Trashable API

Backend for Trashable app.Made by Andrei and Dragos.[Link to DB Model](https://app.lucidchart.com/documents/view/6b6fb8f9-e0fb-4930-b0e9-609756d9d720).

## Table of contents

- [Project Structure](###project-structure:)
- [Routes](ROUTES.md)

### Project Structure:

```
.
├── db
│   ├── migrations
│   │       Migration files.
│   └── seeds
│           Seed files.Run alphabetically.
├── knexfile.js (knex config file)
├── package.json
├── package-lock.json
├── README.md
├── ROUTES.md
├── src
│   ├── api
│   │   └── 0.1
│   │       ├── city
│   │       │   ├── city.model.js (Holds the Objection(ORM) model)
│   │       │   ├── city.route.js (Express route for /api/city/ routes)
│   │       │   └── city.schema.json (JSON schema for validation)
│   │       ├── county
│   │       │   ├   same structure
│   │       ├── trashcan
│   │       │   ├   same structure
│   │       ├── trashcanType
│   │       │   ├   same structure
│   │       └──router.js (Express router for /api/ routes)
│   ├── app.js (Express app)
│   ├── constants (self explanatory)
│   │   ├── cities.json
│   │   ├── counties.json
│   │   ├── tableNames.json
│   │   └── type.json
│   ├── db.js (db conection.Needs to be invoked in app.js in order to be sure it is alive)
│   ├── index.js ( makes app.js listen on a port)
│   └── middlewares.js (404 and general error handler)
└── tests
    └── app.test.js

```
