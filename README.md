# AppiFolio Backend

AppiFolio Backend powers the job application tracking experience for AppiFolio by exposing a RESTful API on top of MongoDB. It handles CRUD operations for application records, enforces consistent data shapes with Mongoose, and is optimized for quick local development with hot reload support.

## Tech Stack

- Node.js 18+ (JavaScript, CommonJS modules)
- Express 5
- MongoDB with Mongoose ODM
- dotenv for environment configuration
- CORS middleware for cross-origin access
- Nodemon for local development (dev dependency)

## Project Structure

```text
AppiFolio-backend/
├─ server.js              # Express app bootstrap and MongoDB connection
├─ package.json           # npm scripts and dependencies
├─ controllers/
│  └─ applicationController.js  # Route handlers for application CRUD
├─ models/
│  └─ Application.js      # Mongoose schema and model definition
├─ routes/
│  └─ applicationRoutes.js # REST routes mounted under /api/applications
├─ config/                # Reserved for future configuration helpers
├─ middlewares/           # Reserved for custom middleware modules
└─ utils/                 # Reserved for shared utilities
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A MongoDB instance (local or hosted) with connection string credentials

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env` file in the project root:
   ```env
   MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   PORT=5000
   ```
   - `MONGO_URL` is required for MongoDB connectivity.
   - `PORT` is optional; defaults to 5000.
3. Start the development server with automatic reload:
   ```bash
   npm run dev
   ```
   Or run without nodemon for production:
   ```bash
   npm start
   ```

## Available Scripts

| Command       | Description                                  |
|---------------|----------------------------------------------|
| `npm run dev` | Launches the API with nodemon for live reload |
| `npm start`   | Launches the API with Node.js                 |

## API Reference

All routes are prefixed with `/api/applications`.

### List Applications
- **GET** `/api/applications`
- Query parameters:
  - `userId` (string, required) – filters applications owned by a user
- Responses:
  - `200 OK` with array of applications
  - `500 Internal Server Error` on query failure

### Create Application
- **POST** `/api/applications`
- Body (JSON):
  ```json
  {
    "userId": "user-123",
    "role": "Frontend Engineer",
    "company": "Tech Corp",
    "type": "Remote",
    "link": "https://careers.techcorp.com/jobs/123",
    "dateApplied": "2024-10-12",
    "status": "Applied",
    "notes": "Follow up next week",
    "reminderDate": "2024-10-19",
    "isBookmarked": true,
    "tags": ["frontend", "react"],
    "priority": false,
    "resumeLink": "https://example.com/resume.pdf",
    "coverLetterLink": "https://example.com/cover-letter.pdf"
  }
  ```
- Responses:
  - `201 Created` with created application
  - `500 Internal Server Error` if persistence fails

### Update Application
- **PUT** `/api/applications/:id`
- Path parameters:
  - `id` (string, required) – MongoDB document identifier
- Body (JSON): Partial or full application object fields
- Responses:
  - `200 OK` with updated application
  - `400 Bad Request` if validation fails
  - `500 Internal Server Error` on unexpected errors

### Delete Application
- **DELETE** `/api/applications/:id`
- Path parameters:
  - `id` (string, required)
- Responses:
  - `200 OK` with deletion confirmation message
  - `500 Internal Server Error` on failure

## Data Model

The `Application` schema persisted in MongoDB via Mongoose contains:

| Field            | Type      | Required | Notes |
|------------------|-----------|----------|-------|
| `userId`         | String    | Yes      | Owner identifier |
| `role`           | String    | Yes      | Job title |
| `company`        | String    | Yes      | Hiring organization |
| `type`           | String    | Yes      | One of `Remote`, `Onsite`, `Hybrid` |
| `link`           | String    | Yes      | URL to the job posting |
| `dateApplied`    | Date      | Yes      | Application submission date |
| `status`         | String    | No       | Enum: `Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`, `No Response`; defaults to `Applied` |
| `notes`          | String    | No       | Free-form notes |
| `reminderDate`   | Date      | No       | Follow-up reminder |
| `isBookmarked`   | Boolean   | No       | Defaults to `false` |
| `tags`           | [String]  | No       | Custom labels |
| `priority`       | Boolean   | No       | Defaults to `false` |
| `resumeLink`     | String    | No       | Reference to stored resume |
| `coverLetterLink`| String    | No       | Reference to stored cover letter |
| `createdAt`      | Date      | No       | Added by Mongoose timestamps |
| `updatedAt`      | Date      | No       | Added by Mongoose timestamps |

## Error Handling

- Validation or lookup errors return descriptive JSON payloads with `error` or `message` keys.
- Server logs include connection status updates for MongoDB.

## License

This project is licensed under the ISC License. Refer to `package.json` for details.
