import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <Dimmer active={isLoading}>
      <Loader />
    </Dimmer>
  );
};

export default LoadingScreen;