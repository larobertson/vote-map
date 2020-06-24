import React from 'react';

const Button = (props) => {
  return (
    <>
      <button className='toggleBtn' onClick={props.toggleElections}>{props.btnText}</button>
    </>
  );
};

export default Button;