/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Container,
  Radio,
  Segment,
  Divider,
} from 'semantic-ui-react';
import QuestionList from '../components/QuestionList';
import img from '../style/img2.png';
import { NewSurvey } from '../types';

const CreateSurveyPage: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<string>('');

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('SUBMIT');

    const newSurvey: NewSurvey = {
      title,
      description,
      questions,
      private: isPrivate,
    };

    console.log(newSurvey);

    /*
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
    if (questions.length >= 10) {
      window.alert('Max number of questions is 10 at the moment');
      return;
    }
    if (question.length < 4) {
      window.alert('Question must be atleast 4 characters');
      return;
    }

    setQuestions(questions.concat(question));
    setQuestion('');
  };

  const validFields = (): boolean => (
    title.length > 3 && questions.length > 0 && description.length > 0
  );

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
            textAlign="center"
            content="Create new survey"
            style={{ fontSize: '60px', margin: '80px' }}
          />

          <Segment style={{ background: 'rgb(0, 0, 0, 0.1)' }}>
            <Form size="large">
              <Container>
                <Form.Input
                  label="Survey title *"
                  icon="edit"
                  iconPosition="left"
                  placeholder="Title"
                  onChange={(({ target }) => setTitle(target.value))}
                />
                <Form.TextArea
                  label="Survey description *"
                  placeholder="Tell something about this survey..."
                  onChange={(({ target }) => setDescription(target.value))}
                />

                <Divider />
                <Header
                  as="h1"
                  content="Questions:"
                  subheader="Maximum number of questions is 10."
                />

                <QuestionList questions={questions} />
                <Divider />

                <Header as="h1" content="Add Question" />
                <Form.Input
                  icon="edit"
                  iconPosition="left"
                  placeholder="Question"
                  value={question}
                  onChange={(({ target }) => setQuestion(target.value))}
                />
                <Button
                  style={{ marginTop: 20, width: '150px' }}
                  color="blue"
                  fluid
                  size="medium"
                  content="Add Question"
                  onClick={addQuestion}
                />
              </Container>
            </Form>

          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered color="grey">
        <Segment inverted style={{ maxWidth: '600px' }}>
          <Form.Group grouped>
            <Header inverted as="span">
              Make this survey private?
            </Header>
            <p>
              text
            </p>
            <Form.Field inline>
              <Radio
                name="radioGroup"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
              />
              <b> Yes</b>
            </Form.Field>
            <Form.Field>
              <Radio
                name="radioGroup"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
              />
              <b> No</b>
            </Form.Field>
          </Form.Group>
          <Button
            style={{ marginTop: 20 }}
            color="blue"
            fluid
            size="large"
            onClick={handleSubmit}
            disabled={!validFields()}
            content="Create"
          />
        </Segment>
      </Grid.Row>

    </Grid>
  );
};

export default CreateSurveyPage;
