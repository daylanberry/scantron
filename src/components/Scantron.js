import React, { Component } from 'react';
import Question from './Question';
import './Scantron.css';
import Button from '@material-ui/core/Button';
import Modal from './Modal';
import Portal from './Portal';

const MAX_PER_COL = 25

class Scantron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scantronAnswers: [],
      modal: false
    }
  }

  componentDidMount() {
    const { questions } = this.props;

    let scantronAnswers = Array.from({length: questions }).map(() => '')

    this.setState({ scantronAnswers })
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal});
  }


  createScantron = (questions) => {

    var result = []
    let numberOfBreaks = Math.floor(questions/MAX_PER_COL)
    let numForEachCol = Math.floor(questions/numberOfBreaks)
    let qNum = 1;

    for (var i = 0; i < numberOfBreaks; i++) {
      let subArr = [];
      for (var j = 0; j < numForEachCol; j++) {
        subArr.push({ qNum, answer: null })
        qNum++
      }

      if (i === numberOfBreaks - 1 && qNum <= questions) {
        while (qNum <= questions) {
          subArr.push({ qNum, answer: null })
          qNum++
        }
      }

      result.push(subArr)

    }

    return result
  }

  selectAnswer = (i, answer) => {
    let answerBank = this.state.scantronAnswers.slice();

    answerBank[i] = answer;

    this.setState({ scantronAnswers: answerBank })
  }

  render() {

    const { questions } = this.props;
    const { scantronAnswers, modal } = this.state;

    return (
      <div>
        Total # of questions: {questions}
        <Button onClick={this.toggleModal} color='primary'>Get Results</Button>
        <div className='full-scantron'>
          {
            modal && (
              <Portal>
                <Modal
                  toggle={this.toggleModal}
                  numQuestions={questions}
                  createScantronAnswer={this.createScantron}
                  enteredAnswers={scantronAnswers}
                />
              </Portal>
            )
          }
          {
            this.createScantron(questions).map((questionCol, col) => (
              <div className='scantron-col'>
                {
                  questionCol.map((q, i) => {
                    return (
                      <Question
                        num={q.qNum}
                        selectAnswer={this.selectAnswer}
                      />
                    )
                  })
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Scantron