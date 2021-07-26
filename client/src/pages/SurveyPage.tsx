import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container, Form, Grid, Header, Icon, Segment, Table,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import TableRow from '../components/TableRow';
import { FIND_SURVEY_BY_ID } from '../graphql/queries/survey';
import img from '../style/img2.png';
import { Answer, ISurvey } from '../types';
import ErrorPage from './ErrorPage';

const SurveyPage: React.FC = () => {
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(FIND_SURVEY_BY_ID, {
    variables: { surveyId: id },
  });

  if (loading) {
    return <Loading />;
  }
  if (!id || !data) {
    return <ErrorPage />;
  }

  const survey: ISurvey = data.findSurvey;

  const handleSubmit = () => {
    console.log('SUBMIT');
    console.log(answers, id);
  };

  const handleChange = (updatedAnswer: Answer) => {
    const updatedAnswers = answers.filter((a) => (
      a.question !== updatedAnswer.question || a.row !== updatedAnswer.row
    ));

    setAnswers([...updatedAnswers, updatedAnswer]);
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
          <Container text style={{ margin: '40px' }}>
            <p>{`Survey: ${survey.id}`}</p>
            <Header
              as="h1"
              content={`Title: ${survey.title}`}
              style={{ fontSize: '3em' }}
            />
            <Header
              as="h1"
              style={{ fontSize: '1.8em', fontWeight: 'normal' }}
              content={`Description: ${survey.description}`}
            />
          </Container>

          <Container>
            <Segment>
              <Segment style={{ background: 'rgb(34 69 101)' }}>
                <Header
                  as="h1"
                  inverted
                  icon="list"
                  content="List of survey questions"
                  style={{ fontSize: '30px', margin: '10px' }}
                />
              </Segment>
              <Segment>
                <Header as="h3">
                  Please answer the questions below by selecting a number between 1 - 5.
                </Header>

                <h4>Answer options meaning: </h4>
                <p>1 - Strongly Disagree</p>
                <p>2 - Somewhat Disagree</p>
                <p>3 - Neutral</p>
                <p>4 - Somewhat Agree</p>
                <p>5 - Strongly Agree</p>

                <Form>
                  <Table celled color="blue">
                    <Table.Header>
                      <Table.Row textAlign="center">
                        <Table.HeaderCell textAlign="left">
                          Question
                        </Table.HeaderCell>
                        <Table.HeaderCell>1</Table.HeaderCell>
                        <Table.HeaderCell>2</Table.HeaderCell>
                        <Table.HeaderCell>3</Table.HeaderCell>
                        <Table.HeaderCell>4</Table.HeaderCell>
                        <Table.HeaderCell>5</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {survey.questions.map((question, index) => (
                        <TableRow
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          rowIndex={index}
                          question={question}
                          handleChange={handleChange}
                        />
                      ))}
                    </Table.Body>
                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="5">
                          <Button
                            floated="right"
                            icon
                            labelPosition="left"
                            primary
                            size="small"
                            type="submit"
                            disabled={answers.length < survey.questions.length}
                            onClick={handleSubmit}
                          >
                            <Icon name="check" />
                            Submit
                          </Button>
                          <Button
                            floated="right"
                            icon
                            labelPosition="left"
                            secondary
                            inverted
                            size="small"
                            onClick={() => {
                              if (window.confirm('Discard changes and exit?')) {
                                window.location.replace('/');
                              }
                            }}
                          >
                            <Icon name="cancel" />
                            Cancel
                          </Button>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </Form>

              </Segment>
            </Segment>
          </Container>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SurveyPage;
