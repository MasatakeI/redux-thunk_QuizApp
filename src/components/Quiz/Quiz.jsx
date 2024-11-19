import React from "react";

import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Quiz.css";
import { fetchQuizzes } from "../../actions/quizActionCreator";
import { connect } from "react-redux";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      numberOfCorrects: 0,
    };
  }

  componentDidMount() {
    this.restart();
  }

  restart() {
    this.setState({
      currentIndex: 0,
      numberOfCorrects: 0,
    });

    this.props.fetchQuizzes();
  }

  selectAnswer(quiz, answer) {
    let { numberOfCorrects, currentIndex } = this.state;
    const isCorrect = quiz.judgeCorrectAnswer(answer);

    if (isCorrect) {
      alert("Correct answer!!");
      numberOfCorrects++;
    } else {
      alert(`Wrong answer... (The correct answer is ${quiz.correctAnswer})`);
    }
    currentIndex++;
    this.setState({
      numberOfCorrects,
      currentIndex,
    });
  }

  render() {
    const { currentIndex } = this.state;
    const { quizzes } = this.props.quizInfo;

    if (quizzes.length === 0) {
      return this.renderLoading();
    }

    if (quizzes.length > 0 && currentIndex < quizzes.length) {
      return this.renderQuiz();
    }

    if (quizzes.length > 0 && currentIndex >= quizzes.length) {
      return this.renderResult();
    }
  }

  renderLoading() {
    return (
      <div>
        <div>
          <h1>クイズページ</h1>
          <p>Now loading...</p>
        </div>
        <hr />
        <Link to={"/"} className="link" disabled>
          トップページへ
        </Link>
      </div>
    );
  }

  renderQuiz() {
    const { currentIndex } = this.state;
    const { quizzes } = this.props.quizInfo;
    const quiz = quizzes[currentIndex];

    const answers = quiz.shuffleAnswers().map((answer, index) => {
      return (
        <div key={index}>
          <li>
            <Button
              onClickHandler={() => {
                this.selectAnswer(quiz, answer);
              }}
            >
              {answer}
            </Button>
          </li>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h1>クイズページ</h1>
          <p className="question">
            Q{currentIndex + 1}:{quiz.question}
          </p>
          <ul className="answersContainer">{answers}</ul>
        </div>
        <hr />
        <Link to={"/"} className="link">
          トップページへ
        </Link>
      </div>
    );
  }

  renderResult() {
    const { numberOfCorrects } = this.state;
    const { quizzes } = this.props.quizInfo;

    return (
      <div>
        <div>
          <h1>クイズページ</h1>
          <p>正答数</p>
          <p>{`${numberOfCorrects}/${quizzes.length}`}</p>
          <Button
            onClickHandler={() => {
              this.restart();
            }}
          >
            Restart
          </Button>
        </div>
        <hr />
        <Link to={"/"} className="link">
          トップページへ
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizInfo: state.quizInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizzes: (quizzes) => {
      const action = fetchQuizzes(quizzes);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
