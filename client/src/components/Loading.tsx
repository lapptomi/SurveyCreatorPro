import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
  active: boolean | undefined;
}

const Loading: React.FC<Props> = ({ active }) => (
  <Dimmer active={active}>
    <Loader>Loading...</Loader>
  </Dimmer>
);

export default Loading;
