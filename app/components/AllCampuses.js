import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {setEditView} from '../reducers/index'
import NewCampusForm from './NewCampusForm'


const AllCampuses = (props) => {
    return (
      <div>
        <img className="col-lg-12 header-img" src="/images/banner.jpg" />
        {props.campuses.map( (campus) => {
          return (
            <div className="col-lg-6 center-block campus" key={campus.id} >
              <NavLink to={`/campuses/${campus.id}`}>
                <img className="img-responsive center-block" src={`${campus.image}`} style={{height: '70%', width: '70%' }}/>
                <h3>{campus.name}</h3>
              </NavLink>
            </div>
          )
        })}
        <div className="center-block">
        <button className="btn btn-primary btn-lg" onClick={() => props.handleClick(props.isEditting)}>Add Campus</button>
        {props.isEditting && <NewCampusForm isNew="true" history={props.history} />}
        </div>
      </div>
    )
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    isEditting: state.isEditting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (bool) => {
      dispatch(setEditView(!bool))
    }
  }
}


const AllCampusesContainer = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default AllCampusesContainer

