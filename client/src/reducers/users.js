const usersReducer = (states = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload;
        case 'UPDATE_CURRENT_USER':
            return states.map((state) => state._id === action.payload._id ? action.payload : state);
        // case 'UPDATE_USER_IMAGE':
        //     return states.map((state) =>
        //         state._id === action.payload._id ? { ...state, profilePicture: action.payload.imageUrl } : state);
        default:
            return states;
    }
}

export default usersReducer;