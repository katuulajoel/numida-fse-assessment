# Numida Full-Stack Engineering Assessment

![Numida](./web/src/assets/logo.numida.png)

## Project Overview

This project is a full-stack application that displays loan status information. It consists of a GraphQL backend and a React frontend that work together to provide a user-friendly interface for monitoring loan statuses.

## Implementation Approach

### Backend
- Updated the GraphQL schema to expose `loan_payments` data.
- Created appropriate relationships between loan and payment entities.
- Optimized data fetching to support efficient frontend consumption.

### Frontend
- Built a responsive single-page application with modular React components.
- Implemented i18n translation support for internationalization.
- Applied conditional styling based on loan status (`On Time`, `Late`, `Defaulted`, `Unpaid`).
- Used Apollo Client for GraphQL integration.

### Loan Status Logic
- Implemented loan status calculation with the following rules:
  - **Paid**: A loan is considered paid when total payments equal `principal + interest`.
  - **Status Determination**: Used the most recent payment date to determine status:
    - **On Time (GREEN)**: Payment made within 5 days of the due date.
    - **Late (ORANGE)**: Payment made 6-30 days after the due date.
    - **Defaulted (RED)**: Payment made more than 30 days after the due date.
    - **Unpaid (GREY)**: No payment recorded.

## Setup Instructions

### Server Setup
For instructions on setting up and running the server, refer to the [server README](server/README.md).

### Web App Setup
For instructions on setting up and running the web application, refer to the [web README](web/README.md).

## Features
- View all loans with their status information.
- Visual indicators for different loan statuses.
- Responsive design for different screen sizes.
- Internationalization support.

## Code Structure
- **`server`**: Backend GraphQL API.
- **`web`**: Frontend React application.
  - **`/src/components`**: Reusable UI components.
  - **`/src/hooks`**: Custom React hooks.
  - **`/src/i18n`**: Internationalization configuration.
  - **`/src/utils`**: Utility functions, including loan status calculation.

## Future Improvements
With additional time, I would consider:
- Building more advanced filtering and sorting capabilities.
- Enhancing the UI with additional visualizations.
- Limit adding payments for loans that have been closed or paid in full

## Contact
For any questions about this implementation, please contact me at katuula@gmail.com.
