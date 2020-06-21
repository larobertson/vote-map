import React, {useState} from 'react';
import Axios from 'axios';
import counties from './countyMap';
import _ from 'lodash';

// utils
import formatDate from '../../../utils/formatDate';

// styles
import './style.css'

const voterOptions = ['VUID, Date of Birth', 'TLD, Date of Birth', 'Name, County, Date of Birth']

const Texas = () => {
  const [voterOpt, setVoterOpt] = useState(voterOptions[0])
  const [value, setValue] = useState({
    selType: 'lfcd',
    idVoter: '',
    vuidDob: '',
    idTdl: '',
    tdlDob: '',
    firstName: '',
    lastName: '',
    nmSuffix: '',
    county: '',
    dob: '',
    adZip5: ''
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
    if (property.match(/dob/i)) {
      const formattedDate = formatDate(event.target.value);
      setValue({ ...value, [property]: formattedDate });
    }
  }

  const handleSubmit = async () => {
    const resp = await Axios.post('http://localhost:3001/fetchVoterData', value);
    console.log('what is resp?', resp);
  }

    return (
      <div className='container'>
        <div className='voter-info-container'>
          <select onChange={handleVoterOptSelection}>
            {_.map(voterOptions, (opt, key) => {
                return <option key={key}>{opt}</option>
            })}
          </select>
          <div className='form-picker'>
            {generateFields(voterOpt)}
          </div>
          <input className='submit-btn'
          type="button"
          value="Submit"
          onClick={handleSubmit}/>
        </div>
        <div className='elections-container'>

        </div>
        <div className='location-container'>

        </div>
      </div>
    );
};

export default Texas;