import React, {useState} from 'react';
import counties from './countyMap';
import _ from 'lodash';

import './style.css'

const voterOptions = ['VUID, Date of Birth', 'TLD, Date of Birth', 'Name, County, Date of Birth']

const Texas = () => {
  const [voterOpt, setVoterOpt] = useState(voterOptions[0])
  const [value, setValue] = useState({
    idVoter: null,
    vuidDob: null,
    idTdl: null,
    tdlDob: null,
    firstName: null,
    lastName: null,
    nmSuffix: null,
    county: null,
    dob: null,
    adZip5: null
  })

  const generateFields = (option) => {
    if (option === 'VUID, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>VUID:</label>
            <input type="text" name="idVoter" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="vuidDob" min="1900-01-01" onChange={handleChange}/>
          </div>
        </div>
      )
    } else if (option === 'TLD, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>TLD:</label>
            <input type="text" name="idTdl" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="tdlDob" min="1900-01-01" onChange={handleChange}/>
          </div>
        </div>
      )
    } else if (option === 'Name, County, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>First Name:</label>
            <input type="text" name="firstName" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>Last Name:</label>
            <input type="text" name="lastName" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>Suffix:</label>
            <input type="text" name="nmSuffix" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>County:</label>
            <select name="county" onChange={handleChange}>
              {_.map(counties, (opt, index) => {
                  return <option value={index}>{opt}</option>
              })}
            </select>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="dob" min="1900-01-01" onChange={handleChange}/>
          </div>
          <div className='form-content'>
            <label>Zipcode:</label>
            <input type="text" name="adZip5" onChange={handleChange}/>
          </div>
        </div>
      )
    }
  }

  const handleVoterOptSelection = (event) => {
    setVoterOpt(event.target.value);
  }

  const handleChange = (event) => {
    const property = event.target.name;
    setValue({...value, [property]: event.target.value})
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
        <input class='submit-btn'
        type="button"
        value="Submit"/>
      </div>
    );
};

export default Texas;