import {
  FETCH_QUIZZES_REQUEST,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_FAILURE,
} from "../../src/actions/quizActionCreator";
import quizReducer from "../../src/reducers/quizReducer";

describe("quizReducerのテスト", () => {
  it("action.type===FETCH_QUIZZES_REQUESTの時", () => {
    const action = {
      type: FETCH_QUIZZES_REQUEST,
    };
    const initialState = quizReducer(undefined, action);

    expect(initialState).toStrictEqual({
      isLoading: true,
      quizzes: [],
      error: null,
    });
  });

  it("action.type===FETCH_QUIZZES_SUCCESSのとき,", () => {
    const dummyQuizData = [
      {
        question: "a",
        correctAnswer: "b",
        incorrectAnswers: ["c", "d", "e"],
      },
    ];

    const action = {
      type: FETCH_QUIZZES_SUCCESS,
      data: dummyQuizData,
    };

    const currentState = {
      isLoading: true,
      quizzes: [],
      error: null,
    };

    const state = quizReducer(currentState, action);

    expect(state).toStrictEqual({
      isLoading: false,
      quizzes: dummyQuizData,
      error: null,
    });
  });

  it("action.type===FETCH_QUIZZES_FAILUREのとき,", () => {
    const dummyErrorMessage = "ダミーエラーメッセージ";

    const action = {
      type: FETCH_QUIZZES_FAILURE,
      error: dummyErrorMessage,
    };

    const currentState = {
      isLoading: true,
      quizzes: [],
      error: null,
    };

    const state = quizReducer(currentState, action);

    expect(state).toStrictEqual({
      isLoading: false,
      quizzes: [],
      error: dummyErrorMessage,
    });
  });
});
