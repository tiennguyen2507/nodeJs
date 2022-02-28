import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext';
// import { Spinner } from 'react-bootstrap';
import SinglePost from '../components/posts/SinglePost'
import { Row, Col, Container, Alert, Button } from 'react-bootstrap';
import PostAddEdit from '../components/posts/PostAddEdit';

const Dashboard = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { postState: { Posts }, getPost } = useContext(PostContext)

  //getPost
  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // spiner
  // const spinerComponent = (
  //   <div className='spinner-container'>
  //     <Spinner animation='border' variant='info'></Spinner>
  //   </div>
  // )
  return <Container>
    <Row className='mt-2 mb-2'>
      <Alert variant='info'>
        <Button onClick={() => setModalShow(true)}>Thêm bài post</Button>
      </Alert>
      {Posts.map((value, index) => (
        <Col md={4} className='mt-2 mb-2' key={index}>
          {value && <SinglePost post={value} />}
        </Col>
      ))}
    </Row>
    <PostAddEdit show={modalShow}
      onHide={() => setModalShow(false)}
      refreshPost = {() => getPost()}
       />
  </Container>;
};

export default Dashboard;
