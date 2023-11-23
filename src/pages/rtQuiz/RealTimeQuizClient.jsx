import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../../constants/apiConstants';
import { Container, Form, Header, Segment, Table } from 'semantic-ui-react';
import { QuizService } from '../../services/QuizService';
import QuizWaitingPage from '../rtQuiz/QuizWaitingPage';

export default function RealTimeQuizClient() {
  const navigate = useNavigate()

  const { quizId } = useParams()

  const [stompClient, setStompClient] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("")
  const [lastQuestionId, setLastQuestionId] = useState(null)

  let quizService = new QuizService();

  useEffect(() => {
    const socket = new WebSocket(SOCKET_BASE_URL + '/rt-quiz');

    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      setStompClient(client)

      client.subscribe('/topic/rt-quiz-client/' + quizId, (newQuestion) => {
        setQuestion(JSON.parse(newQuestion.body))
        setAnswer("")
      });

      client.subscribe('/topic/rt-quiz-finish/' + quizId, (data) => {
        console.log(data.body);
        if (data.body==quizId) {
          navigate("/finish-page-client")
        }
      });

    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {

    if(question && !lastQuestionId){
      setLastQuestionId(question.id)
    }

    if (question && answer) {
      let values = {
        questionId: lastQuestionId,
        userId: localStorage.getItem("id"),
        answer: answer
      }
      quizService.sendAnswer(values)
      setLastQuestionId(question.id)
    }

  }, [answer, lastQuestionId, question])

  return (
    <Container style={{ marginTop: "20px", display: "block" }}>
      {question ? <div><Segment placeholder>
        <Header size='large'>{question.title}</Header>
      </Segment><div>
          <Form.TextArea placeholder='Your answer...' style={{ minHeight: 100, minWidth: 300 }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div></div> : <QuizWaitingPage />}

    </Container>
  )
}
