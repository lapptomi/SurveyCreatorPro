import React, { useState } from 'react';
import validator from 'validator';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import backgroundImage from '../style/header-image.png';
import { CREATE_NEW_USER } from '../graphql/queries/user';
import { LOGIN } from '../graphql/queries/login';
import Loading from '../components/Loading';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const [createNewUser, registerData] = useMutation(CREATE_NEW_USER);
  const [login, loginData] = useMutation(LOGIN);

  const handleSubmit = (): void => {
    createNewUser({ variables: { email, password } })
      .then(() => login({ variables: { email, password } })
        .then((response) => {
          const { token } = response.data.login;
          window.localStorage.setItem('loggedUser', token);
          window.location.replace('/');
        }))
      .catch((error) => {
        console.log(error.message);
        window.alert(error);
      });
  };

  const validCredentials = (): boolean => validator.isEmail(email)
      && password.length > 3
      && acceptTerms
      && password === confirmPassword;

  if (registerData.loading || loginData.loading) {
    return <Loading />;
  }

  return (
    <Grid
      textAlign="center"
      style={{ minHeight: '1000px' }}
      verticalAlign="middle"
    >
      <Grid.Row
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: '1000px',
        }}
      >
        <Grid.Column style={{ maxWidth: 600 }} width={16}>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment style={{ background: 'rgba(14, 44, 71, 0.07)' }}>
              <Segment style={{ background: 'rgb(34 69 101)' }}>
                <Header
                  as="h1"
                  inverted
                  style={{ fontSize: '30px', margin: '10px' }}
                >
                  <Icon name="signup" />
                  Create new account
                </Header>
              </Segment>

              <Form.Input
                id="register-form-email-field"
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email (must be realistic, like for example: user@random.com)"
                onChange={(({ target }) => setEmail(target.value))}
              />
              <Form.Input
                id="register-form-password-field"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(({ target }) => setPassword(target.value))}
              />
              <Form.Input
                id="register-form-confirm-password-field"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={(({ target }) => setConfirmPassword(target.value))}
              />
              <Form.Checkbox
                className="register-form-accept-terms-checkbox"
                inline
                label="I agree to the terms and something..."
                required
                onClick={() => setAcceptTerms(!acceptTerms)}
              />
              <Button
                id="register-form-signup-button"
                color="blue"
                fluid
                size="large"
                type="submit"
                disabled={!validCredentials()}
              >
                Sign Up
              </Button>

            </Segment>
          </Form>
          <Message style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
            Already have an account? &nbsp;
            <Link to="/login">
              Log in here
            </Link>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RegisterForm;
