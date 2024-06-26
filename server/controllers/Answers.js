import mongoose from "mongoose"; 
import Questions from "../models/Questions.js";

export const postAnswer = async(req, res) => {
    const { id: _id } = req.params; 
    const { noOfAnswers, answerBody, userAnswered, userId } =req.body;
    // const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }


    try {
        const user = await user.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.answers += 1;
        await user.save();

        // Check if the user has posted 5 answers to award points
        if (user.answers % 5 === 0) {
            user.points += 10;
            await user.save();
            user.badges.push('Active Contributor');
        }

        res.status(200).json({ message: 'Answer posted successfully', user });
    } catch (error) {
        console.error('Error posting answer:', error);
        res.status(500).json({ message: 'Server Error' });
    }



    updateNoOfQuestions(_id, noOfAnswers);
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: { answer: [{ answerBody, userAnswered, userId }]}})
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json('error in updating');
    }
}


const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { noOfAnswers: noOfAnswers },})
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async(req,res) => {
    const {id : _id} = req.params;
    const {answerId, noOfAnswers } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable...')
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Questions.updateOne(
            { _id},
            { $pull: {"answer": { _id: answerId}}}
        )
        res.status(200).json({message : "Successfully deleted..."})
    } catch (error) {
        res.status(405).json(error);
    }
}