import React from 'react'

import Questions from './Questions.jsx'

const QuestionList = ({questionsList}) => {
  return (
    <>
        {
        questionsList.map((question) => (
          <Questions question={question} key={question._id}/>
        ))
        }
        <p>eyfgewfgebfbe</p>
    </>
    
  )
}

export default QuestionList;
