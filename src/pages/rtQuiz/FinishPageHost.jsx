import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

export default function FinishPageHost() {

  return (
    <Container style={{ display: "flex", width: "500px", justifyContent: "center", marginTop: "2%", flexDirection:"column" }}>
        <Segment color='green' placeholder >
          
            <Header>The quiz has finished.</Header>
          
          </Segment>
    </Container>
  )
}
