import {
  FETCH_QUIZZES_FAILURE,
  FETCH_QUIZZES_REQUEST,
  FETCH_QUIZZES_SUCCESS,
} from "../actions/quizActionCreator";

const initialState = {
  isLoading: false,
  quizzes: [],
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZZES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizzes: action.data,
        error: null,
      };

    case FETCH_QUIZZES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default quizReducer;
