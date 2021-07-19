import React from 'react';
import { useState } from 'react';
import { 
  Accordion, 
  Button,
  Divider,
  Form,
  Header,
  Icon,
  Item,
  List
} from 'semantic-ui-react';

const QuestionList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [question, setQuestion] = useState('');

  const questions = [
    'randomquestion1',
    'randomquestion2'
  ];

  return (
    <div>
      {Object.values(questions).map((question, index) => 
        <Accordion
          key={index}
          styled
        >

          <Accordion.Title
            index={index}
            active={activeIndex === index}
            onClick={(e, titleProps) => {
              if (activeIndex === index) {
                // close if clicking currently opened question
                setActiveIndex(-1);
              } else {
                setActiveIndex(titleProps.index as number);
              }
            }}
          >
            <Icon name='dropdown' />
            {index+1}. question: {question}
          </Accordion.Title>

          <Accordion.Content active={activeIndex === index}>
            <Header as='h1' subheader='Answer options for this question: ' />
              <List divided >
                <List.Item>
                  <List.Header>text1</List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>text2</List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>text3</List.Header>
                </List.Item>
              </List>

            <Divider />

            <Item.Group>
              <Form.Input 
                icon='question' 
                iconPosition='left' 
                placeholder='Answer option'
                onChange={(({ target }) => setQuestion(target.value))}
              />
              <Button
                color='green' 
                size='small' 
                content='Add option'
              />
            </Item.Group>
            
          </Accordion.Content>
        </Accordion>
      )}
    </div>
  );
};
  

export default QuestionList;
