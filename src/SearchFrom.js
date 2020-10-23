import React from 'react';
import {Form,Col} from 'react-bootstrap';

function JobPage({params,handleParamChange}) {


  return (
    <Form >
    <Form.Row className="align-items-end">
    <Form.Group as={Col}>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" onChange={handleParamChange} value={params.description} name="description" />
    </Form.Group>
    <Form.Group as={Col}>
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" onChange={handleParamChange} value={params.location} name="location" />
    </Form.Group>
    <Form.Group as={Col} xs="auto" className="ml-2">
        <Form.Check onChange={handleParamChange} value={params.full_time} name="full_time" id="full-time" label="Only Full Time" type="checkbox" className="mb-2" />
    </Form.Group>
    </Form.Row>
    </Form>
  );
}

export default JobPage;