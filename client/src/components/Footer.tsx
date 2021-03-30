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
  <Segment 
    inverted 
    vertical 
    style={{ 
      padding: 40,  
      opacity: '0.99',
    }}
  >
  <Grid divided inverted stackable>
    <Grid.Row>
      <Grid.Column textAlign={'center'} width={8}>
      <Header inverted as='h3' content='Info' />
        <List link inverted>
          <List.Item as='a' href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
            About The Project
          </List.Item>
          <List.Item as='a' href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
            Contact
          </List.Item>
        </List>
      </Grid.Column>
      <Grid.Column textAlign={'center'} width={8}>
        <Header as='h3' inverted>Tsoha-2021</Header>
        <p>Project On Github</p>
        <Menu.Item>
          <Icon name={'github'} size={'huge'} inverted/>
        </Menu.Item>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
);

export default Footer;
