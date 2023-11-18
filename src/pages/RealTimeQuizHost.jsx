import React, { useEffect, useState } from 'react'
import { QuizService } from '../services/QuizService';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../constants/apiConstants';
import { Button, Container, Header, Segment, Table } from 'semantic-ui-react';


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
  }, [quizId, questions]);

  const nextQuestion = () => {
    setQuestionNo((prevQuestionNo) => prevQuestionNo + 1);
  }

  const previousQuestion = () => {
    setQuestionNo((prevQuestionNo) => prevQuestionNo - 1);
  }

  useEffect(() => {
    if (stompClient) {
      stompClient.send('/rt-quiz', {}, JSON.stringify(questions[questionNo].question.id));
    }
  }, [questions, questionNo])

  return (
    <div style={{ display: "block", flexDirection: "row" }}>

      <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%", flexDirection: "column" }}>
        {questions.length > 0 && <Segment placeholder>
          <Header size='large'>Question: {questions[questionNo].question.title}</Header>
        </Segment>}
        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "10px" }}>
          <Button onClick={() => previousQuestion()}>Previous</Button>

          <Button primary onClick={() => nextQuestion()}>Next</Button>
        </div>
      </Container>

    </div>
  )
}
