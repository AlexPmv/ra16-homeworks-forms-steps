import React, {Component} from 'react'

export default class TrainingAddForm extends Component {

  render() {
    return (
      <form className="training-form" onSubmit={this.props.addResultFromForm}>
        <div className='form-date-container'>
          <span className='form-date-hint'>Дата (ДД.ММ.ГГ)</span>
          <input className="training-form-date"
          pattern="^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$"

          onInput={(e) => {
            const targetDate = e.target;

            targetDate.setCustomValidity(' ')

            if (!targetDate.validity.patternMismatch && !targetDate.validity.valueMissing) {
              targetDate.setCustomValidity('');
            }
          }}
      
          onInvalid={(e) => {
            const targetDate = e.target;

            if (targetDate.validity.patternMismatch) {
              targetDate.setCustomValidity('Внесите дату в формате "ЧЧ.ММ.ГГ"')
            }

            if (targetDate.validity.valueMissing) {
              targetDate.setCustomValidity('Заполните дату')
            }
          }}

          placeholder='ДД.ММ.ГГ' required></input>
        </div>
        <div className='form-range-container'>
          <span className='form-range-hint'>Пройдено км</span>
          <input className="training-form-range" pattern="^([1-9](\d{1,2})?)$" 
          
          onInput={(e) => {
            const targeRange = e.target;

            targeRange.setCustomValidity(' ')

            if (!targeRange.validity.patternMismatch && !targeRange.validity.valueMissing) {
              targeRange.setCustomValidity('');
            }
          }}

          onInvalid={(e) => {
            const targetRange = e.target;

            if (targetRange.validity.patternMismatch) {
              targetRange.setCustomValidity('Внесите число, максимально 3-х значное')
            }

            if (targetRange.validity.valueMissing) {
              targetRange.setCustomValidity('Заполните расстояние')
            }

          }}
          
          placeholder='Количество' required></input>
        </div>
        <div className='form-btn-container'>
          <button className="form-btn" type="submit">OK</button> 
        </div>
      </form>
    )
  }
}