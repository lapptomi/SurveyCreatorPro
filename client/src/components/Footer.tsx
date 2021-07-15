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
    <Grid.Row
      style={{
        padding: '120px', 
        background: "#0E2C47"
      }}
    >
    <Grid.Column width={16}>
      <Container textAlign="center">
        <Grid divided inverted>
          <Grid.Column width={16}>
            <Header inverted as="h1" content="SurveyCreatorPro" />
            <Header inverted as="p" subheader="© 2021 All Rights Reserved jne"/>
          </Grid.Column>
        </Grid>
        <Divider inverted section />
        <List horizontal inverted link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Grid.Column>
  </Grid.Row>
</Grid>
);

export default Footer;