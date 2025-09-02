# CivilGuruji Internship Task – Leads API

This is a simple **Leads Management API** built using **Node.js, Express.js, and MongoDB** for the CivilGuruji internship task.

---

##  Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose ODM)  
- **Validation:** express-validator  
- **Security:** Helmet, CORS  

---

##  Setup Instructions

###  Clone Repository
```bash
git clone https://github.com/your-username/civilguruji-task.git
cd civilguruji-task
```


###  Install Dependencies
```bash
npm install
```

###  Configure Environment Variables
```bash
PORT=4000
MONGO_URI=your-mongodb-connection-uri
```
###  Run the Server
```bash
npm start
```

##  Project Structure
```
civilgurujiTask/
│── src/
│   ├── config/        # DB connection
│   ├── controllers/   # Business logic
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middlewares/   # Auth, validation
│   └── server.js      # Entry point
│
├── .gitignore
├── package.json
├── README.md

```

## 📌 API Endpoints

### Lead Routes
| Method | Endpoint                    | Description           | Protected |
|--------|-----------------------------|-----------------------|-----------|
| POST   | `/api/leads`                | Create a new lead     | ❌        |
| GET    | `/api/leads`                | Get all leads         | ❌        |
| GET    | `/api/leads/{{leadId}}`     | Get a single lead     | ❌        |
| PUT    | `/api/leads/{{leadId}}`     | Update a lead         | ❌        |
| DELETE | `/api/leads/{{leadId}}`     | Delete a lead         | ❌        |

