### Hospital API

## Tech Stack

- Runtime: `Node.js`
- Framework: `Express.js`
- Database: `MongoDB`

## Dependencies

### Core Libraries:

- Express – Web framework for Node.js
- Mongoose – ODM for MongoDB
- jsonwebtoken (jwt) → Handles authentication
- validator → For data validation on both DB level and API level
- bcrypt → Hashes passwords
- dotenv → To manage environment variables
- cookie-parser → Parses cookies

### Development Dependencies:

- Nodemon – Auto-restarting for development

## API Structures:

### Doctor Routers

- /doctors/register → Registers a new doctor
- /doctors/login → User login

### Patient Routers

- /patients/register → Registers a new patient
- /patients/:id/create_report → Creates a report
- /patients/:id/all_reports → List all the reports of a patient oldest to latest

### Report Routers

- /reports/:status → List all the reports of all the patients filtered by a specific status
