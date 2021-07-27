import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading: React.FC = () => (
  <Dimmer active>
    <Loader>Loading...</Loader>
  </Dimmer>
);

export default Loading;
