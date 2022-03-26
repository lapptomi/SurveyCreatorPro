/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  Button,
  Container, Divider, Grid, Header, Icon, Label, List, Message, Modal, Segment,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import { GET_SURVEYS_OF_CURRENT_USER } from '../graphql/queries/survey';
import { IQuestion, ISurvey } from '../types';
import ErrorPage from './ErrorPage';
import '../style/ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const countQuestionAnswers = (survey: ISurvey, obj: IQuestion, answerChoise: number): number => {
    const answerList = survey.responses.flatMap(({ answers }) => (
      answers.filter((a) => a.answer === answerChoise && a.question === obj.question)
    ));

    return answerList.length;
  };

  return (
    <Grid textAlign="center">
      <Grid.Row className='profile-grid-row-1'>
        <Container className='profile-grid-row-1-container'>
          <Header id='profile-grid-row-1-header-1'>Profile</Header>
          <Header id='profile-grid-row-1-header-2'>
            Here you can browse the surveys that you have created
            and see the results.
          </Header>
          <Segment.Group>
            <Segment id='profile-survey-list'>
              <Header
                id='profile-survey-list-header'
                inverted
                icon="list"
                content="Your surveys"
                subheader={`${surveys.length} surveys found`}
              />
            </Segment>
            {surveys.length === 0
              ? (
                <Segment>
                  <Header
                    id='profile-survey-list-header-no-surveys'
                    content="No surveys added yet..."
                    subheader="You have not created any surveys yet."
                  />
                </Segment>
              )
              : (
                <Segment>
                  <List divided relaxed>
                    {surveys.map((survey, index) => (
                      <List.Item key={survey.id} style={{ padding: '20px' }}>
                        <Segment color="blue">
                          <List.Content>
                            <Modal
                              centered={false}
                              open={isOpen}
                              onClose={(): void => setIsOpen(false)}
                              onOpen={(): void => setIsOpen(true)}
                              trigger={(
                                <Label as="a">
                                  <Icon link color="blue" name="share" />
                                  Share link to this survey
                                </Label>
                              )}
                            >
                              <Modal.Header>Share link</Modal.Header>
                              <Modal.Content>
                                <Modal.Description>
                                  <Segment clearing>
                                    <Header>
                                      Link to this survey:&nbsp;
                                      <span style={{ fontWeight: 'normal' }}>
                                        {`https://surveycreatorpro.herokuapp.com/surveys/${survey.id}`}
                                      </span>
                                    </Header>
                                    <Button
                                      color="blue"
                                      onClick={(): Promise<void> => (
                                        navigator.clipboard.writeText(`https://surveycreatorpro.herokuapp.com/surveys/${survey.id}`)
                                      )}
                                    >
                                      <Icon name="share" /> Copy to clipboard
                                    </Button>
                                  </Segment>
                                </Modal.Description>
                              </Modal.Content>
                              <Modal.Actions>
                                <Button color="blue" onClick={(): void => setIsOpen(false)}>OK</Button>
                              </Modal.Actions>
                            </Modal>

                            <Link to={`/surveys/${survey.id}`}>
                              <Label as="a">
                                <Icon
                                  className="open-survey-icon"
                                  link
                                  color="blue"
                                  name="arrow circle right"
                                />
                                Open page
                              </Label>
                            </Link>
                          </List.Content>

                          <List.Content>
                            <Divider />
                            <Accordion fluid>
                              <Header style={{ marginTop: 20 }}>
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
                                    Total Responses:
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
                                            {countQuestionAnswers(survey, obj, 1)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Somewhat Disagree:
                                          <Label.Detail>
                                            {countQuestionAnswers(survey, obj, 2)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Neutral:
                                          <Label.Detail>
                                            {countQuestionAnswers(survey, obj, 3)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Somewhat Agree:
                                          <Label.Detail>
                                            {countQuestionAnswers(survey, obj, 4)}
                                          </Label.Detail>
                                        </Label>
                                        <Label>
                                          Strongly Agree:
                                          <Label.Detail>
                                            {countQuestionAnswers(survey, obj, 5)}
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
