import { Card, Button, Badge } from "react-bootstrap";

import React from 'react'

const SinglePost = ({ post }) => {
    const { title, decription, url, status } = post
    const border = () => {
        switch (status) {
            case 'LEARNED':
                return 'success'
            case 'LEARNING':
                return 'warning'
            case 'TO LEARN':
                return 'danger'
            default:
                return 'success'
        }
    }
    return (
        <Card className="shadow" border={border()}>
            <Card.Header as="h5">{title}</Card.Header>
            <Card.Body>
                <Badge bg={border()} text="dark">
                    {status}
                </Badge>
                <Card.Title>{decription}</Card.Title>
                <Card.Text>
                    {url}
                </Card.Text>
                <Button>Chỉnh sửa</Button>
            </Card.Body>
        </Card>
    )
}

export default SinglePost