import React, { Component } from 'react';
import Scantron from './components/Scantron';
import './App.css';
import { TextField } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: 50,
      customNumber: ''
    }
  }

  handleChange = (e) => {
    const customNumber = parseInt(e.target.value);

    if (!isNaN(customNumber)) {
      this.setState({ customNumber })
    }

  }

  submitNumber = (e) => {
    const { customNumber } = this.state
    e.preventDefault();

    if (customNumber > 0) {
      this.setState({
        questions: customNumber,
        customNumber: ''
      })
    }

  }


  render() {
    const { customNumber, questions } = this.state;

    return (
      <div className="App">
        <h3>Take your practice test here!</h3>
        <form onSubmit={this.submitNumber}>
          <label className='label'>
            Change number of questions (default 50)
          </label>
            <TextField
              type='text'
              style={{marginBottom: '20px', bottom: '10px'}}
              value={customNumber}
              onChange={this.handleChange}
            />
        </form>
        <Scantron questions={questions}/>
      </div>
    );
  }
}

export default App;
