import React, { useEffect, useState } from 'react';
import {
  Segment, List, Container, Header, Icon,
} from 'semantic-ui-react';
import surveyService from '../services/surveys';
import { NewSurvey } from '../types';
import LoadingScreen from './LoadingScreen';

const SurveyList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [surveys, setSurveys] = useState<NewSurvey[]>([]);

  useEffect(() => {
    surveyService.getAll()
      .then((data) => {
        setSurveys(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log((e as Error).message);
      });
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Container style={{
        padding: '1em 0em',
      }}
      >
        <Segment
          inverted
          size="big"
        >
          <Header inverted as="h1" content="Surveys" />
          <List divided inverted relaxed>
            {Object.values(surveys).map((survey, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <List.Item key={index}>
                <Icon name="book" />
                <List.Content>
                  <List.Header>
                    Title:
                    {survey.title}
                  </List.Header>
                  Description:
                  {' '}
                  {survey.description}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    </>
  );
};

export default SurveyList;
