# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Install

Run `npm install`

## Development server

Check `port 4200 is free`

Check `port 8080 is free and Spring boot TaskManagerServer is running `

Check `8080 is not running still this may work standalone` 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Project Overview

Project Brief: Create a simple web application for managing a list of tasks. The application should allow users to add, display list, view details, edit, and delete tasks. The tasks will be stored and retrieved from this backend service created using Java Spring Boot. The Frontend app will be Angular app.

### Project Requirements:### Project Requirements:
Frontend:
- Angular application with basic CRUD operations.
- Display tasks in a table or list format. Task should include Title, Description, and Due Date.
- Allow editing and deleting tasks inline or via a modal.
- Use Angular Services to interact with the backend.
- Implement form validation for adding & editing tasks.
- Include ability to delete a task from list.
- Include at least 2 data transformations (assume these will be used in more than 1 place in project) 
    - one for truncating Description to 20 chars with elipses at end in the list
    - one for modifying date format when shown in list to Oct 30, 2024 format (but stored in ISO format in DB)
- Applicant should utilize latest version of Angular 18 and utilize common Angular design patterns and concepts where appropriate.
* Bonus points to use Material UI angular components for UI 
* Bonus points for using NgRx or Signals 
* Bonus points for showing Routing

Backend:
- Java Spring Boot application with RESTful endpoints for task management.
- Task should include id, title, description, and duedate
- CRUD operations: Create, Read, Update, Delete.
- Use an in-memory database (like H2) for simplicity.
* Bonus points for including some type of Auth for API 

