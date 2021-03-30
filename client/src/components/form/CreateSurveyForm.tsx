import React, { useState } from 'react';
import { NewSurvey } from '../../types';
import surveyService from '../../services/surveys';
import { 
  Button, 
  Container, 
  Form, 
  Grid, 
  Header, 
  Radio, 
  Segment 
} from 'semantic-ui-react';
import LoadingScreen from '../LoadingScreen';

const CreateSurveyForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (): void => {
    setLoading(true);
    const newSurvey: NewSurvey = { 
      title, description
    };
    surveyService.create(newSurvey)
      .then(() => {
        setLoading(false);
        setTitle('');
        setDescription('');
        window.alert('New survey created!');
      })
      .catch((e) => {
        setLoading(false);
        console.log('error', (e as Error).message);
        window.alert('Error creating survey, try again with valid credentials');
      });
  };

  const validCredentials = (): boolean => {
    return title.length > 3;
  };

  return (
    <>
    <LoadingScreen isLoading={loading} />
    <Container>
      <Grid textAlign='left' floated='left' stackable>
        <Grid.Row style={{ padding: 80 }}>
          <Grid.Column 
            width={8}
            style={{ 
              maxWidth: 450,
              align: 'left'
            }}
          >
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked inverted>
              <Form.Input 
                label='Title' 
                fluid 
                icon='edit' 
                iconPosition='left' 
                placeholder='Title' 
                onChange={(({ target }) => setTitle(target.value))}
              />
              <Form.TextArea 
                label='Description' 
                placeholder='Tell something about this survey...' 
                onChange={(({ target }) => setDescription(target.value))}
              />
              <Form.Group grouped>
              <Header inverted as='span' style={{ 
                paddingRight: 20
              }}>
                Make this survey private?
              </Header>
              <p>
                When survey is set to private, 
                other people cannot access them without invitation
              </p>
              <Form.Field>
                <Radio
                  label='Yes'
                  name='radioGroup'
                  checked={!isPrivate}
                  onChange={() => {
                    setIsPrivate(false);
                    console.log(isPrivate);
                  }}              
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='No'
                  name='radioGroup'
                  checked={isPrivate}
                  onChange={() => {
                    setIsPrivate(true);
                    console.log(isPrivate);
                  }}
                />
              </Form.Field>
            </Form.Group>
            </Segment>
          </Form>
        </Grid.Column>
          <Grid.Column 
            width={8}
            textAlign={'center'} 
          >
            <Header inverted as='h1' content='Questions' />
            <Header inverted as='h3' content='Coming soon...' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Button 
            style={{ maxWidth: 400 }}
            color='blue' 
            fluid size='large' 
            type='submit'
            disabled={!validCredentials()}
          >
            Create
          </Button>
        </Grid.Row>
      </Grid>
    </Container>
    </>
  );
};

export default CreateSurveyForm;
