import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../constants/apiConstants';
import { Container, Form, Header, Segment, Table } from 'semantic-ui-react';

export default function RealTimeQuizClient() {

  const { quizId } = useParams()

  const [stompClient, setStompClient] = useState(null);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_BASE_URL + '/rt-quiz');

    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      setStompClient(client)

      client.subscribe('/topic/rt-quiz-client/' + quizId, (question) => {
        setQuestion(JSON.parse(question.body))
        console.log(JSON.parse(question.body));
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      {question && <Segment placeholder>
        <Header size='large'>Question: {question.title}</Header>
      </Segment>}
      <div>
        <Form.TextArea placeholder='Your answer...' style={{ minHeight: 100 }}

        />
      </div>
    </Container>
  )
}
