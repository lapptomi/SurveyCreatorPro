import React, { useState } from 'react';
import { Table, Form } from 'semantic-ui-react';
import { Answer } from '../types';

interface Props {
  question: string;
  rowIndex: number;
  handleChange(answerOption: Answer): void;
}

const TableRow: React.FC<Props> = ({ question, rowIndex, handleChange }) => {
  const [answerOption, setAnswerOption] = useState<string>('-1');

  return (
    <Table.Row>
      <Table.Cell>{question}</Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          value="option1"
          checked={answerOption === 'option1'}
          onClick={((e, { value }) => {
            setAnswerOption(value as string);
            handleChange({ row: rowIndex, question, answerOption: value as string });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          value="option2"
          checked={answerOption === 'option2'}
          onClick={((e, { value }) => {
            setAnswerOption(value as string);
            handleChange({ row: rowIndex, question, answerOption: value as string });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 'option3'}
          value="option3"
          onClick={((e, { value }) => {
            setAnswerOption(value as string);
            handleChange({ row: rowIndex, question, answerOption: value as string });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 'option4'}
          value="option4"
          onClick={((e, { value }) => {
            setAnswerOption(value as string);
            handleChange({ row: rowIndex, question, answerOption: value as string });
          })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form.Radio
          checked={answerOption === 'option5'}
          value="option5"
          onClick={((e, { value }) => {
            setAnswerOption(value as string);
            handleChange({ row: rowIndex, question, answerOption: value as string });
          })}
        />
      </Table.Cell>

    </Table.Row>
  );
};

export default TableRow;
