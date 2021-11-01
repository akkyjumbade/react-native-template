import { Formik } from 'formik'
import React, { Fragment } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Container } from 'uikit'
import { FormControl } from 'uikit'
import { TextInput } from 'uikit'
import { Page, Text } from 'uikit'
import http, { server } from '../../utils/http'

const PostReportForm = ({ user, post, initialValues = {}, }) => {
   async function onFormSubmit(values, action) {

   }
   return (
      <Formik initialValues={initialValues} onSubmit={onFormSubmit} >
         {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Fragment>
               <FormControl>
                  <TextInput value={values.reason} onChangeText={handleChange('reason')} />
               </FormControl>
               <Text>{JSON.stringify(values)}</Text>
            </Fragment>
         )}
      </Formik>
   )
}

const PostReportScreen = ({ route: { params }, }) => {
   const { post } = params
   const { data: response, mutate, status } = useMutation(payload => {
      return server().post(`/api/v1/posts/${post.id}/post_reviews`, {
         _method: 'PATCH',
         ...post,
         ...payload
      })
   })
   return (
      <Page>
         <Text>PostReportScreen</Text>
         <Container>
            <PostReportForm />
         </Container>
         <Text>{JSON.stringify({ post })}</Text>
         <Text>{JSON.stringify({ response })}</Text>
      </Page>
   )
}

export default PostReportScreen
