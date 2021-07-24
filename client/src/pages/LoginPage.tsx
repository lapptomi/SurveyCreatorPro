import React, { useState } from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import backgroundImage from '../style/header-image.png';
import { LOGIN } from '../graphql/queries/login';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [login] = useMutation(LOGIN);

  const handleSubmit = (): void => {
    setLoading(true);

    login({ variables: { email, password } })
      .then((response) => {
        const { token } = response.data.login;
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
    <Grid textAlign="center" verticalAlign="middle">
      <LoadingScreen isLoading={loading} />
      <Grid.Row
        color="black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: '1000px',
        }}
      >
        <Grid.Column style={{ maxWidth: '600px' }} width={16}>

          <Form size="large" onSubmit={handleSubmit}>
            <Segment style={{ background: 'rgba(14, 44, 71, 0.07)' }}>
              <Header
                as="h1"
                textAlign="center"
                content="Log in to your account"
                subheader="(Email must be realistic, for example: user@random.com)"
              />
              <Form.Input
                id="login-form-email-field"
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={(({ target }) => setEmail(target.value))}
              />
              <Form.Input
                id="login-form-password-field"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(({ target }) => setPassword(target.value))}
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
