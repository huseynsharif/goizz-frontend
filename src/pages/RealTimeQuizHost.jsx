import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { QuizService } from '../services/QuizService';
import { useParams } from 'react-router-dom';

export default function RealTimeQuizHost() {

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
        <div>RealTimeQuizHost</div>
    )
}
