import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './AskQuestion.css'
import { askQuestion } from '../../actions/question'
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'
const AskQuestion = () => {

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')

    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({questionTitle, questionBody, questionTags, User});
        if(User){
            if(questionTitle && questionBody && questionTags){
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result?.name, userId: User?.result?._id },navigate));

            // showNotification('Question Posted', 'Your question has been successfully posted.');

            } else {
                alert("Please enter all the fields")
            }
        } else {
            alert("Login to Ask a Question")
        }
    }


    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody( questionBody + "\n");
        }
    }

    const execCmd = (command) => {
        document.execCommand(command, false, null);
    };

    const insertCode = () => {
        const code = prompt("Enter your code:");
        if (code) {
            const pre = document.createElement('pre');
            pre.textContent = code;
            document.getElementById('editor').appendChild(pre);
        }
    };

    const insertVideo = () => {
        const url = prompt("Enter video URL:");
        if (url) {
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.width = '560';
            iframe.height = '315';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            document.getElementById('editor').appendChild(iframe);
        }
    };

    return (
    <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you’re asking a question to another person</p>
                        <input type='text' id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g is there an R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <RichTextEditor name='' id='ask-ques-body' value={questionBody} onChange={setQuestionBody} onKeyPress={handleEnter} />
                        {/* <textarea name='' id='ask-ques-title'  onChange={(e) => {setQuestionBody(e.target.value)}} cols='30' rows='10' onKeyPress={handleEnter} /> */}

                    </label>
                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type='text' id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value.split(' '))}} placeholder='e.g (xml typescript wordpress)'/>
                    </label>
                </div>
                <input type='submit' className='review-btn' value='Review your question'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion;
