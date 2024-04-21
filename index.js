/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/authContext'; // Import the AuthProvider

// Wrap the App component with AuthProvider
const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Register the component
AppRegistry.registerComponent(appName, () => AppWithAuthProvider);
