import React from 'react';
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
} from 'semantic-ui-react';

const Footer: React.FC = () => (
  <Grid>
    <Grid.Row style={{ padding: '120px', background: '#0E2C47' }}>
      <Grid.Column width={16}>
        <Container textAlign="center">
          <Grid divided inverted>
            <Grid.Column width={16}>
              <Header inverted as="h1" content="SurveyCreatorPro" />
              <Header inverted as="span" subheader="© 2021 All Rights Reserved jne" />
            </Grid.Column>
          </Grid>
          <Divider inverted section />
          <List horizontal inverted link size="small">
            <List.Item as="a" href="/item1">
              Site Map
            </List.Item>
            <List.Item as="a" href="/item2">
              Contact Us
            </List.Item>
            <List.Item as="a" href="/item3">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="/item4">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Footer;
