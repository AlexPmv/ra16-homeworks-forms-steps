import React, {Component} from 'react';
import TrainingAddForm from './TrainingAddForm';
import TrainingResults from './TrainingResults';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = this.getResultsFromLocalStorage();
    this.addResultFromForm = this.addResultFromForm.bind(this);
    this.deleteResult = this.deleteResult.bind(this);
  }

  addResultFromForm(e) {
    e.preventDefault();

    const currentDateValue = e.target.querySelector('.training-form-date').value;
    const currentRange = +e.target.querySelector('.training-form-range').value

    let tempDateArr = currentDateValue.split('.');
    tempDateArr = tempDateArr.reverse();
    const tempYear = tempDateArr.shift();
    tempDateArr.push(tempYear);
    const dateForSort = Date.parse(tempDateArr.join('.'));

    let results = JSON.parse(localStorage.trainingResults).results;
    const dateAlreadyExist = results.findIndex(result => result.date === currentDateValue)

    if (dateAlreadyExist !== -1 ) {
      results[dateAlreadyExist].range += currentRange;
    } else {
      const currentResult = {
        id: this.getResultId(),
        date: currentDateValue,
        dateForSort: dateForSort,
        range: currentRange,
      }
  
      results.push(currentResult);
      results = results.sort((a, b) => {
        return b.dateForSort - a.dateForSort
      });
    }

    
    localStorage.trainingResults = JSON.stringify({results: results});
    this.setState(JSON.parse(localStorage.trainingResults));
    
    e.target.querySelector('.training-form-date').value = '';
    e.target.querySelector('.training-form-range').value = ''; 
  }

  getResultId() {
    let i = 1;

    while (this.state.results.find(result => result.id === i)) {
      i++;
    }

    return i;
  }
  getResultsFromLocalStorage() {
    if (!localStorage.trainingResults) {
      localStorage.trainingResults = JSON.stringify({results: []});
    }

    return JSON.parse(localStorage.trainingResults)
  }

  deleteResult(e) {
    if (e.target.classList.contains('result-delete')) {
      const currentResultId = e.currentTarget.id;
      let results = JSON.parse(localStorage.trainingResults).results;
      results = results.filter(result => result.id !== +currentResultId);

      localStorage.trainingResults = JSON.stringify({results: results});
      this.setState(JSON.parse(localStorage.trainingResults));
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <TrainingAddForm addResultFromForm={this.addResultFromForm}/>
        <TrainingResults results={this.state.results} deleteResult={this.deleteResult}/>
      </div>
    )
  }
}