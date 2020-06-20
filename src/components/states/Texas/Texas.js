import React, {useState} from 'react';
import counties from './countyMap';
import _ from 'lodash';

import './style.css'

const voterOptions = ['VUID, Date of Birth', 'TLD, Date of Birth', 'Name, County, Date of Birth']

const generateFields = (option) => {
  if (option === 'VUID, Date of Birth') {
    return (
      <div className='form-container'>
        <div className='form-content'>
          <label>VUID:</label>
          <input type="text" name="idVoter"/>
        </div>
        <div className='form-content'>
          <label>Date of Birth:</label>
          <input type="date" id="start" name="vuidDob" min="1900-01-01"/>
        </div>
      </div>
    )
  } else if (option === 'TLD, Date of Birth') {
    return (
      <div className='form-container'>
        <div className='form-content'>
          <label>TLD:</label>
          <input type="text" name="idTdl"/>
        </div>
        <div className='form-content'>
          <label>Date of Birth:</label>
          <input type="date" id="start" name="tdlDob" min="1900-01-01"/>
        </div>
      </div>
    )
  } else if (option === 'Name, County, Date of Birth') {
    return (
      <div className='form-container'>
        <div className='form-content'>
          <label>First Name:</label>
          <input type="text" name="firstName"/>
        </div>
        <div className='form-content'>
          <label>Last Name:</label>
          <input type="text" name="lastName"/>
        </div>
        <div className='form-content'>
          <label>Suffix:</label>
          <input type="text" name="nmSuffix"/>
        </div>
        <div className='form-content'>
          <label>County:</label>
          <select>
            {_.map(counties, (opt, index) => {
                return <option value={index}>{opt}</option>
            })}
          </select>
        </div>
        <div className='form-content'>
          <label>Date of Birth:</label>
          <input type="date" id="start" name="vuidDob" min="1900-01-01"/>
        </div>
        <div className='form-content'>
          <label>Zipcode:</label>
          <input type="text" name="adZip5"/>
        </div>
      </div>
    )
  }
}

const Texas = () => {
  const [voterOpt, setVoterOpt] = useState(voterOptions[0])

  const handleVoterOptSelection = (event) => {
    setVoterOpt(event.target.value);
    console.log('what is voteropt?', voterOpt);
  }
    return (
      <div className='container'>
        <select onChange={handleVoterOptSelection}>
          {_.map(voterOptions, (opt) => {
              return <option>{opt}</option>
          })}
        </select>
        <div className='form-picker'>
          {generateFields(voterOpt)}
        </div>
      </div>
    );
};

export default Texas;