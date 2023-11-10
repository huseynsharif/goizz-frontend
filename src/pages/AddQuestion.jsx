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
                correctAnswers: ""
            },
            validationSchema: Yup.object({
                title: Yup.string().required("Required"),
                correctAnswers: Yup.string().required("Required")
            }),
            onSubmit: (values) => {
                console.log(values);
                values.quizId = parseInt(localStorage.getItem('quizId'))
                let questionService = new QuestionService()
                
                questionService.add(values).then(result => {
                    setData(result.data);
                    setShowAddQuestion(true)
                }).catch(err => console.log(err))
            }
        }
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <Form onSubmit={formik.handleSubmit}>
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
                        id='correctAnswers'
                        onChange={formik.handleChange}
                        value={formik.values.correctAnswers}
                        onBlur={formik.handleBlur}
                    />
                </Form.Field>
                <Button
                    style={{ display: showAddQuestion && "none" }}
                    primary
                    type='submit'
                >Add Question</Button>
            </Form>
            <p>{formik.errors.correctAnswers}</p>
            {showAddQuestion && <AddQuestion />}
        </div>
    )
}
