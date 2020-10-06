import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Question.css'


const Question = ({num, selectAnswer})=> {


  const renderOptions = () => {
    let options = ['A', 'B', 'C', 'D']

    return options.map((option, i) => {
      return (
        <FormControlLabel
          value={option}
          control={<Radio color="primary" />}
          label={option}
          onClick={() => selectAnswer(num - 1, option)}
          labelPlacement="start"
        />
      )
    })
  }

  return (
    <div className='question'>
      <div style={{marginTop: '10px'}}>
        {num}.
      </div>
      <RadioGroup row aria-label="position" name="position">
        {renderOptions()}
      </RadioGroup>
    </div>

  )
}

export default Question;