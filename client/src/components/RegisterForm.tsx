import React, { useState } from 'react';
import { FormEvent } from 'react';
import { Gender } from '../types';
import { 
  Button, 
  Form, 
  Grid, 
  Header, 
  Message, 
  Segment 
} from 'semantic-ui-react';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Other);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    window.alert(`
      EMAIL: ${email}\n 
      USERNAME: ${username}\n
      PASSWORD: ${password}\n
      GENDER: ${gender}
    `);
  };

  const validCredentials = (): boolean => {
    return (
      email.length > 3 &&
      username.length > 2 && 
      password.length > 3 &&
      acceptTerms &&
      Object.values(Gender).includes(gender)
    );
  };

  const genderOptions = [
    { key: 'm', text: 'Male', value: Gender.Male },
    { key: 'f', text: 'Female', value: Gender.Female },
    { key: 'o', text: 'Other', value: Gender.Other },
  ];

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' inverted textAlign='center'>
          Create New Account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked inverted>
            <Form.Input 
              fluid icon='at' 
              iconPosition='left' 
              placeholder='Email' 
              onChange={(({ target }) => setEmail(target.value))}
            />
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Username' 
              onChange={(({ target }) => setUsername(target.value))}
            />
            <Form.Input
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
          Already have an account? <a href='/register'>Log in here</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
