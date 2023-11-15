import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'


export default function JoinQuiz() {
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            roomId: ""
        },
        validationSchema: Yup.object({
            roomId: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            navigate("/rt-quiz-client/"+values.roomId)
        }

    });

    return (
        <div><Container style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "200px" }}>
            <Form onSubmit={formik.handleSubmit} style={{ width: "400px" }} >

                <Form.Field>
                    <label>Room Id</label>
                    <input
                        id='roomId'
                        placeholder='Please enter the room id'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.roomId}
                        onBlur={formik.handleBlur}
                    />
                </Form.Field>
                <Form.Field inline>
                    {formik.touched.roomId && formik.errors.roomId ? <Label pointing basic color='red' mini>{formik.errors.roomId}</Label> : null}
                </Form.Field>
                <Button type='submit' primary disabled={!formik.values.roomId}>Join</Button>

            </Form>

        </Container></div>
    )
}
