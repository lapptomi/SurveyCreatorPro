/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Container,
  Radio,
  Segment,
  Divider,
  Message,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import QuestionList from '../components/QuestionList';
import { CREATE_SURVEY } from '../graphql/queries/survey';
import '../style/CreateSurveyPage.css';

const CreateSurveyPage: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [createNewSurvey, createSurveyData] = useMutation(CREATE_SURVEY);

  const handleSubmit = (): void => {
    if (window.confirm('Create new survey?')) {
      createNewSurvey({
        variables: {
          title, description, questions, private: isPrivate,
        },
      }).then(() => {
        window.location.replace('/profile');
      }).catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
    }
  };

  const addQuestion = (): void => {
    if (questions.length >= 20) {
      window.alert('Max number of questions is 20 at the moment');
      return;
    }
    if (question.length < 4) {
      window.alert('Question must be atleast 4 characters');
      return;
    }
    if (questions.some((q) => q === question)) {
      window.alert('You cannot add two same questions at the moment');
      return;
    }

    setQuestions(questions.concat(question));
    setQuestion('');
  };

  const validFields = (): boolean => (
    title.length > 3 && questions.length > 0 && description.length > 0
  );

  const handleRemove = (questionName: string): void => {
    if (window.confirm('Remove this question?')) {
      const updatedQuestions = questions.filter((q) => q !== questionName);
      setQuestions(updatedQuestions);
    }
  };

  return (
    <Grid>
      <Grid.Row className='create-survey-grid-row-1'>
        <Loading active={createSurveyData.loading} />
        <Container className='grid-row-1-container' textAlign="left">
          <Header id='create-survey-grid-row-1-header-1'>Create New Survey</Header>
          <Header id='create-survey-grid-row-1-header-2'>
            Here you can create new private or public surveys
            by filling the form below
            with valid information.
          </Header>
          <Header id='create-survey-grid-row-1-header-3'>
            You can also browse and answer public surveys
            <Link to="/surveys/browse"><span> Here</span></Link>
          </Header>
          <Segment id='create-survey-survey-form'>
            <Form size="large">
              <Segment.Group>
                <Segment style={{ background: 'rgb(34 69 101)' }}>
                  <Header id='create-survey-survey-form-header'>Survey Information</Header>
                </Segment>
                <Segment>
                  <Form.Input
                    id="survey-form-title-input"
                    label="Survey title *"
                    icon="edit"
                    iconPosition="left"
                    placeholder="Title"
                    onChange={(({ target }): void => setTitle(target.value))}
                  />
                  <Form.TextArea
                    id="survey-form-description-input"
                    label="Survey description *"
                    placeholder="Tell something about this survey..."
                    onChange={(({ target }): void => setDescription(target.value))}
                  />
                </Segment>
              </Segment.Group>

              <Segment.Group>
                <Segment id='create-survey-survey-form-questions'>
                  <Header
                    as="h2"
                    inverted
                    icon="list"
                    content="Questions"
                    subheader="Survey must have atleast 2 questions."
                    style={{ fontSize: '30px' }}
                  />
                </Segment>
                <Segment>
                  <QuestionList questions={questions} handleRemove={handleRemove} />
                </Segment>
              </Segment.Group>
              <Header as="h3" content="New Question" />
              <Form.Input
                id="survey-form-question-input"
                icon="edit"
                iconPosition="left"
                placeholder="Write your question here"
                value={question}
                onChange={(({ target }): void => setQuestion(target.value))}
              />
              <Button
                id="survey-form-add-question-button"
                style={{ marginTop: '20px', maxWidth: '150px' }}
                color="blue"
                fluid
                size="medium"
                content="Add Question"
                onClick={addQuestion}
                disabled={!question}
              />
              <Divider />
              <Message negative hidden={!errorMessage}>
                <Message.Header>Error creating survey</Message.Header>
                <p>{errorMessage}</p>
              </Message>

              <Segment.Group>
                <Segment
                  inverted
                  textAlign="center"
                  style={{ background: 'rgb(34 69 101)' }}
                >
                  <Header
                    inverted
                    as="h2"
                    content="Make this survey private?"
                    subheader="If survey is set to private users need a link to access them."
                  />
                  <Radio
                    className="survey-form-yes-radio"
                    checked={isPrivate}
                    onChange={(): void => setIsPrivate(true)}
                  />
                  <b> Yes </b>
                  <Radio
                    className="survey-form-no-radio"
                    checked={!isPrivate}
                    onChange={(): void => setIsPrivate(false)}
                  />
                  <b> No</b>
                </Segment>
                <Segment textAlign="center">
                  <Button
                    id="survey-form-cancel-button"
                    inverted
                    secondary
                    onClick={(): void => {
                      if (window.confirm('Are you sure you want to discard all changes?')) {
                        window.location.replace('/');
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="survey-form-create-button"
                    color="blue"
                    onClick={handleSubmit}
                    disabled={!validFields()}
                    content="Create"
                  />
                </Segment>
              </Segment.Group>
            </Form>
          </Segment>
        </Container>
      </Grid.Row>
    </Grid>
  );
};

export default CreateSurveyPage;
