import React from 'react';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
} from 'semantic-ui-react';

const Footer: React.FC = () => (
  <Grid>
    <Grid.Row style={{ padding: '120px', background: '#0E2C47' }}>
      <Container textAlign="center">
        <Header inverted as="h1" content="SurveyCreatorPro" />
        <Header inverted as="span" subheader="© 2021 All Rights Reserved jne" />
        <Divider inverted section />
        <Item href="https://github.com/lapptomi/SurveyCreatorPro" target="_blank">
          <Header as="h3" inverted>
            <Icon.Group size="big">
              <Icon name="github" link />
            </Icon.Group>
            Project on Github
          </Header>
        </Item>
      </Container>
    </Grid.Row>
  </Grid>
);

export default Footer;
