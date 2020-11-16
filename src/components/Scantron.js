import React, { Component } from 'react';
import Question from './Question';
import './Scantron.css';
import Button from '@material-ui/core/Button';
import Modal from './Modal';
import Portal from './Portal';


class Scantron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scantron: [],
      modal: false,
      show: false
    }
  }

  componentDidMount() {

    const { questions } = this.props;
    let correctAnswers = JSON.parse(window.localStorage.getItem('correct'))

    const scantron = this.createScantron(questions)

    this.setState({ scantron })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const scantron = this.createScantron(this.props.questions)

      this.setState({ scantron })
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }


  createScantron = (questions) => {

    var result = []

    let savedAnswers = JSON.parse(window.localStorage.getItem('correct'))


    for (var i = 0; i < questions; i++) {
      let correctAnswer = savedAnswers ? savedAnswers[i] : null
      console.log(correctAnswer)
      result.push({ qNum: i + 1, answer: null, correctAnswer })
    }

    return result
  }

  selectAnswer = (i, answer) => {
    let scantron = this.state.scantron.slice();

    scantron[i].answer = answer;

    this.setState({ scantron })
  }

  checkCorrect = (i, answer) => {
    let scantron = this.state.scantron.slice();

    scantron[i].correctAnswer = answer

    this.setState({ scantron })
  }

  showAnswers = () => {
    this.setState({show: !this.state.show})
  }

  clearCorrectAnswers = () => {
    let scantron = this.state.scantron.slice();

    window.localStorage.removeItem('correct');

    scantron.forEach(q => q.correctAnswer = null)

    this.setState({scantron});
  }

  render() {

    const { questions } = this.props;
    const { modal, scantron, show } = this.state;

    if (!scantron) return <div>Loading...</div>
    const columns = Math.ceil(questions/25)

    return (
      <div>
        Total # of questions: {questions}
        <Button onClick={this.toggleModal} color='primary'>Get Results</Button>
        <Button
          onClick={this.showAnswers}
        >
          Show Answers
        </Button>
        <Button
          onClick={this.clearCorrectAnswers}
        >
          Clear Correct
        </Button>
        <div style={{columnCount: columns}}>
          {
            modal && (
              <Portal>
                <Modal
                  toggle={this.toggleModal}
                  numQuestions={questions}
                  createScantronAnswer={this.createScantron}
                  scantron={scantron}
                  columns={columns}
                  checkCorrect={this.checkCorrect}
                  saveCorrectAnswers={this.saveCorrectAnswers}
                />
              </Portal>
            )
          }
          {
            scantron.map((question, col) => (
                <Question
                  question={question}
                  selectAnswer={this.selectAnswer}
                  show={show}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Scantron