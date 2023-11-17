import React, { useEffect, useState } from 'react'
import { QuizService } from '../services/QuizService';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../constants/apiConstants';
import { Button, Container, Table } from 'semantic-ui-react';


export default function RealTimeQuizHost() {

  const { quizId } = useParams()

  const [stompClient, setStompClient] = useState(null);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0)

  useEffect(() => {
    let quizService = new QuizService()
    quizService.getById(quizId).then(result => {
      setQuiz(result.data.data.quiz)
      setQuestions(result.data.data.questions)
    })
  }, [quizId]);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_BASE_URL + '/rt-quiz');

    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      setStompClient(client)

      client.subscribe('/topic/rt-quiz-client/' + quizId, (message) => {

      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [quizId, questions, stompClient]);

  const sendQuestion = () => {
      setQuestionNo((prevQuestionNo) => prevQuestionNo + 1);
  }

  useEffect(() => {
    if (stompClient) {
      stompClient.send('/rt-quiz', {}, JSON.stringify(questions[questionNo].question.id));
    }
  }, [questions, questionNo])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>

      <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%", flexDirection: "column" }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Correct Answer</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {questions.length > 0 && questions[questionNo].question.title}
              </Table.Cell>
              <Table.Cell>
                {questions.length > 0 && questions[questionNo].correctAnswer}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div style={{ marginLeft: "auto", marginRight: "10px" }}>
          <Button primary onClick={() => sendQuestion()}>Next</Button>
        </div>
      </Container>

    </div>
  )
}
