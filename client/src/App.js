import React from 'react';
import './styles/styles.scss';
import { Row, Col } from 'react-bootstrap';
import FormComponent from "./components/FormComponent";

function App() {
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col md={12}>
      <FormComponent/>
        </Col>
      </Row>
      {/*<footer>*/}
      {/*  <h5 className={"text-center"}>Tom Heaton | 2020</h5>*/}
      {/*</footer>*/}
    </div>
  );
}

export default App;
