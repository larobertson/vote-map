import React, {useState} from 'react';
import Axios from 'axios';
import counties from './countyMap';
import _ from 'lodash';

// utils
import formatDate from '../../../utils/formatDate';
import todaysDate from '../../../utils/todaysDate';

// components
import MapContainer from './MapContainer';
import Button from '../../Button';

// styles
import './style.css'

const host = window.location.hostname === 'localhost' ? `${process.env.REACT_APP_DEV_SERVER}` : `${process.env.REACT_APP_SERVER}`

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
  const [elections, setElections] = useState([{election: '11/03/2020--2020 NOVEMBER 3RD GENERAL ELECTION'}, {election: '07/14/2020--2020 JULY 14TH DEMOCRATIC PRIMARY RUNOFF'}, {election: '07/14/2020--2020 SPECIAL ELECTION SENATE DISTRICT 14'}]);
  const [voterAddress, setVoterAddress] = useState(null);
  const [vuid, setVuid] = useState('');
  const [error, setError] = useState(false);

  const [electionDayLocations, setElectionDayLocations] = useState([]);
  const [earlyVotingLocations, setEarlyVotingLocations] = useState([]);
  const [showEarlyVotingLocations, setShowEarlyVotingLocations] = useState(true);

  const renderError = () => {
    // put an alert tag here
    // would be nice if we could distinguish where the error was
  }


  const generateVoterInfoFields = (option) => {
    if (option === 'VUID, Date of Birth') {
      return (
        <div className='form-container'>
          <form id="option1">   
            <div className='form-content'>
              <label>VUID:</label>
              <input type="text" id="idVoter" name="idVoter" pattern="\d+" minLength="10" maxLength="10" value={value.idVoter} onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>Date of Birth:</label>
              <input type="date" id="vuidDob" name="vuidDob" min="1900-01-01" max={todaysDate()} maxLength="10" onChange={handleVoterChange}/>
            </div>
          </form>
        </div>
      )
    } else if (option === 'TLD, Date of Birth') {
      return (
        <div className='form-container'>
          <form id="option2">
            <div className='form-content'>
              <label>TLD:</label>
              <input type="text" id="idTdl" name="idTdl" pattern="\d+" minLength="8" maxLength="8" value={value.idTdl} onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>Date of Birth:</label>
              <input type="date" id="tdlDob" name="tdlDob" min="1900-01-01" max={todaysDate()} onChange={handleVoterChange}/>
            </div>
          </form>
        </div>
      )
    } else if (option === 'Name, County, Date of Birth') {
      return (
        <div className='form-container'>
          <form id="option3">
            <div className='form-content'>
              <label>First Name:</label>
              <input type="text" id="firstName" name="firstName" maxLength="30" value={value.firstName} onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>Last Name:</label>
              <input type="text" id="lastName" name="lastName" maxLength="30" value={value.lastName} onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>Suffix:</label>
              <input type="text" id="nmSuffix" name="nmSuffix" maxLength="20" value={value.nmSuffix} onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>County:</label>
              <select id="county" name="county" value={value.county} onChange={handleVoterChange}>
                {_.map(counties, (opt, index) => {
                    return <option value={index} key={index}>{opt}</option>
                })}
              </select>
            </div>
            <div className='form-content'>
              <label>Date of Birth:</label>
              <input type="date" id="dob" name="dob" min="1900-01-01" max={todaysDate()} maxLength="10" onChange={handleVoterChange}/>
            </div>
            <div className='form-content'>
              <label>Zipcode:</label>
              <input type="text" id="adZip5" name="adZip5" pattern="\d+" minLength="5" maxLength="5" value={value.adZip5} onChange={handleVoterChange}/>
            </div>
          </form>
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
      const resp = await Axios.post(`${host}/fetchVoterData`, value);
      setElections(resp.data.elections);
      setVuid(resp.data.vuid);
      setVoterAddress(resp.data.voterAddress);
      if (error) {
        setError(false);
      }
    } catch (e) {
      setError(true);
    }
  }

  const findElectionLocations = async (event) => {
    const postData = {
      idElection: event.target.value,
      vuid
    }
    const resp = await Axios.post(`${host}/fetchPollingLocations`, postData);
    setEarlyVotingLocations(resp.data.earlyVotingLocations);
    setElectionDayLocations(resp.data.electionDayLocations);
  }

  const toggleElections = (isEarlyElection) => {
    setShowEarlyVotingLocations(isEarlyElection);
  }

  const populateAddressSideNav = (location, key) => {
    return (
      <div className='loc' key={key}>
        <h3>{location.name}</h3>
        <p>{location.address}</p>
        <p>{location.timings}</p>
      </div>
    )
  }



    return (
      <div className='container'>
        <div className='election-info-row'>
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
            <h3>Upcoming Elections</h3>
            {error ? <p>Something went wrong</p> : _.map(elections, (obj, index) => {
              return (
                <button className='election-button' value={obj.number} onClick={findElectionLocations}>{obj.election}</button>
              )
            })}
          </div>
        </div>
        <div className='location-container'>
          <div className='map-flex-container'>
          <MapContainer voterAddress={voterAddress} earlyVotingLocations={earlyVotingLocations} electionDayLocations={electionDayLocations} showEarlyVotingLocations={showEarlyVotingLocations}/>
          </div>
          <div className='address-lists'>
            <div className='toggle'>
              <Button btnText={'Early Elections'} toggleElections={() => toggleElections(true)} />
              <Button btnText={'Election Day'} toggleElections={() => toggleElections(false)} />
            </div>
            <div className='addresses'>
              {showEarlyVotingLocations && earlyVotingLocations.length ? _.map(earlyVotingLocations, (loc, key) => { return populateAddressSideNav(loc, key) }) : electionDayLocations.length ? _.map(electionDayLocations, (loc, key) => { return populateAddressSideNav(loc, key) }) : null}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Texas;