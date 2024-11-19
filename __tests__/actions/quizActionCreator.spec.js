import configureMockStore from "redux-mock-store";
import axios from "axios";
import { thunk } from "redux-thunk";
import {
  FETCH_QUIZZES_REQUEST,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_FAILURE,
  fetchQuizzes,
} from "../../src/actions/quizActionCreator";
import QuizModel from "../../src/models/QuizModel";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("quizActionCreatorのテスト", () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it("fetch成功時,FETCH_QUIZZES_SUCCESSと一緒にクイズデータが取得できる", async () => {
    const expectedResults = [
      {
        question: "a",
        correctAnswer: "b",
        incorrectAnswers: ["c", "d", "e"],
      },
    ];

    axios.get.mockResolvedValue({
      data: {
        results: expectedResults,
      },
    });

    await store.dispatch(fetchQuizzes());
    const actions = store.getActions();

    expect(actions[0]).toStrictEqual({ type: FETCH_QUIZZES_REQUEST });

    expect(actions[1]).toStrictEqual({
      type: FETCH_QUIZZES_SUCCESS,
      data: QuizModel.createQuizInstanceWithData(expectedResults),
    });
  });

  it("fetch失敗時,FETCH_QUIZZES_FAILUREと一緒にエラー情報を取得する", async () => {
    const expectedError = "ダミーエラーメッセージ";

    axios.get.mockRejectedValue(expectedError);

    await store.dispatch(fetchQuizzes());
    const actions = store.getActions();

    expect(actions[0]).toStrictEqual({ type: FETCH_QUIZZES_REQUEST });

    expect(actions[1]).toStrictEqual({
      type: FETCH_QUIZZES_FAILURE,
      error: expectedError,
    });
  });
});
