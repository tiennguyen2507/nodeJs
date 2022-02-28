import React, { useState, useRef,useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import {PostContext} from '../../contexts/PostContext'

const PostAddEdit = (props) => {
    //constant validee
    const [validated, setValidated] = useState(false)
    const formAll = useRef()

    //constant data input
    const [dataInput, setdataInput] = useState({
        title: '', decription: '', url: '', status: ''
    })
    const { title, decription, url, status } = dataInput

    //constant PostContext
    const {addPost} = useContext(PostContext)



    //function onChangePostForm
    const onChangePostForm = (event) => setdataInput({
        ...dataInput,
        [event.target.name]: event.target.value
    })


    //funtion submit
    const submit = () => {
        setValidated(true)
        const validee = formAll.current.checkValidity()
        if (validee) {
            addPost(dataInput)
            props.onHide()
            props.refreshPost()
        }

    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Thêm bài Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form validated={validated} ref={formAll} >
                    <div className='pt-2'>
                        <Form.Label htmlFor="inputPassword5">Tiêu đề :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            name='title'
                            onChange={onChangePostForm}
                            value={title}
                        />
                    </div >
                    <div className='pt-2'>
                        <Form.Label htmlFor="inputPassword5">Đường dẫn :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            name='url'
                            onChange={onChangePostForm}
                            value={url}
                        />
                    </div>
                    <div className='pt-2'>
                        <Form.Label htmlFor="inputPassword5">Trạng thái :</Form.Label>
                        <Form.Select aria-label="Default select example" required name='status' value={status}
                            onChange={onChangePostForm}>
                            <option value="" >Lựa chọn trạng thái</option>
                            <option value="LEARED">LEARED</option>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARN">LEARN</option>
                        </Form.Select>
                    </div>
                    <div className='pt-2'>
                        <Form.Label htmlFor="inputPassword5">Mô tả :</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            name='decription'
                            onChange={onChangePostForm}
                            value={decription}
                        />
                    </div>
                </Form >
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submit}>Thêm bài post</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostAddEdit