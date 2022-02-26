export const  postReducer = (state,action) => {
    const {type, payload} = action
    switch (type) {
        case 'POST_LOADED_SUCCESS':
            return {
                ...state,
                Posts :payload,
                postsLoading: false
            }

        case 'POST_LOADED_FAIL':
            return {
                ...state,
                Posts :[],
                postsLoading: false
            }
        default: 
            return state
    }


}