import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Container, Radio, Segment, Accordion, List, Divider } from 'semantic-ui-react';
import QuestionList from '../components/QuestionList';
import img from '../style/img2.png';

const CreateSurveyPage: React.FC = () => {

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
 
  const handleSubmit = () => {

    console.log('SUBMIT');

    /*
    const newSurvey: NewSurvey = {
      title: title,
      description: description,
      questions: questions,
      private: isPrivate,
    };

    surveyService.create(newSurvey)
      .then(() => {
        window.alert('New survey created!');
        window.location.reload();
      })
      .catch(() => {
        window.alert('Error creating survey, survey title must be unique');
      });
      */
  };

  const addQuestion = () => {
    if (questions.length >= 5) {
      window.alert('Max number of questions is 5 at the moment');
      return;
    }
    if (question.length < 4) {
      window.alert('Question must be atleast 4 characters');
      return;
    }

    setQuestions(questions.concat(question));
    setQuestion('');
  };

  const validCredentials = (): boolean => {
    return title.length > 3 && questions.length > 0;
  };


  return ( 
    <Grid>
      <Grid.Row
        centered
        style={{
          minHeight: '1500px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <Grid.Column 
          width={16}
          style={{ maxWidth: '900px' }}
        >
          <Header
            textAlign='center'
            content='Create new survey'
            style={{ fontSize: '60px', margin: '80px' }}
          />

          <Segment style={{ background: 'rgb(18, 112, 149, 0.1)' }}>
            <Form size='large' onSubmit={handleSubmit}>
              <Container>
                <Form.Input 
                  label='Survey title' 
                  icon='edit' 
                  iconPosition='left' 
                  placeholder='Title' 
                  onChange={(({ target }) => setTitle(target.value))}
                />
                <Form.TextArea 
                  label='Survey description' 
                  placeholder='Tell something about this survey...' 
                  onChange={(({ target }) => setDescription(target.value))}
                />

                <Header 
                  as='h1' 
                  content='Questions' 
                />

                <QuestionList />

                <Divider />

                <Header as='b' content='New question' />
                  <Form.Input 
                    icon='edit' 
                    iconPosition='left' 
                    placeholder='Question'
                    value={question}
                    onChange={(({ target }) => setQuestion(target.value))}
                  />
                  <Button
                    style={{ marginTop: 20, width: '150px' }}
                    secondary
                    inverted
                    fluid size='medium' 
                    content='Cancel'
                    onClick={() => console.log('cancel')}
                  />
                  <Button
                    style={{ marginTop: 20, width: '150px' }}
                    color='blue' 
                    fluid size='medium' 
                    content='Add Question'
                    onClick={addQuestion}
                  />
              </Container>
            </Form>

          </Segment>
        </Grid.Column>
      </Grid.Row>



      <Grid.Row centered color='grey'>
        <Segment inverted style={{ maxWidth: '600px' }}>
          <Form.Group grouped>
            <Header inverted as='span'>
              Make this survey private?
            </Header>
            <p>
              text
            </p>
            <Form.Field inline>
              <Radio
                name='radioGroup'
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}              
              />
              <b> Yes</b>
            </Form.Field>
            <Form.Field>
              <Radio
                name='radioGroup'
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
              />
              <b> No</b>
            </Form.Field>
          </Form.Group> 
          <Button
            style={{ marginTop: 20 }}
            color='blue' 
            fluid size='large' 
            onClick={handleSubmit}
            disabled={!validCredentials()}
            content='Create'
          />
        </Segment>
      </Grid.Row>

    </Grid>
  );
};

export default CreateSurveyPage;