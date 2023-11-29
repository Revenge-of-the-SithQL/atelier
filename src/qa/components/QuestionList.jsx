import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = ({ currQuestionList, isQuestionExpanded, term, productName }) => (
  <div className={isQuestionExpanded ? 'question-list-container-expanded' : 'question-list-container'}>
    {
      currQuestionList
        .filter((question) => (term.toLowerCase() === ''
          ? question
          : question.question_body.toLowerCase().includes(term)))
        .map((question) => <QuestionEntry key={question.question_id} question={question} productName={productName} />)
    }
  </div>
);

export default QuestionList;
