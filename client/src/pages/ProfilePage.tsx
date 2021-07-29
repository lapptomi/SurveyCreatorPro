/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  Accordion,
  Container, Grid, Header, Icon, Label, List, Message, Segment,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import { GET_SURVEYS_OF_CURRENT_USER } from '../graphql/queries/survey';
import backgroundImage from '../style/img2.png';
import { ISurvey } from '../types';
import ErrorPage from './ErrorPage';

const ProfilePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const { loading, data } = useQuery(GET_SURVEYS_OF_CURRENT_USER, {
    variables: { ofCurrentUser: true },
  });

  if (loading) {
    return <Loading active />;
  }
  if (!data) {
    return <ErrorPage />;
  }

  const surveys: Array<ISurvey> = data.allSurveys;

  return (
    <Grid textAlign="center">
      <Grid.Row
        color="black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          minHeight: '1200px',
        }}
      >
        <Container style={{ margin: '50px' }} textAlign="left">
          <Header
            as="h2"
            content="Profile"
            style={{
              fontSize: '5em',
              fontWeight: 'normal',
            }}
          />
          <Header
            textAlign="left"
            style={{ fontWeight: 'normal' }}
          >
            Here you can browse the surveys that you have created
            and see the results.
          </Header>

          <Segment.Group>
            <Segment style={{ background: 'rgb(34 69 101)' }}>
              <Header
                inverted
                icon="list"
                content="Your surveys"
                subheader={`${surveys.length} surveys found`}
                style={{ fontSize: '30px', margin: '10px' }}
              />
            </Segment>

            {surveys.length === 0
              ? (
                <Segment>
                  <Header
                    content="No surveys added yet..."
                    subheader="Be the first to create one!"
                    style={{ fontSize: '20px', margin: '10px' }}
                  />
                </Segment>
              )
              : (
                <Segment>
                  <List divided relaxed>
                    {surveys.map((survey, index) => (
                      <List.Item
                        key={survey.id}
                        style={{ padding: '20px' }}
                      >
                        <Segment color="blue">
                          <List.Content>

                            <Accordion fluid>
                              <Header>
                                Survey:&nbsp;
                                <span style={{ fontWeight: 'normal' }}>
                                  {survey.id}
                                </span>
                              </Header>

                              <Accordion.Title
                                active={activeIndex === index}
                                index={index}
                                onClick={(): void => {
                                  // Close accordion if its already open
                                  setActiveIndex(activeIndex === index ? -1 : index);
                                }}
                                style={{ fontSize: '20px' }}
                              >
                                <Icon name="dropdown" color="green" />
                                Survey Title:&nbsp;
                                <span style={{ fontWeight: 'normal' }}>
                                  {survey.title}
                                </span>
                              </Accordion.Title>

                              <Accordion.Content active={activeIndex === index}>
                                <Message
                                  header="Survey description:&nbsp;"
                                  content={survey.description}
                                />
                                <Label.Group color="blue">
                                  <Label>
                                    Total answers
                                    <Label.Detail>{survey.responses.length}</Label.Detail>
                                  </Label>
                                </Label.Group>

                                <Header as="h2" content="Questions" />

                                {survey.questions.map((obj) => (
                                  <Segment.Group key={obj.questionNumber}>
                                    <Segment>
                                      <Message
                                        header={`Question ${obj.questionNumber}:`}
                                        content={obj.question}
                                      />
                                    </Segment>
                                    <Segment color="blue">
                                      <Header as="span" content="Answers: " />
                                      <Label.Group size="tiny">
                                        <Label>
                                          Strongly Disagree:
                                          <Label.Detail>
                                            {survey.responses.flatMap(({ answers }) => (
                                              answers.filter((a) => a.answer === 1 && a.question === obj.question)).length)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Somewhat Disagree:
                                          <Label.Detail>
                                            {survey.responses.flatMap(({ answers }) => (
                                              answers.filter((a) => a.answer === 2 && a.question === obj.question)).length)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Neutral:
                                          <Label.Detail>
                                            {survey.responses.flatMap(({ answers }) => (
                                              answers.filter((a) => a.answer === 3 && a.question === obj.question)).length)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Somewhat Agree:
                                          <Label.Detail>
                                            {survey.responses.flatMap(({ answers }) => (
                                              answers.filter((a) => a.answer === 4 && a.question === obj.question)).length)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Strongly Agree:
                                          <Label.Detail>
                                            {survey.responses.flatMap(({ answers }) => (
                                              answers.filter((a) => a.answer === 5 && a.question === obj.question)).length)}
                                          </Label.Detail>
                                        </Label>
                                      </Label.Group>
                                    </Segment>
                                  </Segment.Group>
                                ))}
                              </Accordion.Content>

                            </Accordion>

                          </List.Content>
                        </Segment>
                      </List.Item>
                    ))}
                  </List>

                </Segment>
              )}

          </Segment.Group>

        </Container>
      </Grid.Row>
    </Grid>
  );
};

export default ProfilePage;
