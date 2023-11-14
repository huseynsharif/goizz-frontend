import React, { useEffect, useState } from 'react'
import { QuizService } from '../services/QuizService';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';

export default function Quiz() {

  const { quizId } = useParams()

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);


  useEffect(() => {

    let quizService = new QuizService()
    quizService.getById(quizId).then(result => {
      setQuiz(result.data.data.quiz)
      setQuestions(result.data.data.questions)

      console.log(result.data);
    })


  }, []);

  return (
    <Container style={{ display: "flex", justifyContent: "center", marginTop: "2%", flexDirection: "column" }}>
      <div><h2>Title: {quiz.title}</h2></div>
      <div style={{ color: "grey" }}><h3>{quiz.description}</h3></div>

      <Container style={{ display: "flex", width: "500px", alignContent: "center", marginTop: "2%" }}>
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
      </Container>
    </Container>
  )
}
