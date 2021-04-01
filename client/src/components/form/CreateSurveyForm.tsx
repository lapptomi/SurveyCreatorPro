import React, { Dispatch, SetStateAction, useState } from 'react';
import { NewSurvey } from '../../types';
import surveyService from '../../services/surveys';
import { 
  Button, 
  Form, 
  Header, 
  Icon, 
  Radio, 
  Segment 
} from 'semantic-ui-react';
import SurveyQuestionList from '../SurveyQuestionList';

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateSurveyForm: React.FC<Props> = ({ setLoading }) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
 
  const handleSubmit = () => {
    setLoading(true);

    const newSurvey: NewSurvey = {
      title: title,
      description: description,
      questions: questions,
      private: isPrivate,
    };

    surveyService.create(newSurvey)
      .then(() => {
        setLoading(false);
        window.alert('New survey created!');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        window.alert('Error creating survey, survey title must be unique');
      });
  };

  const addQuestion = () => {
    if (questions.length >= 5) {
      window.alert('Max number of questions is 5 at the moment');
      return;
    }
    if (question.length < 4) {
      window.alert('Question must be atleast 4 characters');
      return;
    } 
    setQuestions(questions.concat(question));
    setQuestion('');
  };

  const validCredentials = (): boolean => {
    return title.length > 3 && questions.length > 0;
  };

  return (
    <>
    <Form size='large' onSubmit={handleSubmit}>
      <Segment inverted>
        <Form.Input 
          label='Title' 
          fluid 
          icon='edit' 
          iconPosition='left' 
          placeholder='Title' 
          onChange={(({ target }) => setTitle(target.value))}
        />
      <Form.TextArea 
        label='Description' 
        placeholder='Tell something about this survey...' 
        onChange={(({ target }) => setDescription(target.value))}
      />
      </Segment>
    </Form>

    <Segment inverted textAlign='center'>
      <SurveyQuestionList questions={questions} />
      <Form onSubmit={addQuestion}>
        <Form.Input 
          fluid 
          icon='edit' 
          iconPosition='left' 
          placeholder='Question'
          value={question}
          onChange={(({ target }) => setQuestion(target.value))}
        />
        <Header as='h3' inverted> 
          Add Field 
          <Icon 
            name='plus square' 
            color='blue' 
            onClick={addQuestion} 
          />
        </Header>
      </Form>
    </Segment>

    <Segment inverted>
      <Form.Group grouped>
        <Header inverted as='span'>
          Make this survey private?
        </Header>
        <p>
          When survey is set to private, 
          other people cannot access them without invitation
        </p>
        <Form.Field inline>
          <Radio
            name='radioGroup'
            checked={isPrivate}
            onChange={() => setIsPrivate(true)}              
          />
          <b> Yes</b>
        </Form.Field>
        <Form.Field>
          <Radio
            name='radioGroup'
            checked={!isPrivate}
            onChange={() => setIsPrivate(false)}
          />
          <b> No</b>
        </Form.Field>
      </Form.Group> 
      <Button
        style={{ marginTop: 20 }}
        color='blue' 
        fluid size='large' 
        onClick={handleSubmit}
        disabled={!validCredentials()}
        content='Create'
      />
    </Segment>
    </>
  );
};

export default CreateSurveyForm;
