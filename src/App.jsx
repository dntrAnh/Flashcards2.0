import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { cards } from './DSAcards';
import AnswerForm from './components/AnswerForm';

import './App.css';

const App = () => {
  const initialQuestions = cards.map((card) => card.question);
  const initialAnswers = cards.map((card) => card.answer);
  const [previousIndex, setPreviousIndex] = useState(null);

  const [shuffledQuestions, setShuffledQuestions] = useState(cards.map((card) => card.question));

  const [flashcards, setFlashcards] = useState(
    initialQuestions.map((question, index) => ({
      question,
      answer: initialAnswers[index],
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);

  const handleDoneStudying = () => {
    setIsFlipped(false);
    setPreviousIndex(null);
    if (flashcards.length > 1) {
      setStudiedCount((prevCount) => prevCount + 1);
      setFlashcards((prevFlashcards) => prevFlashcards.filter((_, index) => index !== currentIndex));
      setCurrentIndex((prevIndex) => prevIndex % (flashcards.length - 1));
    }
    else {
      setStudiedCount((prevCount) => prevCount + 1);
      setFlashcards([]);
      setCurrentIndex(0);
      setShowConfetti(true);
    }
  };

  const handleUnsure = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setPreviousIndex(currentIndex);
    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    setIsFlipped(false);
    if (previousIndex !== null) {
      setCurrentIndex(previousIndex);
    } 
    else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    }
    setPreviousIndex(currentIndex);
  };

  const shuffleFlashcards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setPreviousIndex(null);
    setIsFlipped(false);
  };

  const onCheckAnswer = (isCorrect) => {
    if (isCorrect) {
      handleDoneStudying();
    } else {
      handleUnsure();
    }
  };

  useEffect(() => {
  }, [showConfetti]);

  const remainingCount = flashcards.length;

  if (flashcards.length === 0) {
    return (
      <div className="App">
        {showConfetti && <Confetti />}
        <h1>Flashcards for Data Structures & Algorithms</h1>
        <p>Congratulations! You have finished all the flashcards.</p>
      </div>
    );
  }

  return (
    <div className="App">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={windowSize.width > 600 ? 200 : 100} />}
      <h1>Flashcards for Data Structures & Algorithms</h1>
      <div className="counter">
        <p>Studied: {studiedCount} / Remaining: {remainingCount}</p>
      </div>
      <div className="flashcard" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard__inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="flashcard__front">
            {flashcards[currentIndex].question}
          </div>
          <div className="flashcard__back">
            {flashcards[currentIndex].answer}
          </div>
        </div>
      </div>
      <AnswerForm flashcards={flashcards} currentIndex={currentIndex} onCheckAnswer={onCheckAnswer} />
      <div className="button-container">
        <button onClick={handleDoneStudying} className="button">
          👏
        </button>
        <button onClick={handleBack} className="button">
          ⏮️
        </button>
        <button onClick={shuffleFlashcards} className="button">
          🔀
        </button>
        
        <button onClick={handleNext} className="button">
          ⏭️
        </button>
        <button onClick={handleUnsure} className="button">
          😐
        </button>
      </div>
    </div>
  );
};

export default App;