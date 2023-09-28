import React, { useRef } from "react";
import { Button } from "react-bootstrap";

const PrintButton = ({ component }) => {
  const componentRef = useRef();

  return (
    <Button onClick={() => componentRef.current.print()}>Print</Button>
  );
};

export default PrintButton;
