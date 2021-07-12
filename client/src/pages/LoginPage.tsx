import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import LoadingScreen from "../components/LoadingScreen";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries/login";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [login] = useMutation(LOGIN);

  const handleSubmit = (): void => {
    setLoading(true);

    login({ variables: { email, password } })
      .then((response) => {
        const token = JSON.stringify(response.data.login.token);        
        window.localStorage.setItem('loggedUser', token);
        window.location.replace('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        window.alert(error.message);
      });
  };

  return (
    <Grid textAlign='center' verticalAlign='middle'>
    <LoadingScreen isLoading={loading} />
      <Grid.Row color='black'>
        <Grid.Column style={{ maxWidth: '450px', marginTop: '300px' }} width={16}>
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