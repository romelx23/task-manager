# Task Manager

## Overview

Task Manager is a React application that allows users to manage their tasks. Users can add, update, delete, and filter tasks based on their completion status. The application uses a backend API to store and retrieve tasks.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed or not completed
- Filter tasks by completion status
- Pagination for tasks (50 items per page)

## Technologies Used

- React
- TypeScript
- Axios
- Chakra UI
- React Icons

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/task-backend/task-manager.git
   cd task-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add the backend URL:

   ```env
   VITE_BACK_URL=http://localhost:8080
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
# or
yarn test
```

## Project Structure

- `src/`
  - `api/`: Contains the Axios instance for API calls.
  - `components/`: Contains the React components.
    - `main/`: Contains the main components for the application (e.g., `ListCards`, `CardComponent`, `CustomModal`).
    - `ui/`: Contains reusable UI components (e.g., `Button`, `Dialog`).
  - `context/`: Contains the context and provider for managing tasks.
  - `interfaces/`: Contains TypeScript interfaces for the project.
  - `App.tsx`: The main application component.
  - `main.tsx`: The entry point for the application.

## API Endpoints

- `GET /tasks`: Fetch all tasks with pagination (50 items per page).
- `POST /tasks`: Add a new task.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.
- `GET /tasks?completed=true`: Fetch tasks filtered by completion status.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
