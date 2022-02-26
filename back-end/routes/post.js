const express = require('express')
const Router = express.Router()

const portModule = require('../model/Post')

const verify = require('../middleware/auth')

// @route api/post
//@desc get post
//@access private
Router.get('/',verify,async (req, res) => {
   try {
    const Posts =await portModule.find({user:req.userID}).populate('user',['userName'])
    return res.json({
        success :true,
        Posts
    })
   } catch (error) {
    return res.json({
        success: false,
        message: "get post không thành công"
    })
   }
})

// @route api/post
//@desc create post
//@access private
Router.post('/', verify, async (req, res) => {
    const {title, decription, url, status} = req.body
    try {
        //validation
        if(!title) {
            return res.status(400).json({
                success: false,
                massage: 'title không được bỏ trống'
            })
        }

        const newPost = new portModule({
            title,
            decription,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status : status || 'TO LEARNED',
            user: req.userID
        })
        await newPost.save()

        return res.send({
            success: true,
            massage: 'Tạo post thành công!',
            port: newPost
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Tạo post không thành công"
        })
    }
    
})

// @route api/post
//@desc update post
//@access private
Router.put('/:id', verify, async (req, res) => {
   try {
    const {title, decription, url, status} = req.body
    if(!title) {
        return res.status(400).json({
            success: false,
            massage: 'title không được bỏ trống'
        })
    }

    const dataUpdate = {
        title,
        decription,
        url: url.startsWith('http://') ? url : `http://${url}`,
        status : status || 'TO LEARNED'
    }
    const postUpateCondition = {
        _id:req.params.id,
        user:req.userID
    }
    const update = await portModule.findOneAndUpdate(postUpateCondition,dataUpdate)


    if(!update) {
        return res.json({
            success: false,
            message: "Update post không thành công"
        })
    }
    res.send({
        success: true,
        data: update
    })
   } catch (error) {
    return res.json({
        success: false,
        message: "Update post không thành công"
    })
   }
})

// @route api/post
//@desc delete post
//@access private
Router.delete('/:id', verify ,async (req,res) => {
    try {
        const postDeleteCondition = {
            _id:req.params.id,
            user:req.userID
        }
        const deletePort =await portModule.findOneAndDelete(postDeleteCondition)
        console.log(deletePort)
        if(!deletePort) {
            return res.json({
                success: false,
                message: "Xóa post không thành công"
            })
        }
        res.send({
            success: true,
            message: "Xóa port thành công"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Xóa post không thành công"
        })
    }
})





module.exports = Router