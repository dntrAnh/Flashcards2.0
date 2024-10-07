import React, { useState } from 'react';
import './AnswerForm.css';

const AnswerForm = ({ flashcards, currentIndex, onCheckAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = flashcards[currentIndex].answer.trim().toLowerCase();
    const userAnswerLower = userAnswer.trim().toLowerCase();

    if (userAnswerLower === correctAnswer) {
      setFeedback('Correct!');
      onCheckAnswer(true);
    } else {
      setFeedback(`Incorrect. The correct answer was: ${flashcards[currentIndex].answer}`);
      onCheckAnswer(false);
    }

    setUserAnswer('');
  };

  return (
    <div className="answer-form">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="answer-input"
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default AnswerForm;