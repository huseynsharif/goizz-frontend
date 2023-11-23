import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'


export default function FinishPageClient() {

    return (
        <div>
            <Container style={{ display: "flex", width: "500px", justifyContent: "center", marginTop: "2%", flexDirection: "column" }}>
                <Segment color='green' placeholder >

                    <Header>Thanks for participating!</Header>

                </Segment>
            </Container>

        </div>
    )
}
