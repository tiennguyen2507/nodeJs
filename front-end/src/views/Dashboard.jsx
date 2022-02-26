import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext';
// import { Spinner } from 'react-bootstrap';
import SinglePost from '../components/posts/SinglePost'
import { Row, Col, Container } from 'react-bootstrap';

const Dashboard = () => {
  const { postState: { Posts, postsLoading }, getPost } = useContext(PostContext)

  //getPost
  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(Posts, postsLoading)


  // spiner
  // const spinerComponent = (
  //   <div className='spinner-container'>
  //     <Spinner animation='border' variant='info'></Spinner>
  //   </div>
  // )



  return <Container>
    <Row className='mt-2 mb-2'>

      {Posts.map((value, index) => (
        <Col md={4} className='mt-2 mb-2' key={index}>
          <SinglePost post={value} />
        </Col>
      ))}
    </Row>
  </Container>;
};

export default Dashboard;
