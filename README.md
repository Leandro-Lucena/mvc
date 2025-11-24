# Company and Employee Management System (MVC)

This project is a **Backend-only** application demonstrating the Model-View-Controller (MVC) architectural pattern applied to a simple company and employee management system. It provides a RESTful API for managing companies and employees.

**Note:** This project does not include a frontend interface. You will need to use tools like Postman, Insomnia, or `curl` to interact with the API.

## Technologies Used

- **Backend:** Node.js with Express.js
- **Language:** TypeScript
- **Validation:** Zod, cpf-cnpj-validator
- **Database:** In-memory data storage (for simplicity and demonstration purposes)

## Features

- **Company Management:** Create, Read, Update, and Delete (CRUD) operations for companies.
- **Employee Management:** Register and manage employees associated with companies.
- **MVC Architecture:** Structured following the MVC pattern for clear separation of concerns.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js installed on your system.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Leandro-Lucena/mvc.git
    cd mvc
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Project

To start the server in development mode (with hot-reloading):

```bash
npm run dev
```

The server will start on port **3000** (default).

To build the project for production:

```bash
npm run build
```

## API Endpoints

Here are some example endpoints you can test:

### Companies

- `POST /companies` - Create a new company
- `GET /companies` - List all companies
- `GET /companies/:id` - Get a company by ID
- `PUT /companies/:id` - Update a company
- `DELETE /companies/:id` - Delete a company

### Employees

- `POST /employee` - Create a new employee
- `GET /employee/:id` - Get an employee by ID
- `GET /employee/company/:companyId` - Get employees by company ID
