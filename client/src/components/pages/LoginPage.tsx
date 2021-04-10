import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import loginService from '../../services/login';
import LoadingScreen from "../LoadingScreen";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (): void => {
    setLoading(true);

    loginService.login({ email, password })
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
    <Grid textAlign='center' style={{ minHeight: '100vh', margin: 0 }} verticalAlign='middle'>
    <LoadingScreen isLoading={loading} />
      <Grid.Row color='black'>
        <Grid.Column style={{ maxWidth: 450 }} width={16}>
          <Header as='h2' inverted textAlign='center'>
            Log in to your account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment vertical inverted>
              <Form.Input 
                id='email'
                fluid icon='at' 
                iconPosition='left' 
                placeholder='Email' 
                onChange={((event) => setEmail(event.target.value))}
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
      </Grid.Row>
    </Grid>
  );
};
 
export default LoginPage;