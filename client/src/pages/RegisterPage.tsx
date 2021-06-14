import React, { useState } from 'react';
import validator from 'validator';
import { 
  Button, 
  Form, 
  Grid, 
  Header, 
  Message, 
  Segment 
} from 'semantic-ui-react';
import LoadingScreen from '../components/LoadingScreen';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_USER } from '../graphql/queries/user';
import { LOGIN } from '../graphql/queries/login';

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const [login] = useMutation(LOGIN);

  const handleSubmit = (): void => {
    setLoading(true);

    createNewUser({ variables: { email, password } })
      .then(() => login({ variables: { email, password } })
        .then((response) => {
          const token = JSON.stringify(response.data.login.token);
          console.log(token);
          
          window.localStorage.setItem('loggedUser', token);
          window.location.replace('/');
        })
      )
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        window.alert(error);
      });
  };

  const validCredentials = (): boolean => {
    return validator.isEmail(email)
      && password.length > 3 
      && acceptTerms
      && password === confirmPassword;
  };

  return (
    <Grid textAlign='center' style={{ minHeight: '100vh' }} verticalAlign='middle' padded>
      <LoadingScreen isLoading={loading} />
      <Grid.Row color='black'>
        <Grid.Column style={{ maxWidth: 450 }} width={16}>
          <Header as='h2' inverted textAlign='center'>
            Create New Account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked inverted>
              <Form.Input 
                id='email'
                fluid icon='at' 
                iconPosition='left' 
                placeholder='Email' 
                onChange={(({ target }) => setEmail(target.value))}
              />
              <Form.Input
                id='password'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(({ target }) => setPassword(target.value))}
              />
               <Form.Input
                id='confirmPassword'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                onChange={(({ target }) => setConfirmPassword(target.value))}
              />
              <Form.Checkbox
                inline
                label='I agree to the terms and something...'
                required
                onClick={() => setAcceptTerms(!acceptTerms)}
              />
              <Button 
                id='signupbutton'
                color='blue' 
                fluid size='large' 
                type='submit'
                disabled={!validCredentials()}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message color={'black'}>
            Already have an account? <a href='/login'>Log in here</a>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RegisterForm;