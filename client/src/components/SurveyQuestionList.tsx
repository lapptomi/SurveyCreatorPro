import React from 'react';
import { List, Header } from 'semantic-ui-react';

const SurveyQuestionoList: React.FC<{ questions: Array<string> }> = ({ questions }) => {
  return (
    <List divided inverted>
      <Header inverted as='h1' content='Questions' />
      <p>Type question to the text field and press Enter or click Add field to add question</p>

      {Object.values(questions).map((question, i) => 
        <List.Item key={i}>  
          <Header color='grey' content={`${i+1}.`} textAlign='left' />
          <List.Header
            as='h3'
            content={question}
            style={{ paddingTop: '10px', paddingBottom: '10px' }} 
          />
        </List.Item>
      )}

    </List>
  );
};

export default SurveyQuestionoList;