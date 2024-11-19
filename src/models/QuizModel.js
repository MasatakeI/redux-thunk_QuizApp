import _ from "lodash";
import QuizFetcher from "../data_fetchers/QuizFetcher";
import he from "he";

class QuizModel {
  constructor({ question, correctAnswer, incorrectAnswers }) {
    this._question = question;
    this._correctAnswer = correctAnswer;
    this._incorrectAnswers = incorrectAnswers;
  }

  get question() {
    return this._question;
  }

  get correctAnswer() {
    return this._correctAnswer;
  }

  shuffleAnswers() {
    return _.shuffle([this._correctAnswer, ...this._incorrectAnswers]);
  }

  judgeCorrectAnswer(answer) {
    return answer === this._correctAnswer;
  }

  static async fetchAndCreateQuizzes() {
    const quizDataList = await QuizFetcher.fetch();

    return QuizModel.createQuizInstanceWithData(quizDataList.results);
  }

  static createQuizInstanceWithData(quizDataList) {
    return quizDataList
      .map((quizData) => {
        return {
          question: quizData.question ? he.decode(quizData.question) : "",
          correctAnswer: quizData.correct_answer
            ? he.decode(quizData.correct_answer)
            : "",
          incorrectAnswers: Array.isArray(quizData.incorrect_answers)
            ? quizData.incorrect_answers.map((str) =>
                str ? he.decode(str) : ""
              )
            : [],
        };
      })
      .map((quizData) => new QuizModel(quizData));
  }
}

export default QuizModel;
