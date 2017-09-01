import { combineReducers } from 'redux'
import axios from 'axios'


const initialState = {
  campuses: [],
  students: [],
  newCampusNameInput: '',
  newCampusImageInput: '',
  newStudentNameInput: '',
  newStudentEmailInput: '',
  newStudentCampusInput: 1,
  isEditting: false
}

//action types
const GET_CAMPUSES = 'GET_CAMPUSES'
const GET_STUDENTS = 'GET_STUDENTS'
const WRITE_NEW_CAMPUS_NAME = 'WRITE_NEW_CAMPUS_NAME'
const WRITE_NEW_CAMPUS_IMAGE = 'WRITE_NEW_CAMPUS_IMAGE'
const GET_NEW_CAMPUS = 'GET_NEW_CAMPUS'
const WRITE_NEW_STUDENT_NAME = 'WRITE_NEW_STUDENT_NAME'
const WRITE_NEW_STUDENT_EMAIL = 'WRITE_NEW_CAMPUS_EMAIL'
const WRITE_NEW_STUDENT_CAMPUS = 'WRITE_NEW_STUDENT_CAMPUS'
const GET_NEW_STUDENT = 'GET_NEW_STUDENT'
const SET_EDIT_VIEW = 'SET_EDIT_VIEW'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

//action creators
const getCampuses = campuses => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}
const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}
const getNewCampus = campus => {
  return {
    type: GET_NEW_CAMPUS,
    campus
  }
}
const getNewStudent = student => {
  return {
    type: GET_NEW_STUDENT,
    student
  }
}
export const setEditView = isEditting => {
  return {
    type: SET_EDIT_VIEW,
    isEditting
  }
}
const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}
const deleteCampus = campus => {
  return {
    type: DELETE_CAMPUS,
    campus
  }
}

const updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}
const deleteStudent = student => {
  return {
    type: DELETE_STUDENT,
    student
  }
}
export const writeNewCampusName = name => {
  return {
    type: WRITE_NEW_CAMPUS_NAME,
    name
  }
}
export const writeNewCampusImage = image => {
  return {
    type: WRITE_NEW_CAMPUS_IMAGE,
    image
  }
}
export const writeNewStudentName = name => {
  return {
    type: WRITE_NEW_STUDENT_NAME,
    name
  }
}
export const writeNewStudentEmail = email => {
  return {
    type: WRITE_NEW_STUDENT_EMAIL,
    email
  }
}
export const writeNewStudentCampus = campusId => {
  return {
    type: WRITE_NEW_STUDENT_CAMPUS,
    campusId
  }
}

//thunks
export const fetchCampuses = () => {
  return dispatch => {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export const fetchStudents = () => {
  return dispatch => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export const addNewCampus = campus => {
  return dispatch => {
    return axios.post('/api/campuses', campus)
      .then( res => res.data )
      .then( newCampus => {
        dispatch(getNewCampus(newCampus))
        dispatch(writeNewCampusName(''))
        dispatch(writeNewCampusImage(''))
        dispatch(setEditView(false))
        return newCampus
      })
      .catch(console.err)
  }
}

export const addNewStudent = (student) => {
  return dispatch => {
    return axios.post('/api/students', student)
      .then( res => res.data )
      .then( newStudent => {
        dispatch(getNewStudent(newStudent))
        dispatch(writeNewStudentName(''))
        dispatch(writeNewStudentEmail(''))
        dispatch(writeNewStudentCampus(1))
        dispatch(setEditView(false))
        return newStudent
      })
      .catch(console.error)
  }
}
export const updateCampusDetails = (campus, id) => {
  return dispatch => {
    return axios.put(`/api/campuses/${id}`, campus)
      .then( res => res.data )
      .then( updatedCampus => {
        dispatch(updateCampus(updatedCampus))
      })
      .catch(console.error)
  }
}
export const deleteCampusFromServer = campus => {
  return dispatch => {
    return axios.delete(`/api/campuses/${campus.id}`)
      .then( () => {
        dispatch(deleteCampus(campus))
      })
      .catch(console.error)
  }
}

export const updateStudentDetails = (student, id) => {
  return dispatch => {
    return axios.put(`/api/students/${id}`, student)
      .then( res => res.data )
      .then( updatedStudent => {
        dispatch(updateCampus(updatedStudent))
      })
      .catch(console.error)
  }
}
export const deleteStudentFromServer = student => {
  return dispatch => {
    return axios.delete(`/api/students/${student.id}`)
      .then( () => {
        dispatch(deleteStudent(student))
      })
      .catch(console.error)
  }
}

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students})
    case GET_NEW_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})
    case GET_NEW_STUDENT:
      return Object.assign({}, state, {students: [...state.students, action.student]})
    case WRITE_NEW_CAMPUS_NAME:
      return Object.assign({}, state, {newCampusNameInput: action.name})
    case WRITE_NEW_CAMPUS_IMAGE:
      return Object.assign({}, state, {newCampusImageInput: action.image})
    case WRITE_NEW_STUDENT_NAME:
      return Object.assign({}, state, {newStudentNameInput: action.name})
    case WRITE_NEW_STUDENT_EMAIL:
      return Object.assign({}, state, {newStudentEmailInput: action.email})
    case WRITE_NEW_STUDENT_CAMPUS:
      return Object.assign({}, state, {newStudentCampusInput: action.campusId})
    case SET_EDIT_VIEW:
      return Object.assign({}, state, {isEditting: action.isEditting})
    case UPDATE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.map(campus => {
        return action.campus.id === campus.id ? action.campus : campus
      })})
    case DELETE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => campus.id !== action.campus.id)})
    case UPDATE_STUDENT:
      return Object.assign({}, state, {students: state.students.map(student => {
        return action.student.id === student.id ? action.student : student
      })})
    case DELETE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== action.student.id)})
    default:
      return state
  }
};

export default rootReducer
