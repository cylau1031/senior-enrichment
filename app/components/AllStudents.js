import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {setEditView, deleteStudentFromServer} from '../reducers/index'
import NewStudentForm from './NewStudentForm'

const AllStudents = (props) => {
    return (
      <div>
        <h1 className="center-block">Students</h1>
        <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map( (student) => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td><NavLink to={`/students/${student.id}`} >{student.name}</NavLink></td>
                <td><button className="btn btn-primary" onClick={() => props.handleStudentDeleteClick(student)}>X</button></td>
              </tr>
          )})}
        </tbody>
        </table>
        <div className="center-block">
        <button className="btn btn-primary btn-lg " onClick={() => props.handleClick(props.isEditting)}>Add Student</button>
        {props.isEditting && <NewStudentForm isNew="true" history={props.history}/>}
        </div>
      </div>
    )
}

const mapStateToProps = state => {
  return {
    students: state.students,
    isEditting: state.isEditting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (bool) => {
      dispatch(setEditView(!bool))
    },
    handleStudentDeleteClick: (student) => {
      dispatch(deleteStudentFromServer(student))
    }
  }
}


const AllStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(AllStudents)

export default AllStudentsContainer

