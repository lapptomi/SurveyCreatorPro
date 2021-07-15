import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Container, Radio, Segment } from 'semantic-ui-react';

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
      <Grid.Row color='blue' style={{ padding: '100px' }}>
        <Grid.Column width={16}>
          <Header
            inverted
            textAlign='center'
            content='Create new survey'
            style={{ fontSize: '60px' }}
          />
        </Grid.Column>
      </Grid.Row>


      <Grid.Row style={{ padding: '50px' }} centered>
        <Grid.Column width={16} style={{ maxWidth: 600 }}>
          <Header
            inverted
            textAlign='center'
            content='Survey information'
            style={{ fontSize: '40px' }}
          />
          <Form size='large' onSubmit={handleSubmit}>
            <Segment inverted>
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
            </Segment>
          </Form>
        </Grid.Column>
      </Grid.Row>


      <Grid.Row centered color='yellow' style={{ padding: '50px' }}>
        <Header 
          as='h1' 
          content='Questions' 
          subheader='Type question to the text field and press Enter or click Add field to add question' 
        />
      </Grid.Row> 

      <Grid.Row centered>

      <Grid.Column width={16} color='grey' style={{ padding: '50px' }}>
        <Container>
          <Header 
              inverted
              as='h1' 
              content='Question' 
              subheader='Type question to the text field and press Enter or click Add field to add question' 
            />
            <Form onSubmit={addQuestion}>
            <Form.Input 
              icon='edit' 
              iconPosition='left' 
              placeholder='Question'
              value={question}
              onChange={(({ target }) => setQuestion(target.value))}
            />
            <Button
              style={{ marginTop: 20, width: '200px' }}
              color='blue' 
              fluid size='large' 
              content='Add Question'
            />
          </Form>
        </Container>
      </Grid.Column>
      </Grid.Row>

        {Object.values(questions).map((question, i) => 

          <Grid.Row key={i}>
            <Grid.Column width={16}>
              <Container>
                <Segment>
                  <Segment secondary>
                    <Header
                      as='h3'
                      textAlign='left'
                      content='Question:'
                      subheader={question}
                    />
                  </Segment>
                    <Header 
                      as='h3' 
                      content='Choises' 
                      subheader='Add choises to a question' 
                    />
                  <Segment secondary>
                    <Icon name='edit' size='big' />
                    question
                  </Segment>
                  <Button
                    type='submit'
                    style={{ marginTop: 20, width: '200px' }}
                    color='blue' 
                    fluid size='large' 
                    content='Add Choise'
                  />
                </Segment>
              </Container>
            </Grid.Column>
          </Grid.Row>
        )}

       <Grid.Row centered color='grey'>
          <Segment inverted style={{ maxWidth: '600px' }}>
            <Form.Group grouped>
              <Header inverted as='span'>
                Make this survey private?
              </Header>
              <p>
                When survey is set to private, 
                other people cannot access them without link
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