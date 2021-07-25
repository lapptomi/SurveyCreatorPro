import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Form, Grid, Header, List, Segment,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import { FIND_SURVEY_BY_ID } from '../graphql/queries/survey';
import img from '../style/img2.png';
import { ISurvey } from '../types';
import ErrorPage from './ErrorPage';

const SurveyPage: React.FC = () => {
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

  const handleChange = () => {
    console.log('change');
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
                  Please answer the questions below by selecting a number between 1-5.
                </Header>
                <h4>Answer options meaning: </h4>
                <p>1 - Strongly Disagree</p>
                <p>2 - Somewhat Disagree</p>
                <p>3 - Neutral</p>
                <p>4 - Somewhat Agree</p>
                <p>5 - Strongly Agree</p>
                <List>
                  {Object.values(survey.questions).map((question, index) => (
                    <List.Item
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      style={{ padding: '20px' }}
                    >
                      <Segment clearing color="blue">
                        <List.Content>
                          <Header as="h2">
                            {`Question ${index + 1}: `}
                            <span style={{ fontWeight: 'normal' }}>
                              {question}
                            </span>
                          </Header>

                          <Segment>
                            <Form>
                              <Form.Group inline>
                                <Form.Radio
                                  label="1"
                                  value="1"
                                  checked={false}
                                  onChange={handleChange}
                                />
                                <Form.Radio
                                  label="2"
                                  value="2"
                                  checked
                                  onChange={handleChange}
                                />
                                <Form.Radio
                                  label="3"
                                  value="3"
                                  checked={false}
                                  onChange={handleChange}
                                />
                                <Form.Radio
                                  label="4"
                                  value="3"
                                  checked={false}
                                  onChange={handleChange}
                                />
                                <Form.Radio
                                  label="5"
                                  value="3"
                                  checked={false}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Form>
                          </Segment>
                        </List.Content>
                      </Segment>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            </Segment>
          </Container>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SurveyPage;
