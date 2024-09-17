import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <Link to={props.Link} className={props.className}>
      {props.title}
    </Link>
  );
};

export default Button;
