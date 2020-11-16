import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Question.css'


const Question = ({ question: { qNum, correctAnswer, answer }, selectAnswer, show })=> {

  const renderOptions = () => {
    let options = ['A', 'B', 'C', 'D']

    return (
      <div>
        {
          options.map((option, i) => {
            return (
              <FormControlLabel
                value={option}
                control={<Radio color="primary" />}
                label={option}
                onClick={() => selectAnswer(qNum - 1, option)}
                labelPlacement="start"
              />
            )
          })
        }
        {
          correctAnswer && show && answer !== correctAnswer ? (
            <span className='incorrect'>Correct Answer: {correctAnswer}</span>
          ): null
        }
      </div>
    )

  }

  return (
    <div className='question'>
      <div style={{marginTop: '10px'}}>
        {qNum}.
      </div>
      <RadioGroup row aria-label="position" name="position">
        {renderOptions()}
      </RadioGroup>
    </div>

  )
}

export default Question;