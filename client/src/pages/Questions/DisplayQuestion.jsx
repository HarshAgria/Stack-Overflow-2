import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx'
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx'
import QuestionDetails from './QuestionDetails.jsx'

function DisplayQuestion() {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='home-container-2'>
        <QuestionDetails/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default DisplayQuestion
