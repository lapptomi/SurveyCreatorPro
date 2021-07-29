/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import backgroundImage from '../style/img2.png';
import { LOGIN } from '../graphql/queries/login';
import Loading from '../components/Loading';

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
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Row
        color="black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: '900px',
        }}
      >
        <Loading active={loading} />
        <Grid.Column style={{ maxWidth: '700px' }} width={16}>
          <Header
            as="h1"
            content="SurveyCreatorPro"
            style={{ fontSize: '5em', ontWeight: 'bold' }}
          />
          <Header
            as="h2"
            content="Log in to your account"
            style={{ fontSize: '2.5em', fontWeight: 'normal' }}
          />

          <Form size="large" onSubmit={handleSubmit}>
            <Segment style={{
              background: 'rgba(14, 44, 71, 0.07)',
              marginTop: '50px',
            }}
            >
              <Message negative hidden={!errorMessage}>
                <Message.Header>Error logging in</Message.Header>
                <p>{errorMessage}</p>
              </Message>

              <Form.Input
                id="login-form-email-field"
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={(({ target }): void => setEmail(target.value))}
              />
              <Form.Input
                id="login-form-password-field"
                fluid
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

          <Message style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
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
