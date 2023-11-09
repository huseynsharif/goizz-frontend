import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { QuestionService } from '../services/QuestionService';


export default function AddQuestion() {

    const [showAddQuestion, setShowAddQuestion] = useState(false)
    const [data, setData] = useState({ success: true, message: "", data: {} })
    const navigate = useNavigate()


    const formik = useFormik(
        {
            initialValues: {
                title: "",
                correctAnswer: ""
            },
            validationSchema: Yup.object({
                title: Yup.string().required("Required"),
                correctAnswer: Yup.string().required("Required")
            }),
            onSubmit: (values) => {
                values.quizId = localStorage.getItem('quizId')
                let questionService = new QuestionService()
                questionService.add(values).then(result => {
                    setData(result.data);
                }).catch(err => console.log(err))
            }
        }
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <Form>
                <Form.Field>
                    <label>Title</label>
                    <input type='text'
                        id='title'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Correct answer</label>
                    <input type='text'
                        id='correctAnswer'
                        onChange={formik.handleChange}
                        value={formik.values.correctAnswer}
                        onBlur={formik.handleBlur}
                    />
                </Form.Field>
                <Button
                    style={{ display: showAddQuestion && "none" }}
                    primary
                    onClick={() => setShowAddQuestion(true)}
                >Add Question</Button>
            </Form>
            {showAddQuestion && <AddQuestion />}
        </div>
    )
}
