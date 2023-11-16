import React, { useEffect, useState } from 'react'
import { Button, Container, Icon, Table, Header } from 'semantic-ui-react'
import { QuizService } from '../services/QuizService'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function MyQuizzes() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {

        let quizService = new QuizService()
        quizService.getAllByUserId(localStorage.getItem("id"))
            .then(result => {
                setQuizzes(result.data.data)
            });

    }, [])


    return (
        <Container style={{ display: "flex", justifyContent: "center", marginTop: "5%", flexDirection: "column" }}>
            {quizzes ? <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Creation Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {quizzes.map((quiz) => (<Table.Row key={quiz.id}>
                        <Link to={`/quiz/${quiz.id}`}>
                            <Table.Cell>
                                <Header>
                                    <Header.Content>{quiz.title}</Header.Content>
                                    <Header.Subheader>{quiz.description}</Header.Subheader>
                                </Header>
                            </Table.Cell>
                        </Link>
                        <Table.Cell>{quiz.creationDate}</Table.Cell>
                    </Table.Row>))}
                </Table.Body>
            </Table> : <p>Quiziniz Yoxdur</p>}
            <div><Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
                onClick={() => navigate("/add-quiz")}
            >
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="33" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </Icon> Add Quiz
            </Button></div>
        </Container>
    )
}
