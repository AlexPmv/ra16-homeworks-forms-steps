import React, {Component} from 'react';

export default class TrainingResults extends Component {

  getResults() {
    const results = this.props.results;

    if (results.length > 0) {
      return (
        <div className='results-list-container'>
          <ul className='results-list'>
            {results.map(result => 
            <li className='results-item' key={result.id} id={result.id} onClick={this.props.deleteResult}>
              <span className='result-date'>{result.date}</span>
              <span className='result-range'>{result.range}</span>
              <div className='result-actions-container'>
              <button className='result-delete'>x</button>
              </div>
            </li>)}
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='results-container'>
        <div className='results-naming-container'>
          <span className='results-naming-date'>Дата (ДД.ММ.ГГ)</span>
          <span className='results-naming-range'>Пройдено км</span>
          <span className='results-naming-actions'>Действия</span>
        </div>
        {this.getResults()}
      </div>
    )
  }
}