import { Alert } from "react-bootstrap";

import React from 'react';

const AlertMessage = ({info}) => {
  return info === null ? null : (<div>
        <Alert variant = {info.type}>{info.message}</Alert>
  </div>);
};

export default AlertMessage;
