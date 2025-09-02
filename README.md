# Resume Builder

A fullstack resume builder web app using Node.js, Express.js, MongoDB, EJS, Bootstrap 5, and vanilla JS.

---

## Features Implemented

- **User Authentication**: Register, login, logout (Passport.js)
- **Resume Builder Form**: Add/edit all resume sections (personal info, summary, education, experience, skills, projects, certifications, achievements)
- **Dynamic Fields**: Add/remove multiple entries for education, experience, skills, etc.
- **Resume Versioning**: Every save/edit creates a new version; dashboard shows all versions
- **Edit & Pre-fill**: Edit any version with pre-filled fields
- **Delete Resume**: Delete any resume version from dashboard
- **PDF Download**: Download any resume version as PDF
- **Flash Messages**: Error/success feedback for all actions
- **Bootstrap 5 UI**: Responsive, modern design

---

## Setup & Run Instructions

1. **Clone the repository**
 -  git clone 
  - cd "resume builder"

2. **Install dependencies**

   - npm install

3. **Configure environment**
   - Edit `.env` file if needed (default uses local MongoDB)
   MONGO_URI=mongodb://localhost:27017/resume_builder
   PORT=5000
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running locally (`mongod`)

5. **Run the app**
   ```sh
   npm run dev
   # or
   npm start
   ```

6. **Open in browser**
   - Visit [http://localhost:5000](http://localhost:5000)

---

## Screenshots

### 1. Register/Login
![Register](screenshots/register.png)
![Login](screenshots/login.png)

### 2. Resume Builder Form
![Resume Form](screenshots/resume_form.png)

### 3. Dashboard (Resume Versions)
![Dashboard](screenshots/dashboard.png)

### 4. PDF Download
![PDF](screenshots/pdf.png)

---

## Folder Structure
```
resume builder/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── .env
├── app.js
├── package.json
└── README.md
```

---

## License
MIT
