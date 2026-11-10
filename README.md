# Employee Management System

A full-stack Employee Management System built with Java 17, Spring Boot, Spring Data JPA, PostgreSQL, HTML, CSS, JavaScript, and Bootstrap.

The application provides a web-based dashboard for managing employee records through RESTful APIs.

## About the Project

This project was developed as a learning project to practise full-stack Java development, REST API development, database integration, and frontend development.

It combines a Spring Boot backend with a responsive web-based frontend.

## Technologies Used

**Backend**
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Jakarta Bean Validation
- Maven

**Frontend**
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

**Database and Tools**
- PostgreSQL
- Postman
- IntelliJ IDEA
- Git and GitHub

## Features

- Add new employees
- View all employees
- Retrieve an employee by ID
- Update employee information
- Delete employees
- Search employees
- Display total employee count
- Display total department count
- Validate employee input
- Prevent duplicate email addresses

## Application Screenshots

Screenshots of the application dashboard and employee management features can be added here.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

## Database Configuration

This application uses PostgreSQL.

Create a database named:

`employee_management_db`

Configure the database connection in `application.properties`.

The database password is supplied through the `DB_PASSWORD` environment variable. Do not commit database credentials to GitHub.

## Running the Project

1. Install Java 17 and PostgreSQL.
2. Create the `employee_management_db` database.
3. Configure the database connection.
4. Set the `DB_PASSWORD` environment variable.
5. Open the project in IntelliJ IDEA.
6. Run `EmployeeManagementSystemApplication.java`.
7. Open the application in your browser:

`http://localhost:8080`

The frontend is served by Spring Boot from `src/main/resources/static`.

## Author

Developed as a Java Spring Boot full-stack learning project.