import React, { Component } from "react";
import Question from "./question/Question";
import Answer from "./answer/Answer";
import "./QuizMain.css";

export default class Quiz extends Component {
  // initiating the local state
  state = {
    quiestions: {
      1: "Which team won the championship of 2020-2021 UEFA Champions League?",
      2: "Who is FIFA World Player of the Year 2020?",
      3: "Which team won the championship of UEFA EURO 2020",
      4: "Which country will hold the 2022 World Cup?"
    },
    answers: {
      1: {
        1: "Bayern München",
        2: "Chelsea",
        3: "Manchester City",
        4: "Paris Saint German"
      },
      2: {
        1: "Robert Lewandowski",
        2: "Lionel Messi",
        3: "Christiano Ronaldo",
        4: "Wu Lei"
      },
      3: {
        1: "Italy",
        2: "England",
        3: "Germany",
        4: "Spain"
      },
      4: {
        1: "Brazil",
        2: "England",
        3: "Qatar",
        4: "Russia"
      }
    },
    correctAnswers: {
      1: "2",
      2: "1",
      3: "1",
      4: "3"
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0
  };

  // the method that checks the correct answer
  checkAnswer = (answer) => {
    const { correctAnswers, step, score } = this.state;
    if (answer === correctAnswers[step]) {
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer
      });
    } else {
      this.setState({
        correctAnswer: 0,
        clickedAnswer: answer
      });
    }
  };

  // method to move to the next question
  nextStep = (step) => {
    this.setState({
      step: step + 1,
      correctAnswer: 0,
      clickedAnswer: 0
    });
  };

  render() {
    let {
      quiestions,
      answers,
      correctAnswer,
      clickedAnswer,
      step,
      score
    } = this.state;
    return (
      <div className="Content">
        {step <= Object.keys(quiestions).length ? (
          <>
            <Question question={quiestions[step]} />
            <Answer
              answer={answers[step]}
              step={step}
              checkAnswer={this.checkAnswer}
              correctAnswer={correctAnswer}
              clickedAnswer={clickedAnswer}
            />
            <button
              className="NextStep"
              disabled={
                clickedAnswer && Object.keys(quiestions).length >= step
                  ? false
                  : true
              }
              onClick={() => this.nextStep(step)}
            >
              Next
            </button>
          </>
        ) : (
          <div className="finalPage">
            <h1>You have completed the quiz!</h1>
            <p>
              Your score is: {score} of {Object.keys(quiestions).length}
            </p>
            <p>Thank you!</p>
          </div>
        )}
      </div>
    );
  }
}
