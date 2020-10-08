import React, { Component } from 'react';
import './Modal.css';
import TextField from '@material-ui/core/TextField';


class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctAnswers: Array.from({ length: this.props.numQuestions }).map(() => ''),
      enteredAnswers: this.props.enteredAnswers
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
    const { numQuestions, createScantronAnswer } = this.props;
    const { correctAnswers } = this.state;

    const toRender = createScantronAnswer(numQuestions)

    return toRender.map((col, i) => (
      <div >
        {
          col.map((entry, idx) => (
            <div>
              <span style={{color: 'white'}}>
                {entry.qNum}
              </span>
              <TextField
                id='outlined-basic'
                type='text'
                style={{color: 'blue'}}
                onChange={(e) => {
                  this.setCorrectAnswer(e.target.value.slice(-1), entry.qNum - 1)
                }}
                value={correctAnswers[entry.qNum-1]}
              />
            </div>
          ))
        }
      </div>
    ))

  }

  render() {
    const { toggle } = this.props

    return (
      <div className='modal'>
        <div style={{height: '100%'}}>
          <div className='answer-title'>
            <h1 style={{color: 'aliceblue'}}>Fill out the answers</h1>
            <div onClick={toggle} className='close'></div>
          </div>

          <form autoComplete='off'>
            <div style={{display: 'flex'}}>
              {this.createAnswerBank()}
            </div>
          </form>

        </div>
      </div>
    )
  }

}

export default Modal