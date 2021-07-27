import React, { useState } from 'react';
import { Table, Form } from 'semantic-ui-react';
import { Answer, IQuestion } from '../types';

interface Props {
  obj: IQuestion;
  rowIndex: number;
  handleChange(answerOption: Answer): void;
}

const TableRow: React.FC<Props> = ({ obj, rowIndex, handleChange }) => {
  const [answerOption, setAnswerOption] = useState<number>(-1);

  return (
    <Table.Row>
      <Table.Cell>{obj.question}</Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          value="option1"
          checked={answerOption === 1}
          onClick={(() => {
            setAnswerOption(1);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 1 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 2}
          onClick={(() => {
            setAnswerOption(2);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 2 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 3}
          onClick={(() => {
            setAnswerOption(3);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 3 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 4}
          onClick={(() => {
            setAnswerOption(4);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 4 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 5}
          onClick={(() => {
            setAnswerOption(5);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 5 });
          })}
        />
      </Table.Cell>

    </Table.Row>
  );
};

export default TableRow;
