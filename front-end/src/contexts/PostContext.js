import { createContext, useReducer } from "react";
import { postReducer } from "../reducer/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    //state
    const [postState,dispatch] = useReducer(postReducer, {
        Posts : [],
        postsLoading: true
    })
    
    //get all post 
        const getPost = async() => {
            try {
               const getPosts = await axios.get(`${apiUrl}/posts`)
               if(getPosts.data.success) {
                   dispatch({
                       type:'POST_LOADED_SUCCESS',
                       payload: getPosts.data.Posts
                   })
               } 
            } catch (error) {
                dispatch({
                    type:'POST_LOADED_FAIL'
                })

                return error.response.data ? error.response.data : {
                    success:false,
                    message:'error'
                }
            }
        } 
    //addPost
    const addPost = async(data) => {
        try {
            const addPost = await axios.post(`${apiUrl}/posts`,data)
            return addPost.dataa
        } catch (error) {
            dispatch({
                type:'POST_LOADED_FAIL'
            })

            return error.response.data ? error.response.data : {
                success:false,
                message:'error'
            }
        }
    }
    const postProviderData = {postState,getPost,addPost}
    return (
        <PostContext.Provider value={postProviderData}>
            {children}
        </PostContext.Provider>
    )
}




export default PostContextProvider

