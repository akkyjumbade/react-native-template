import React from 'react'
import { useQuery } from 'react-query'
import { Page, Text } from 'uikit'
import http from '../../utils/http'

const PostReviewsScreen = ({ route: { params }, }) => {
   const { post } = params
   const { data: reviews, isLoading, } = useQuery(`post_review_${post.id}`, async () => {
      return await http.get(`/api/v1/posts/${post.id}/post_reviews`)
   })
   return (
      <Page>
         <Text>PostReviewsScreen</Text>
         <Text>{JSON.stringify({ post })}</Text>
         <Text>{JSON.stringify({ reviews })}</Text>
      </Page>
   )
}

export default PostReviewsScreen
