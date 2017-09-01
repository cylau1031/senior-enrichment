import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setEditView, writeNewCampusName, writeNewCampusImage, deleteCampusFromServer, deleteStudentFromServer} from '../reducers/index'
import NewCampusForm from './NewCampusForm'

function SingleCampus(props) {
  const id = +props.match.params.campusId
  const selectedCampus = props.campuses.find(campus => campus.id === id)
  const selectedStudents = props.students.filter(student => student.campusId == id)

  return (
    <div>
    { selectedCampus
      ? (
      <div>
        <div className="center-block">
          <h1>{selectedCampus.name}</h1>
          <button className="btn btn-default btn-xs btn-warning" onClick={() => props.handleCampusDeleteClick(selectedCampus)}>X</button><br />
          <img className="campus" src={selectedCampus.image} />

        </div>
        <div className="center-block">
        <button className="btn btn-primary" onClick={() => props.handleNewCampusClick(props.isEditting, selectedCampus)}>Edit Campus</button>
        {props.isEditting && <NewCampusForm isNew="false" id={`${selectedCampus.id}`} history={props.history}/>}
      </div>

        <hr></hr>
        <div className="center-block">
          <h2>STUDENTS</h2>
          <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedStudents.length > 0 && selectedStudents.map(student => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td><Link to={`/students/${student.id}`} ><h2>{student.name}</h2></Link></td>
                  <td><button className="btn btn-primary" onClick={() => props.handleStudentDeleteClick(student)}>X</button></td>
                </tr>
              )
            })}
          </tbody>
          </table>

        </div>
      </div>
      )
      : <div>CAMPUS NOT FOUND</div>
    }

    </div>
  )
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
    isEditting: state.isEditting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNewCampusClick: (bool, currentCampus) => {
      dispatch(writeNewCampusName(currentCampus.name))
      dispatch(writeNewCampusImage(currentCampus.image))
      dispatch(setEditView(!bool))
    },
    handleCampusDeleteClick: (campus) => {
      dispatch(deleteCampusFromServer(campus))
        .then( () => ownProps.history.push('/campuses'))
    },
    handleStudentDeleteClick: (student) => {
      dispatch(deleteStudentFromServer(student))
    }
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus)

export default SingleCampusContainer
