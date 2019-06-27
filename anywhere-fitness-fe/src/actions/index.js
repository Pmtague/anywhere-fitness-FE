import { axiosWithAuth } from "../utils/axiosWithAuth";
import cookie from 'react-cookies';

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const register = user => dispatch => {
    dispatch({ type: REGISTER_START });
    return axiosWithAuth()
        .post("/register", user)
        .then(res => {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
            return true;
        })
        .catch(err => {
            dispatch({ type: REGISTER_FAILURE, payload: err.response })
        });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const login = credentials => dispatch => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
        .post("/login", credentials)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            cookie.save('instructor', res.data.instructor)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.instructor
            });
            return true;
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAILURE,
                payload: err.response.data
            });
        });
};

export const isLoggedIn = instructor => dispatch => {
    dispatch({ type: LOGIN_SUCCESS, payload: instructor });
}

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem("token");
    cookie.remove('instructorId')
}

export const GETALLCLASSES_BYINSTRUCTOR_START = "GETALLCLASSES_BYINSTRUCTOR_START";
export const GETALLCLASSES_BYINSTRUCTOR_SUCCESS = "GETALLCLASSES_BYINSTRUCTOR_SUCCESS";
export const GETALLCLASSES_BYINSTRUCTOR_FAILURE = "GETALLCLASSES_BYINSTRUCTOR_FAILURE";
export const getAllClassesByInstructor = instructorId => dispatch => {
    dispatch({ type: GETALLCLASSES_BYINSTRUCTOR_START });
    axiosWithAuth()
        .get(`https://anywhere-fitness-azra-be.herokuapp.com/api/instructors/${instructorId}/classes`)
        .then(res => {
            dispatch({
                type: GETALLCLASSES_BYINSTRUCTOR_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GETALLCLASSES_BYINSTRUCTOR_FAILURE,
                payload: err.response.data
            })
        })
}

export const CREATE_CLASS_START = "CREATE_CLASS_START";
export const CREATE_CLASS_SUCCESS = "CREATE_CLASS_SUCCESS";
export const CREATE_CLASS_FAILURE = "CREATE_CLASS_FAILURE";
export const createClass = singleClass => dispatch => {
    dispatch({ type: CREATE_CLASS_START });
    return axiosWithAuth()
        .post(`https://anywhere-fitness-azra-be.herokuapp.com/api/classes`, singleClass)
        .then(res => {
            dispatch({
                type: CREATE_CLASS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: CREATE_CLASS_FAILURE,
                payload: err.response.data.message
            })
        })
}

export const GETCLASS_BYID_START = "GETCLASS_BYID_START";
export const GETCLASS_BYID_SUCCESS = "GETCLASS_BYID_SUCCESS";
export const GETCLASS_BYID_FAILURE = "GETCLASS_BYID_FAILURE";
export const getClassByInstructor = classId => dispatch => {
    dispatch({ type: GETCLASS_BYID_START });
    axiosWithAuth()
        .get(`https://anywhere-fitness-azra-be.herokuapp.com/api/classes/${classId}`)
        .then(res => {
            dispatch({
                type: GETCLASS_BYID_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GETCLASS_BYID_FAILURE,
                payload: err.response.data
            })
        })
}

export const UPDATE_INSTRUCTOR_CLASS_START = "UPDATE_INSTRUCTOR_CLASS_START";
export const UPDATE_INSTRUCTOR_CLASS_SUCCESS = "UPDATE_INSTRUCTOR_CLASS_SUCCESS";
export const UPDATE_INSTRUCTOR_CLASS_FAILURE = "UPDATE_INSTRUCTOR_CLASS_FAILURE";
export const updateClass = (classId, singleClass) => dispatch => {
    dispatch({ type: UPDATE_INSTRUCTOR_CLASS_START });
    axiosWithAuth()
        .put(`https://anywhere-fitness-azra-be.herokuapp.com/api/classes/${classId}`, singleClass)
        .then(res => {
            dispatch({
                type: UPDATE_INSTRUCTOR_CLASS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: UPDATE_INSTRUCTOR_CLASS_FAILURE,
                payload: err.response.data.message
            })
        })
}

export const DELETE_INSTRUCTOR_CLASS_START = "DELETE_INSTRUCTOR_CLASS_START"
export const DELETE_INSTRUCTOR_CLASS_SUCESS = "DELETE_INSTRUCTOR_CLASS_SUCESS"
export const DELETE_INSTRUCTOR_CLASS_FAILURE = "DELETE_INSTRUCTOR_CLASS_FAILURE"
export const deleteClass = (classId, singleClass) => dispatch => {
    dispatch({ type: DELETE_INSTRUCTOR_CLASS_START });
    axiosWithAuth()
        .delete(`https://anywhere-fitness-azra-be.herokuapp.com/api/classes/${classId}`, singleClass)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}