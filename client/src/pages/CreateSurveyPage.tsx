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
} from 'semantic-ui-react';
import QuestionList from '../components/QuestionList';
import { CREATE_SURVEY } from '../graphql/queries/survey';
import img from '../style/img2.png';

const CreateSurveyPage: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<string>('');

  const [createNewSurvey] = useMutation(CREATE_SURVEY);

  const handleSubmit = () => {
    if (window.confirm('Create new survey?')) {
      createNewSurvey({
        variables: {
          title, description, questions, private: isPrivate,
        },
      }).then((result) => {
        const surveyId: string = result.data.addSurvey.id;
        window.location.replace(`/surveys/${surveyId}`);
      }).catch((error) => {
        console.log(error.message);
        window.alert(`Error creating survey: ${(error as Error).message}`);
      });
    }
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
    if (questions.includes(question)) {
      window.alert('You cannot add two same questions at the moment');
      return;
    }

    setQuestions(questions.concat(question));
    setQuestion('');
  };

  const validFields = (): boolean => (
    title.length > 3 && questions.length > 0 && description.length > 0
  );

  const handleRemove = (questionName: string) => {
    if (window.confirm('Delete this question?')) {
      const updatedQuestions = questions.filter((q) => q !== questionName);
      setQuestions(updatedQuestions);
    }
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
        <Grid.Column width={16}>
          <Container style={{ margin: '50px' }}>
            <Header
              as="h2"
              textAlign="left"
              content="Create New Survey"
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
              }}
            />
            <Header
              textAlign="left"
              style={{ fontWeight: 'normal' }}
            >
              Here you can create new private or public surveys
              by filling the form below
              with valid information.
            </Header>
            <Header
              as="h2"
              textAlign="left"
              style={{ fontWeight: 'normal' }}
            >
              You can also browse and answer public surveys
              <Link to="/surveys/browse">
                <span> Here</span>
              </Link>
            </Header>

            <Segment style={{ background: 'rgb(65, 93, 119, 30%)', marginTop: '70px' }}>
              <Form size="large">
                <Segment.Group>
                  <Segment style={{ background: 'rgb(34 69 101)' }}>
                    <Header
                      inverted
                      textAlign="center"
                      content="Survey Information"
                      style={{ fontSize: '30px', margin: '20px' }}
                    />
                  </Segment>

                  <Segment>
                    <Form.Input
                      id="survey-form-title-input"
                      label="Survey title *"
                      icon="edit"
                      iconPosition="left"
                      placeholder="Title"
                      onChange={(({ target }) => setTitle(target.value))}
                    />
                    <Form.TextArea
                      id="survey-form-description-input"
                      label="Survey description *"
                      placeholder="Tell something about this survey..."
                      onChange={(({ target }) => setDescription(target.value))}
                    />
                  </Segment>
                </Segment.Group>

                <Segment.Group>
                  <Segment style={{ background: 'rgb(34 69 101)' }}>
                    <Header
                      as="h2"
                      inverted
                      icon="list"
                      content="Questions"
                      subheader="Maximum number of questions is 10 at the moment."
                      style={{ fontSize: '30px' }}
                    />
                  </Segment>

                  <Segment>
                    <QuestionList
                      questions={questions}
                      handleRemove={handleRemove}
                    />
                  </Segment>
                </Segment.Group>

                <Header as="h3" content="New Question" />
                <Form.Input
                  id="survey-form-question-input"
                  icon="edit"
                  iconPosition="left"
                  placeholder="Write your question here"
                  value={question}
                  onChange={(({ target }) => setQuestion(target.value))}
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
                      onChange={() => setIsPrivate(true)}
                    />
                    <b> Yes </b>
                    <Radio
                      className="survey-form-no-radio"
                      checked={!isPrivate}
                      onChange={() => setIsPrivate(false)}
                    />
                    <b> No</b>
                  </Segment>

                  <Segment textAlign="center">
                    <Button
                      id="survey-form-cancel-button"
                      inverted
                      secondary
                      onClick={() => {
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateSurveyPage;
