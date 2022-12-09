import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedLayout = ({ children }) => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return (
    <>
      {error || !isAuthenticated && !isLoading && <p>Authentication error..</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && isAuthenticated && (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default ProtectedLayout;