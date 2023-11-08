import React, { useState } from 'react'
import { Container, Label } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { QuizService } from '../services/QuizService';


export default function AddQuiz() {

  const navigate = useNavigate()
  const [data, setData] = useState({ success: true, message: "", data: {} })


  const formik = useFormik(
    {
      initialValues: {
        name: "",
        description: ""
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Required"),
        description: Yup.string()
      }),
      onSubmit: (values) => {
        let quizService = new QuizService()
        quizService.add(values).then(result => {
          setData(result.data);
          if (result.data.success) {
            // navigate("/homepage")
          }
        }).catch(err => console.log(err))
      }
    }
  )

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input fluid label='Name' placeholder='Name'
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? <Label pointing color='red' basic>{formik.errors.name}</Label> : null}

        <Form.TextArea label='Description (optional)' placeholder='Write about the quiz...'
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? <Label pointing color='red' basic>{formik.errors.description}</Label> : null}

        <Form.Button primary>Create</Form.Button>
      </Form>
    </Container>
  )
}
