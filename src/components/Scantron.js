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
      modal: false
    }
  }

  componentDidMount() {

    const { questions } = this.props;

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


    for (var i = 0; i < questions; i++) {
      result.push({ qNum: i + 1, answer: null, correctAnswer: null })
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

  render() {

    const { questions } = this.props;
    const { scantronAnswers, modal, scantron } = this.state;

    if (!scantron) return <div>Loading...</div>
    const columns = Math.ceil(questions/25)

    return (
      <div>
        Total # of questions: {questions}
        <Button onClick={this.toggleModal} color='primary'>Get Results</Button>
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
                />
              </Portal>
            )
          }
          {
            scantron.map((question, col) => (
                <Question
                  question={question}
                  selectAnswer={this.selectAnswer}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Scantron