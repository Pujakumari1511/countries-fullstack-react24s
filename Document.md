# countries-fullstack-react24s

This repository is a full-stack application for displaying information about countries. The frontend is built using React and TypeScript, and it incorporates several features to enhance user experience.

## Features

### Weather Information

- **Description**: Added a feature to display weather information for each country, providing users with current weather data.
- **Redux Configuration**: Configured Redux to manage the state of weather information. The weather state is fetched from an external API and stored in the Redux store. This allows the application to access and display weather data efficiently across different components.

### Pagination

- **Description**: Implemented pagination to improve the performance and usability of the country list page.

### Dark Mode

- **Description**: Introduced a dark mode feature to the application, allowing users to switch between light and dark themes.
- **Implementation**: The dark mode feature is implemented using Material-UI's theming capabilities, allowing for a seamless transition between light and dark themes.

### Filter by Region and Subregion

- **Description**: Implemented filtering functionality to allow users to filter countries by their region and subregion.
- **Implementation**: The filtering feature is implemented using a combination of React state and Redux. Users can select a region or subregion from a dropdown menu, and the country list will update accordingly.

### Redux Configuration for Weather API

The weather feature in this application is powered by Redux for state management. Here’s a brief overview of the Redux setup for the weather API:

- **Actions:** Defined actions to fetch weather information from the API.
- **Reducers:** Created reducers to handle the state changes for weather data.
- **Store:** Configured the Redux store to include the weather state.
- **Thunk Middleware:** Utilized Redux Thunk for asynchronous actions to fetch weather data from the API.
  This configuration allows the application to efficiently manage and update the weather information across different components, ensuring a seamless user experience.

### Country Detail View Implementation

The application implements a detailed view for individual countries, which is managed through Redux and React Router. Here's how the country detail functionality works:

### Endpoint and API Integration

- **Fetch Country by Code:** Created an async thunk `fetchCountryByCode` that retrieves detailed information about a specific country using its country code (e.g., 'FIN' for Finland).
- **Error Handling:** Implemented comprehensive error handling using try-catch and rejectWithValue to display meaningful error messages to users when country data cannot be retrieved.

### State Management

- **Selected Country State:** Added a `selectedCountry` field to the countries slice state to store the currently selected country's complete information.
- **Loading and Error States:** Maintained loading and error states in Redux to provide feedback to users during data fetching operations.
- **Clear Selected Country:** Implemented an action to clear the selected country from state when navigating away from the country details page.

### Component Integration

- **URL Parameters:** Utilized React Router's `useParams` hook to extract the country code from the URL.
- **Conditional Rendering:** The CountryDetails component displays appropriate loading indicators, error messages, or country information based on the current state.
- **Responsive Design:** Implemented a responsive layout that adapts to different screen sizes, ensuring a consistent user experience across devices.

This implementation provides a seamless user experience when viewing detailed information about individual countries, with proper state management and error handling throughout the process.

## Technology Used

- **TypeScript**: The primary language used for the frontend application.
- **React**: The JavaScript library used for building the user interface.
- **Redux**: Used for state management, particularly for managing the weather state and other global states.
- **Material-UI**: Utilized for implementing responsive and modern UI components.

## Initial Setup

To set up the frontend of the application, follow these steps:

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Pujakumari1511/countries-fullstack-react24s.git
   cd countries-fullstack-react24s
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Start the Development Server**

   ```sh
   npm run dev
   ```

4. **Access the Application**
   Open web browser and navigate to `http://localhost:5180` to view the application.
