/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../graphql/queries/login';
import Loading from '../components/Loading';
import '../style/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [login, { loading }] = useMutation(LOGIN);

  const handleSubmit = (): void => {
    login({ variables: { email, password } })
      .then((response) => {
        const { token } = response.data.login;
        window.localStorage.setItem('loggedUser', token);
        window.location.replace('/');
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <Grid verticalAlign='middle'>
      <Grid.Row className='login-grid-row-1' centered>
        <Loading active={loading} />
        <Grid.Column className='login-grid-row-1-col-1' width={16}>
          <Header id='login-grid-row-1-header'>SurveyCreatorPro</Header>
          <Header id='login-grid-row-1-subheader'>Log in to your account</Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment id='login-form'>
              <Message negative hidden={!errorMessage}>
                <Message.Header>Error logging in</Message.Header>
                <p>{errorMessage}</p>
              </Message>
              <Form.Input
                id="login-form-email-field"
                fluid
                label="Email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={(({ target }): void => setEmail(target.value))}
              />
              <Form.Input
                id="login-form-password-field"
                fluid
                label="Password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(({ target }): void => setPassword(target.value))}
              />
              <Button
                id="login-form-login-button"
                color="blue"
                fluid
                size="large"
                type="submit"
                disabled={!email || !password}
              >
                Log in
              </Button>
            </Segment>
          </Form>
          <Message id='login-form-footer'>
            Don&apos;t have an account yet?  &nbsp;
            <Link to="/register">
              Sign up here
            </Link>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoginPage;
