# Student Feedback System

A full-stack web application for collecting and analyzing student feedback on courses. Built with React, Node.js, Express, and PostgreSQL.

## 🎯 Project Overview

This system allows students to submit feedback on courses and enables instructors/admins to view analytics dashboards with feedback insights.

### Key Features

✅ **User Authentication**
- Secure login/registration with JWT tokens
- Role-based access (Student & Admin)
- Password encryption with bcrypt

✅ **Student Features**
- View available courses
- Submit star ratings (1-5) and comments
- Secure feedback submission
- Clean, intuitive interface

✅ **Admin Features**
- Create new courses
- View course analytics
- Track average ratings per course
- Monitor total feedback responses

✅ **Technical Excellence**
- Beautiful, responsive UI with Tailwind CSS
- RESTful API backend
- PostgreSQL database
- Real-time data synchronization
- Error handling & validation

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 19, Tailwind CSS, Axios |
| **Backend** | Node.js, Express, PostgreSQL |
| **Authentication** | JWT, bcrypt |
| **Routing** | React Router v6 |
| **Database** | PostgreSQL with schema |

## 📁 Project Structure

```
student-feedback-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── feedbackController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── feedback.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── StudentDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── AuthContext.js
│   │   └── index.js
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v10 or higher)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/VikasNagendraReddyKarri/vikas-project.git
cd student-feedback-system
```

**2. Setup Backend**
```bash
cd backend
npm install
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install
```

**4. Setup Database**
```bash
# Create database
createdb feedback_system

# Load schema
psql -d feedback_system -f ../database/schema.sql
```

**5. Configure Backend**
- Update `backend/db.js` with your database credentials if needed

**6. Start Backend**
```bash
cd backend
npm start
# Runs on http://localhost:3001
```

**7. Start Frontend (in new terminal)**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

## 📝 Demo Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

### Student Account
- **Email**: student@example.com
- **Password**: student123

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
```

### Courses
```
GET    /api/courses             - Get all courses
POST   /api/courses             - Create course (admin only)
```

### Feedback
```
POST   /api/feedback            - Submit feedback
GET    /api/feedback/:courseId  - Get feedback for course
```

### Analytics
```
GET    /api/analytics           - Get course analytics (admin only)
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    role VARCHAR(10) CHECK (role IN ('student', 'admin'))
);
```

### Courses Table
```sql
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    instructor VARCHAR(100)
);
```

### Feedback Table
```sql
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    course_id INT REFERENCES courses(id),
    question_id INT REFERENCES questions(id),
    rating INT,
    comment TEXT
);
```

## 🎨 Features in Detail

### For Students
- Secure login system
- Browse available courses
- Submit 1-5 star ratings
- Add detailed feedback comments
- Easy-to-use interface

### For Admins
- Comprehensive dashboard
- Create and manage courses
- View real-time analytics
- Track feedback statistics
- Average rating calculations

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API endpoints
- Secure token verification
- CORS enabled

## 📈 Future Enhancements

- Charts and graphs for analytics
- Email notifications
- Feedback export (PDF/CSV)
- Dark mode
- Multi-language support
- Advanced filtering options
- Comment moderation

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vikas Nagendra Reddy Karri**

## 📞 Contact

For questions or support, please reach out through GitHub issues.

## ✨ Acknowledgments

- React documentation and community
- Tailwind CSS for beautiful styling
- Express.js for backend framework
- PostgreSQL for reliable database

---

**Built with ❤️ as a full-stack learning project**
