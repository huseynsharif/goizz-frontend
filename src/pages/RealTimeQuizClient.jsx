import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../constants/apiConstants';
import { Button, Container, Table } from 'semantic-ui-react';

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
        setQuestion(question.body)
        console.log(question.body);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <div>{question && question}</div>
  )
}
