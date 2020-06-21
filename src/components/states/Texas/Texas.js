import React, {useState} from 'react';
import Axios from 'axios';
import counties from './countyMap';
import _ from 'lodash';

// utils
import formatDate from '../../../utils/formatDate';

// components
import MapContainer from './MapContainer';

// styles
import './style.css'

const voterOptions = ['VUID, Date of Birth', 'TLD, Date of Birth', 'Name, County, Date of Birth']

const Texas = () => {
  const [voterOpt, setVoterOpt] = useState(voterOptions[0]);
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
  });
  const [elections, setElections] = useState([]);
  const [vuid, setVuid] = useState('');
  const [error, setError] = useState(false);

  const renderError = () => {
    // put an alert tag here
    // would be nice if we could distinguish where the error was
  }


  const generateVoterInfoFields = (option) => {
    if (option === 'VUID, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>VUID:</label>
            <input type="text" name="idVoter" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="vuidDob" min="1900-01-01" onChange={handleVoterChange}/>
          </div>
        </div>
      )
    } else if (option === 'TLD, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>TLD:</label>
            <input type="text" name="idTdl" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="tdlDob" min="1900-01-01" onChange={handleVoterChange}/>
          </div>
        </div>
      )
    } else if (option === 'Name, County, Date of Birth') {
      return (
        <div className='form-container'>
          <div className='form-content'>
            <label>First Name:</label>
            <input type="text" name="firstName" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>Last Name:</label>
            <input type="text" name="lastName" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>Suffix:</label>
            <input type="text" name="nmSuffix" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>County:</label>
            <select name="county" onChange={handleVoterChange}>
              {_.map(counties, (opt, index) => {
                  return <option value={index} key={index}>{opt}</option>
              })}
            </select>
          </div>
          <div className='form-content'>
            <label>Date of Birth:</label>
            <input type="date" id="start" name="dob" min="1900-01-01" onChange={handleVoterChange}/>
          </div>
          <div className='form-content'>
            <label>Zipcode:</label>
            <input type="text" name="adZip5" onChange={handleVoterChange}/>
          </div>
        </div>
      )
    }
  }

  const handleVoterOptSelection = (event) => {
    setVoterOpt(event.target.value);
  }

  const handleVoterChange = (event) => {
    const property = event.target.name;
    setValue({...value, [property]: event.target.value})
    if (property.match(/dob/i)) {
      const formattedDate = formatDate(event.target.value);
      setValue({ ...value, [property]: formattedDate });
    }
  }

  const handleSubmitVoterData = async () => {
    try {
      const resp = await Axios.post('http://localhost:3001/fetchVoterData', value);
      setElections(resp.data.elections);
      setVuid(resp.data.vuid);
      if (error) {
        setError(false);
      }
    } catch (e) {
      // console.log('what is e?', e);
      setError(true);
    }
  }

  const findElectionLocations = async (event) => {
    const postData = {
      idElection: event.target.value,
      vuid
    }
    console.log('findElectionLocations', postData);
    const resp = await Axios.post('http://localhost:3001/fetchPollingLocations', postData);
    console.log('resp', resp.data);
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
            {generateVoterInfoFields(voterOpt)}
          </div>
          <input className='submit-btn'
          type="button"
          value="Submit"
          onClick={handleSubmitVoterData}/>
        </div>
        <div className='elections-container'>
          {error ? <p>Something went wrong</p> : _.map(elections, (obj, index) => {
            return (
              <button value={obj.number} onClick={findElectionLocations}>{obj.election}</button>
            )
          })}
        </div>
        <div className='location-container'>
          <MapContainer/>
        </div>
      </div>
    );
};

export default Texas;