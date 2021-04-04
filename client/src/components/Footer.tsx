import React from 'react';
import {
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';

const Footer: React.FC = () => (
  <footer style={{ minWidth: '768px', width: '100%' }}>
    <Grid>
      <Grid.Row color='black' centered style={{ padding: 50 }}>

        <Grid.Column textAlign={'center'} width={8}>
          <Segment inverted>
            <Header as='h3' content='Info' />
            <List link inverted>
              <List.Item as='a' href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
                About The Project
              </List.Item>
              <List.Item as='a' href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
                Contact
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column textAlign={'center'} width={8}>
          <Segment inverted >
            <Header as='h3'>Tsoha-2021</Header>
              <p>Project On Github</p>
            <Menu.Item>
              <Icon name={'github'} size={'huge'} inverted/>
            </Menu.Item>
          </Segment>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  </footer>
);

export default Footer;
