import React, { useState } from 'react';
import loginService from '../../services/login';
import { 
  Button, 
  Form, 
  Grid, 
  Header, 
  Message, 
  Segment 
} from 'semantic-ui-react';
import LoadingScreen from '../LoadingScreen';


const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (): void => {
    setLoading(true);

    loginService.login({ username, password })
      .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        setLoading(false);
        window.location.replace('/');
      })
      .catch(() => {
        setLoading(false);
        window.alert('Wrong credentials, please try again');
      });
  };

  return (
    <>
    <LoadingScreen isLoading={loading} />
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' inverted textAlign='center'>
          Log in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked inverted>
            <Form.Input 
              id='username'
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Username' 
              onChange={((event) => setUsername(event.target.value))}
            />
            <Form.Input
              id='password'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={((event) => setPassword(event.target.value))}
            />
            <Button color='blue' fluid size='large' type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        <Message color={'black'}>
          Don&apos;t have an account yet? <a href='/register'>Sign Up here</a>
        </Message>
      </Grid.Column>
    </Grid>
    </>
  );
};

export default LoginForm;