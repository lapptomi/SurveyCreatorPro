import { useQuery } from '@apollo/client';
import React from 'react';
import {
  Segment, List, Container, Header, Icon, Message, Label,
} from 'semantic-ui-react';
import { GET_ALL_SURVEYS } from '../graphql/queries/survey';
import ErrorPage from '../pages/ErrorPage';
import { ISurvey } from '../types';
import Loading from './Loading';

const SurveyList: React.FC = () => {
  const { loading, data } = useQuery(GET_ALL_SURVEYS);

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <ErrorPage />;
  }

  const surveys: Array<ISurvey> = data.allSurveys;

  return (
    <Container>
      <Segment>
        <Segment style={{ background: 'rgb(34 69 101)' }}>
          <Header
            inverted
            icon="list"
            content="List of public surveys"
            subheader={`${surveys.length} surveys found`}
            style={{ fontSize: '30px', margin: '10px' }}
          />
        </Segment>

        <Segment>
          <List divided relaxed>
            {Object.values(surveys).map((survey, index) => (
              <List.Item
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{ padding: '20px' }}
              >
                <Segment clearing color="green">
                  <List.Content>
                    <Header as="h2">
                      <Header.Content>
                        Survey Title:&nbsp;
                        <span style={{ fontWeight: 'normal' }}>
                          {survey.title}
                        </span>
                      </Header.Content>
                    </Header>

                    <Message
                      header="Survey description:&nbsp;"
                      content={survey.description}
                    />
                  </List.Content>

                  <List.Content floated="right" style={{ marginTop: 20 }}>
                    <Label>Click the arrow to answer this survey</Label>
                    <Icon
                      link
                      color="green"
                      size="huge"
                      name="arrow circle right"
                      onClick={() => window.location.replace(`/surveys/${survey.id}`)}
                    />
                  </List.Content>
                </Segment>
              </List.Item>
            ))}
          </List>

        </Segment>
      </Segment>
    </Container>
  );
};

export default SurveyList;
