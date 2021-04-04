import React, { useState } from 'react';
import { Gender, NewUser } from '../../types';
import userService from '../../services/users';
import validator from 'validator';
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

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Other);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleSubmit = (): void => {
    setLoading(true);

    const newUser: NewUser = { 
      email, username, password, gender
    };
    
    userService.create(newUser)
      .then(() => loginService.login({ username, password })
        .then((user) => {
          window.localStorage.setItem('loggedUser', JSON.stringify(user));
          setLoading(false);
          window.location.replace('/');
        })
      )
      .catch(() => {
        setLoading(false);
        window.alert('Error creating user, try again with valid credentials');
      });
  };

  const validCredentials = (): boolean => {
    return validator.isEmail(email)
      && username.length > 3 
      && password.length > 3 
      && acceptTerms 
      && Object.values(Gender).includes(gender);
  };

  const genderOptions = [
    { key: 'm', text: 'Male', value: Gender.Male },
    { key: 'f', text: 'Female', value: Gender.Female },
    { key: 'o', text: 'Other', value: Gender.Other },
  ];

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
                id='username'
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Username' 
                onChange={(({ target }) => setUsername(target.value))}
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
              <Form.Group widths='equal'>
                <Form.Select
                  options={genderOptions}
                  placeholder='Other'
                  onChange={((e, data) => setGender(data.value as Gender))}
                />
              </Form.Group>
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