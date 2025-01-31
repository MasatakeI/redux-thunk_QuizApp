import axios from "axios";
import QuizModel from "../models/QuizModel";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

export const FETCH_QUIZZES_REQUEST = "FETCH_QUIZZES_REQUEST";
export const FETCH_QUIZZES_SUCCESS = "FETCH_QUIZZES_SUCCESS";
export const FETCH_QUIZZES_FAILURE = "FETCH_QUIZZES_FAILURE";

export const fetchQuizzes = () => {
  return async (dispatch) => {
    dispatch(fetchQuizzesRequest());

    try {
      const response = await axios.get(API_URL);
      const results = response.data.results;
      const data = QuizModel.createQuizInstanceWithData(results);

      dispatch(fetchQuizzesSuccess(data));
    } catch (error) {
      dispatch(fetchQuizzesFailure(error));
    }
  };
};

const fetchQuizzesRequest = () => {
  return {
    type: FETCH_QUIZZES_REQUEST,
  };
};

const fetchQuizzesSuccess = (data) => {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    data,
  };
};

const fetchQuizzesFailure = (error) => {
  return {
    type: FETCH_QUIZZES_FAILURE,
    error,
  };
};
