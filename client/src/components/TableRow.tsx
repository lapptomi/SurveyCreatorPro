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
  console.log('row = ', rowIndex + 1);
  return (
    <Table.Row>
      <Table.Cell>{obj.question}</Table.Cell>

      <Table.Cell textAlign="center">
        <Form.Radio
          className={`table-row${rowIndex + 1}-option1`}
          checked={answerOption === 1}
          onClick={((): void => {
            setAnswerOption(1);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 1 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          className={`table-row${rowIndex + 1}-option2`}
          checked={answerOption === 2}
          onClick={((): void => {
            setAnswerOption(2);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 2 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          className={`table-row${rowIndex + 1}-option3`}
          checked={answerOption === 3}
          onClick={((): void => {
            setAnswerOption(3);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 3 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          className={`table-row${rowIndex + 1}-option4`}
          checked={answerOption === 4}
          onClick={((): void => {
            setAnswerOption(4);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 4 });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          className={`table-row${rowIndex + 1}-option5`}
          checked={answerOption === 5}
          onClick={((): void => {
            setAnswerOption(5);
            handleChange({ questionNumber: rowIndex, question: obj.question, answer: 5 });
          })}
        />
      </Table.Cell>

    </Table.Row>
  );
};

export default TableRow;
