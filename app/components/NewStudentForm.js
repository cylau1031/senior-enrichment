import React from 'react'
import {connect} from 'react-redux'
import {addNewStudent, writeNewStudentName, writeNewStudentEmail, writeNewStudentCampus, updateStudentDetails} from '../reducers/index'

function NewStudentForm(props) {
  return (
    <form onSubmit={evt => props.handleSubmit(evt, props.isNew, +props.id)}>
      <label>Name:</label>
      <input name="newStudentName" onChange={props.handleNameChange} value={props.newStudentNameInput} />
      <label>Email:</label>
      <input name="newStudentEmail" onChange={props.handleImageChange} value={props.newStudentEmailInput} />
      <label>Campus:</label>
      <select name="newStudentCampus" onChange={props.handleCampusChange} value={props.newStudentCampusInput}>
        {props.campuses.map((campus) => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    newStudentNameInput: state.newStudentNameInput,
    newStudentEmailInput: state.newStudentEmailInput,
    newStudentCampusInput: state.newStudentCampusInput
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNameChange: (evt) => {
      dispatch(writeNewStudentName(evt.target.value))
    },

    handleImageChange: (evt) => {
      dispatch(writeNewStudentEmail(evt.target.value))
    },

    handleCampusChange: (evt) => {
      dispatch(writeNewStudentCampus(+evt.target.value))
    },

    handleSubmit: (evt, isNew, id) => {
      evt.preventDefault()
      const name = evt.target.newStudentName.value
      const email = evt.target.newStudentEmail.value
      const campusId = +evt.target.newStudentCampus.value
      if (isNew === 'true') {
        dispatch(addNewStudent({name, email, campusId}))
          .then(newStudent => ownProps.history.push(`/students/${newStudent.id}`))
      } else {
        dispatch(updateStudentDetails({name, email, campusId}, id))
      }
    }
  }
}

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudentForm)
export default NewStudentContainer
