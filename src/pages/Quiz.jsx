import React, { useEffect, useState } from 'react'
import { QuizService } from '../services/QuizService';
import { useParams } from 'react-router-dom';
import { Button, Container, Table } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {

  const { quizId } = useParams()

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {

    let quizService = new QuizService()
    quizService.getById(quizId).then(result => {
      setQuiz(result.data.data.quiz)
      setQuestions(result.data.data.questions)
    })


  }, []);

  return (
    <Container style={{ display: "flex", justifyContent: "center", marginTop: "2%", flexDirection: "column" }}>
      <div><h2>Title: {quiz.title}</h2></div>
      <div style={{ color: "grey" }}><h3>{quiz.description}</h3></div>
      <div style={{ color: "green" }}><h3>ID: {quiz.id}</h3></div>

      <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%", flexDirection:"column"}}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Correct Answer</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            {questions.map((question) =>
              <Table.Row>
                <Table.Cell>
                  {question.question.title}
                </Table.Cell>
                <Table.Cell>
                  {question.correctAnswer}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Button circular primary  onClick={()=>navigate("/rt-quiz-host/"+quiz.id)}>Start</Button>
      </Container>
    </Container>
  )
}
