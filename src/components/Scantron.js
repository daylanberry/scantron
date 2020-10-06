import React, { Component } from 'react';
import Question from './Question';
import './Scantron.css';
import Button from '@material-ui/core/Button';

const MAX_PER_COL = 25

class Scantron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scantronAnswers: []
    }
  }

  componentDidMount() {
    const { questions } = this.props;

    let scantronAnswers = Array.from({length: questions })

    this.setState({ scantronAnswers })
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

    const { questions, scantron } = this.props;

    return (
      <div>
        Total # of questions: {questions}
        <Button color='primary'>Get Results</Button>
        <div className='full-scantron'>
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