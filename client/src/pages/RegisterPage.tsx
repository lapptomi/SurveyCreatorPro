import React, { useState } from 'react';
import validator from 'validator';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import backgroundImage from '../style/img2.png';
import { CREATE_NEW_USER } from '../graphql/queries/user';
import { LOGIN } from '../graphql/queries/login';
import Loading from '../components/Loading';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        setErrorMessage(error.message);
      });
  };

  const validCredentials = (): boolean => validator.isEmail(email)
      && password.length > 3
      && acceptTerms
      && password === confirmPassword;

  return (
    <Grid
      centered
      style={{ minHeight: '1000px' }}
      verticalAlign="middle"
    >
      <Grid.Row
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: '900px',
        }}
      >
        <Loading active={registerData.loading || loginData.loading} />
        <Grid.Column style={{ maxWidth: '700px' }} width={16}>
          <Header
            textAlign="center"
            content="SurveyCreatorPro"
            style={{ fontSize: '5em', fontWeight: 'bold' }}
          />
          <Header
            textAlign="center"
            content="Create new account"
            style={{ fontSize: '2.5em', fontWeight: 'normal' }}
          />
          <Form size="large" onSubmit={handleSubmit}>
            <Segment style={{
              background: 'rgba(14, 44, 71, 0.07)',
              marginTop: '50px',
            }}
            >
              <Message negative hidden={!errorMessage}>
                <Message.Header>Error creating new user</Message.Header>
                <p>{errorMessage}</p>
              </Message>

              <Form.Input
                id="register-form-email-field"
                fluid
                label="Email (must be realistic, like for example: user@random.com)"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={(({ target }): void => setEmail(target.value))}
              />
              <Form.Input
                id="register-form-password-field"
                fluid
                label="Password (must be at least 6 characters)"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(({ target }): void => setPassword(target.value))}
              />
              <Form.Input
                id="register-form-confirm-password-field"
                fluid
                label="Confirm password"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={(({ target }): void => setConfirmPassword(target.value))}
              />
              <Form.Field style={{ textAlign: 'center' }}>
                <Form.Checkbox
                  className="register-form-accept-terms-checkbox"
                  inline
                  label="I agree to the terms and something..."
                  required
                  onClick={(): void => setAcceptTerms(!acceptTerms)}
                />
              </Form.Field>
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
          <Message style={{ textAlign: 'center' }}>
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
