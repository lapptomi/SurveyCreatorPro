import React, { useState } from 'react';
import { NewSurvey } from '../../types';
import surveyService from '../../services/surveys';
import { 
  Button, 
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
      <Grid textAlign='center' verticalAlign='middle' floated='left'>
        <Grid.Column style={{ 
            maxWidth: 450,
            marginTop: 100,
            align: 'left'
          }}
          >
          <Header as='h1' inverted textAlign='center'>
            Create New Survey
          </Header>
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
                <Header inverted>
                  Make this survey private?
                </Header>
                <Radio toggle checked={!isPrivate}
                  onChange={() => {
                    setIsPrivate(!isPrivate);
                    console.log(isPrivate);
                  }}
                />
              </Form.Group>

              <Button 
                color='blue' 
                fluid size='large' 
                type='submit'
                disabled={!validCredentials()}
              >
                Create
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default CreateSurveyForm;
