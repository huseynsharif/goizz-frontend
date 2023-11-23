import React, { useEffect, useState } from 'react'
import { QuizService } from '../../services/QuizService';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import { SOCKET_BASE_URL } from '../../constants/apiConstants';
import { Button, Container, Header, Label, Segment } from 'semantic-ui-react';



export default function RealTimeQuizHost() {

  const navigate = useNavigate()

  const { quizId } = useParams()

  const [stompClient, setStompClient] = useState(null);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0)
  const [correctAnswerers, setCorrectAnswerers] = useState([])

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

    if (questionNo == questions.length - 1) {
      if (stompClient) {
        stompClient.send('/finish-quiz', {}, JSON.stringify(quizId));
        navigate("/finish-page-host")
      }
    }
    else {
      setQuestionNo((prevQuestionNo) => prevQuestionNo + 1);
      setCorrectAnswerers([])
    }
  }

  const previousQuestion = () => {
    if (questionNo != 0) {
      setQuestionNo((prevQuestionNo) => prevQuestionNo - 1);
      setCorrectAnswerers([])
    }
  }

  useEffect(() => {
    if (stompClient) {

      stompClient.send('/rt-quiz', {}, JSON.stringify(questions[questionNo].question.id));
      stompClient.subscribe('/topic/rt-quiz-correct-answerers/'
        + questions[questionNo].question.id,
        (user) => {
          setCorrectAnswerers((prevUsers => [...prevUsers, user.body]))
        });
    }
  }, [questions, questionNo])

  useEffect(() => {
    if (correctAnswerers) {
      setCorrectAnswerers(
        (prevUsers) =>
          prevUsers.filter((item, index) => prevUsers.indexOf(item) === index)
      )
    }
  }, [correctAnswerers])

  return (
    <div style={{ display: "block", flexDirection: "row" }}>

      <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%", flexDirection: "column" }}>
        {questions.length > 0 && <Segment placeholder>
          <Header size='large'>{questions[questionNo].question.title}</Header>
        </Segment>}
        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "10px" }}>
          <Button onClick={() => previousQuestion()} disabled={questionNo == 0}>Previous</Button>
          <Button primary onClick={() => nextQuestion()}>Next</Button>
        </div>
      </Container>

      {correctAnswerers.length > 0 &&
        <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%", flexDirection: "column" }}>
          <div><Label color='green'>Correct Answerers: </Label></div>
          {correctAnswerers.map((username) => <div style={{ marginTop: "2%" }}><Label basic>{username}</Label></div>)}
        </Container>}

    </div>
  )
}
