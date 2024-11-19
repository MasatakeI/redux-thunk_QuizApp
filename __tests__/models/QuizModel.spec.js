import QuizModel from "../../src/models/QuizModel";

const createMockQuiz = () => {
  return {
    question: "問題",
    correctAnswer: "答え",
    incorrectAnswers: ["不正解1", "不正解2", "不正解3"],
  };
};

describe("QuizModelクラスのテスト", () => {
  describe("インスタンスメソッド", () => {
    describe("constructor", () => {
      it("constructorで渡した値をプロパティに保持する", () => {
        const quizData = createMockQuiz();
        const quiz = new QuizModel(quizData);

        expect(quiz._question).toStrictEqual(quizData.question);
        expect(quiz._correctAnswer).toStrictEqual(quizData.correctAnswer);
        expect(quiz._incorrectAnswers).toStrictEqual(quizData.incorrectAnswers);
      });
    });

    describe("getter", () => {
      it("questionとcorrectAnswerのgetterが使える", () => {
        const quizData = createMockQuiz();
        const quiz = new QuizModel(quizData);

        expect(quiz.question).toStrictEqual(quizData.question);
        expect(quiz.correctAnswer).toStrictEqual(quizData.correctAnswer);
        expect(quiz.incorrectAnswers).toStrictEqual(undefined);
      });
    });

    describe(" shuffleAnswersメソッド", () => {
      it("回答がシャッフルされる", () => {
        const quizData = createMockQuiz();
        const quiz = new QuizModel(quizData);

        const shuffledAnswer1 = quiz.shuffleAnswers();
        const shuffledAnswer2 = quiz.shuffleAnswers();

        expect(shuffledAnswer1).not.toStrictEqual(shuffledAnswer2);
      });
    });

    describe("judgeCorrectAnswerメソッド", () => {
      it("引数に渡した値が正解ならtrue,不正解ならfalseが返る", () => {
        const quizData = createMockQuiz();
        const quiz = new QuizModel(quizData);

        expect(quiz.judgeCorrectAnswer(quizData.correctAnswer)).toStrictEqual(
          true
        );

        quizData.incorrectAnswers.forEach((incorrectAnswer) => {
          expect(quiz.judgeCorrectAnswer(incorrectAnswer)).toStrictEqual(false);
        });
      });
    });
  });

  describe("クラスメソッド", () => {
    describe("fetchAndCreateQuizzesメソッド", () => {
      it("10件のクイズインスタンスが返る", async () => {
        const quizDataList = await QuizModel.fetchAndCreateQuizzes();

        expect(Array.isArray(quizDataList)).toStrictEqual(true);
        expect(quizDataList.length).toStrictEqual(10);

        quizDataList.forEach((quiz) => {
          expect(quiz instanceof QuizModel).toStrictEqual(true);
        });
      });
    });

    describe("createQuizInstanceWithDataメソッド", () => {
      it("指定された形式でデータを渡すとQuizインスタンスのリストを返す", () => {
        const dummyQuizData = [
          {
            question: "a",
            correctAnswer: "b",
            incorrectAnswers: ["c", "d", "e"],
          },
        ];

        const quizzes = QuizModel.createQuizInstanceWithData(dummyQuizData);

        expect(Array.isArray(quizzes)).toStrictEqual(true);
        expect(quizzes.length).toStrictEqual(dummyQuizData.length);

        quizzes.forEach((quiz) => {
          expect(quiz instanceof QuizModel).toStrictEqual(true);
        });
      });
    });
  });
});
