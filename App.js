import React from 'react';
import Routes from "./src/Routes";
import { AuthProvider } from './src/AuthProvider';

export default () => {
  return (
        <AuthProvider>
          <Routes />
        </AuthProvider>
  );
}

