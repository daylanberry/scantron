import React, { Component } from 'react';
import './Modal.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctAnswers: Array.from({ length: this.props.numQuestions }).map(() => ''),
    }
  }

  setCorrectAnswer = (answer, idx) => {
    if (!answer || !answer.length) return

    var acceptedAnswers = ['A', 'B', 'C', 'D', 'E']

    answer = answer.toUpperCase();

    if (!acceptedAnswers.includes(answer)) return

    const answerBoard = this.state.correctAnswers.slice();

    answerBoard[idx] = answer;

    this.setState({ correctAnswers: answerBoard })
  };


  createAnswerBank = () => {
    const { scantron } = this.props;
    const { correctAnswers } = this.state;


    return scantron.map((question, i) => (
      <div>
        <span style={{color: 'white'}}>
          {question.qNum}
        </span>
        <TextField
          type='text'
          id='outlined-basic'
          style={{color: 'blue'}}
          onChange={(e) => {
            e.target.value.slice(-1)
            this.setCorrectAnswer(e.target.value.slice(-1), question.qNum - 1)
          }}
          value={correctAnswers[question.qNum -1]}
        />
      </div>
    ))

  }

  calculateAnswers = () => {
    const { correctAnswers } = this.state;
    const { scantron, checkCorrect, toggle } = this.props

    for (var i = 0; i < correctAnswers.length; i++) {
      if (!scantron[i].answer || !correctAnswers[i]) continue
      if (scantron[i].answer === correctAnswers[i]) {
        checkCorrect(i, correctAnswers[i])
      } else {
        checkCorrect(i, correctAnswers[i])
      }
    }

    toggle()
  }

  render() {
    const { toggle, columns } = this.props

    return (
      <div className='modal'>
        <div style={{height: '100%'}}>
          <div className='answer-title'>
            <h1 style={{color: 'aliceblue'}}>Fill out the answers</h1>
            <div>
              <Button
                variant='contained'
                color='primary'
                style={{
                  marginTop: '22px',
                  marginLeft: '10px'
                }}
                onClick={this.calculateAnswers}
              >
                Get Results
              </Button>
            </div>
            <div onClick={toggle} className='close'></div>
          </div>

          <form autoComplete='off'>
            <div style={{columnCount: columns}}>
              {this.createAnswerBank()}
            </div>
          </form>

        </div>
      </div>
    )
  }

}

export default Modal