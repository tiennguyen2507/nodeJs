
export const authReducer = (state, action) => {
    const { type, payload: { isAutithenticated, user } } = action

    switch (type) {
        case 'SET_AUTH':
            return  {
                ...state,
                authLoading: false,
                isAutithenticated,
                user
            }


        default:
            return state
    }

}