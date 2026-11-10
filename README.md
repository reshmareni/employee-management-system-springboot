# Employee Management System

A RESTful Employee Management System built with Java 17, Spring Boot, Spring Data JPA, and PostgreSQL.

## About the Project

This project is a backend application that allows users to manage employee information through REST APIs.

It was developed as a learning project to practise Java, Spring Boot, database integration, and REST API development.

## Technologies Used

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- Jakarta Bean Validation
- Postman
- Git and GitHub

## Features

- Create a new employee
- Retrieve all employees
- Retrieve an employee by ID
- Update employee information
- Delete an employee
- Validate employee input
- Prevent duplicate email addresses
- Handle exceptions with meaningful HTTP responses

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## Database

This application uses PostgreSQL.

Create a database named:

`employee_management_db`

Configure your database connection in `application.properties`. Keep your database password private.

## Running the Project

1. Install Java 17 and PostgreSQL.
2. Create the database.
3. Configure your database connection.
4. Open the project in IntelliJ IDEA.
5. Run `EmployeeManagementSystemApplication.java`.

The application runs on:

`http://localhost:8080`

## Author

Developed as a Java Spring Boot learning project.
