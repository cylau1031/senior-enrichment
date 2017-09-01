import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setEditView, writeNewStudentCampus, writeNewStudentEmail, writeNewStudentName, deleteStudentFromServer} from '../reducers/index'
import NewStudentForm from './NewStudentForm'

function SingleStudent(props) {
  const id = +props.match.params.studentId
  const selectedStudent = props.students.find(student => student.id === id)

  return (
    <div>
    { selectedStudent
      ? (
      <div>
        <h1>{selectedStudent.name}</h1>
        <Link to={`/campuses/${selectedStudent.campusId}`}><h3>{selectedStudent.campus.name}</h3></Link>
        <button
        className="btn btn-default btn-xs"
        onClick={() => props.handleDeleteClick(selectedStudent)}>X
        </button>
      </div>
      )
      : <div>NOT FOUND</div>
    }
    <button onClick={() => props.handleNewStudentClick(props.isEditting, selectedStudent)}>Edit Student</button>
    {props.isEditting && <NewStudentForm isNew="false" id={`${selectedStudent.id}`} history={props.history} />}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    students: state.students,
    isEditting: state.isEditting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNewStudentClick: (bool, currentStudent) => {
      dispatch(writeNewStudentName(currentStudent.name))
      dispatch(writeNewStudentEmail(currentStudent.email))
      dispatch(writeNewStudentCampus(currentStudent.campus.id))
      dispatch(setEditView(!bool))
    },
    handleDeleteClick: (student) => {
      dispatch(deleteStudentFromServer(student))
        .then( () => ownProps.history.push('/students'))
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
export default SingleStudentContainer
