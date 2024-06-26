import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updateData)
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const updateProfilepic = (id, profilePicture) => async (dispatch) => {
    try {
        const response = await api.updateProfilepic(id, profilePicture);
        
        // console.log(response);
        profilePicture = response.data.profilePicture;
        console.log(response.data.profilePicture);
        // const { data } = await api.updateProfile(id, updateData)
        dispatch({ type: 'UPDATE_USER_IMAGE', payload: profilePicture})
    } catch (error) {
        console.log(error);
    }
}