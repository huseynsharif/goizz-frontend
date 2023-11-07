import React from 'react'
import { Container } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'


export default function AddQuiz() {
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>

      <Form>
        <Form.Input fluid label='Name' placeholder='Name' />
        <Form.TextArea label='Description (optional)' placeholder='Write about the quiz...' />
        <Form.Button primary>Create</Form.Button>
      </Form>
    </Container>
  )
}
