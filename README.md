# 🎓 Academic Course Management System

A full-stack web application for managing academic courses with role-based access control, specialization tracking, and comprehensive course management features.

![Java](https://img.shields.io/badge/Java-21.0.8-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.4-brightgreen?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-9.3.0-blue?style=flat-square&logo=mysql)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- **Token-based Authentication**: Secure login system with custom token management
- **Google OAuth Integration**: Sign in with Google account
- **Role-Based Access Control**: Separate dashboards for Admin and Student roles
- **Session Management**: Automatic token validation and logout functionality

### 👨‍💼 Admin Dashboard
- **Course Management**: Full CRUD operations for courses
  - Create new courses with code, title, description, credits, and specializations
  - Edit existing course details
  - Delete courses with confirmation
- **Specialization Assignment**: Multi-select specialization assignment for each course
- **Search & Filter**: Search courses by title/code and filter by specialization
- **Validation**: Duplicate detection for course codes and titles
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Instant feedback with success/error alerts

### 👨‍🎓 Student Dashboard
- **Course Catalog**: Browse all available courses with detailed information
- **Search Functionality**: Find courses by title or course code
- **Specialization Filter**: View courses by specific specializations
- **Statistics Dashboard**: 
  - Total courses count
  - Filtered courses count
  - Dynamic credit calculation based on filters
- **Responsive Design**: Card-based layout optimized for all screen sizes
- **Dark Mode Support**: Consistent dark mode experience

### 🎯 Course Features
- **Course Details**: Code, Title, Description, Credits (1-6)
- **Specialization Tracking**: Multiple specializations per course
- **Database Relationships**: Proper JOIN queries for efficient data retrieval
- **Validation**: Input validation on both frontend and backend

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.1.4
- **Language**: Java 21.0.8 (Oracle JDK)
- **Database**: MySQL 9.3.0 (MySQL Community Server)
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Custom token-based authentication
- **Build Tool**: Maven 3.9.11
- **Architecture**: RESTful API with DTO pattern

### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.9.3
- **Styling**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Fetch API
- **Runtime**: Node.js 24.11.0, npm 11.6.1

### Database Schema
```sql
courses
├── course_id (PK)
├── course_code (UNIQUE)
├── name
├── description
├── credits
├── year
├── term
├── faculty
└── capacity

specialisation
├── specialisation_id (PK)
├── code (UNIQUE)
├── name
├── description
├── year
└── credits_required

specialisation_course (Junction Table)
├── id (PK)
├── specialisation_id (FK)
└── course_id (FK)

users
├── user_id (PK)
├── email (UNIQUE)
├── password
├── full_name
└── role
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Login     │  │    Admin     │  │   Student    │      │
│  │    Page      │  │  Dashboard   │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                    ┌───────▼────────┐                       │
│                    │   API Client   │                       │
│                    └───────┬────────┘                       │
└────────────────────────────┼──────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼──────────────────────────────┐
│                    Backend (Spring Boot)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Controllers  │  │   Services   │  │ Repositories │    │
│  │  - Auth      │  │  - Auth      │  │  - User      │    │
│  │  - Course    │  │  - Course    │  │  - Course    │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │            │
│         └──────────────────┴──────────────────┘            │
│                            │                               │
│                    ┌───────▼────────┐                      │
│                    │   Data Layer   │                      │
│                    └───────┬────────┘                      │
└────────────────────────────┼─────────────────────────────┘
                             │ JDBC
                    ┌────────▼─────────┐
                    │  MySQL Database  │
                    └──────────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)**: 21 or higher (tested with Oracle JDK 21.0.8)
- **Maven**: 3.9+ (tested with Maven 3.9.11)
- **Node.js**: 24+ and npm 11+ (tested with Node.js 24.11.0 and npm 11.6.1)
- **MySQL**: 9.3+ (tested with MySQL Community Server 9.3.0)
- **Git**: For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/prateekkumaryadav2/SEM_1_ESD.git
cd SEM_1_ESD
```

### 2. Database Setup

Create a MySQL database and configure the schema:

```sql
CREATE DATABASE academic_db;
USE academic_db;

-- Run the schema scripts to create tables
-- (courses, specialisation, specialisation_course, users)
```

### 3. Backend Setup

```bash
cd backend

# Update application.properties with your database credentials
# src/main/resources/application.properties

# Build the project
mvn clean package -DskipTests

# Run the application
java -jar target/academic-0.0.1-SNAPSHOT.jar
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/academic_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080
```

### Frontend Configuration

The frontend is configured to proxy requests to the backend. Check `package.json`:

```json
{
  "proxy": "http://localhost:8080"
}
```

### Google OAuth Setup

Refer to `GOOGLE_OAUTH_SETUP.md` for detailed instructions on setting up Google OAuth integration.

## 📖 Usage

### For Administrators

1. **Login**: Use admin credentials or Google OAuth
2. **Add Course**: Click "Add New Course" button
   - Enter course code, title, credits, and description
   - Select specializations using Ctrl/Cmd + Click
   - Submit to create
3. **Edit Course**: Click edit icon on any course
   - Modify details and specializations
   - Save changes
4. **Delete Course**: Click delete icon and confirm
5. **Search/Filter**: Use search bar and specialization dropdown to find courses

### For Students

1. **Login**: Use student credentials or Google OAuth
2. **Browse Courses**: View all available courses in card layout
3. **Search**: Type in search bar to find courses by title or code
4. **Filter**: Select a specialization from dropdown to view related courses
5. **View Details**: Each card shows course code, title, description, credits, and specializations

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login with credentials | No |
| POST | `/api/auth/google` | Login with Google OAuth | No |
| POST | `/api/auth/logout` | Logout user | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | Yes |
| POST | `/api/courses` | Create new course | Yes (Admin) |
| PUT | `/api/courses/{id}` | Update course | Yes (Admin) |
| DELETE | `/api/courses/{id}` | Delete course | Yes (Admin) |
| GET | `/api/courses/specialisations` | Get all specializations | Yes |

### Request/Response Examples

#### Create Course
```json
POST /api/courses
{
  "code": "CS301",
  "title": "Database Systems",
  "description": "Introduction to database design and SQL",
  "credits": 4,
  "specialisationIds": [1, 3]
}

Response:
{
  "id": 15,
  "code": "CS301",
  "title": "Database Systems",
  "credits": 4,
  "description": "Introduction to database design and SQL",
  "specialisations": ["Computer Science", "Data Science"]
}
```

## 📁 Project Structure

```
esd/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/academic/
│   │   │   │   ├── config/          # Security & Configuration
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Exception Handlers
│   │   │   │   ├── mapper/          # Entity-DTO Mappers
│   │   │   │   ├── model/           # JPA Entities
│   │   │   │   ├── repository/      # Data Access Layer
│   │   │   │   └── service/         # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── target/                      # Build output
│   └── pom.xml                      # Maven configuration
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── containers/         # Smart components
│   │   │   │   ├── CoursesContainer.tsx
│   │   │   │   └── StudentDashboard.tsx
│   │   │   └── presentation/       # Presentational components
│   │   │       ├── CourseForm.tsx
│   │   │       ├── CourseTable.tsx
│   │   │       ├── Login.tsx
│   │   │       ├── Navbar.tsx
│   │   │       └── Alert.tsx
│   │   ├── context/                # React Context
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── pages/                  # Page components
│   │   ├── api.ts                  # API client
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── GOOGLE_OAUTH_SETUP.md
└── README.md
```

## 🎨 Features Showcase

### Dark Mode
- Consistent dark theme across all components
- Toggle button in navigation bar
- Persisted preference using React Context

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Adaptive layouts for all screen sizes

### Error Handling
- Frontend validation
- Backend exception handling with GlobalExceptionHandler
- User-friendly error messages
- Network error recovery

### Performance Optimizations
- Optimized JOIN queries (avoiding N+1 problem)
- Efficient data fetching
- Debounced search functionality
- Lazy loading where applicable
