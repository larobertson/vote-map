import React from 'react';

const Button = (props) => {
  return (
    <>
      <button className='toggleBtn'>{props.btnText}</button>
    </>
  );
};

export default Button;