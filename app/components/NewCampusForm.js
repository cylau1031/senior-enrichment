import React from 'react'
import {connect} from 'react-redux'
import {addNewCampus, writeNewCampusName, writeNewCampusImage, updateCampusDetails} from '../reducers/index'

function NewCampusForm(props) {
  return (
    <form className="form-horizontal center-block" onSubmit={(evt) => props.handleSubmit(evt, props.isNew, +props.id)}>
      <div className="form-group">
        <label>Name: </label>
        <input name="newCampusName" onChange={props.handleNameChange} value={props.newCampusNameInput} />
      </div>
      <div className="form-group">
        <label>Image URL: </label>
        <input name="newCampusImage" onChange={props.handleImageChange} value={props.newCampusImageInput} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-warning">Submit</button>
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    newCampusNameInput: state.newCampusNameInput,
    newCampusImageInput: state.newCampusImageInput
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNameChange(evt) {
      dispatch(writeNewCampusName(evt.target.value))
    },

    handleImageChange(evt) {
      dispatch(writeNewCampusImage(evt.target.value))
    },

    handleSubmit: (evt, isNew, id) => {
      evt.preventDefault()
      const name = evt.target.newCampusName.value
      const image = evt.target.newCampusImage.value
      if (isNew === 'true') {
        dispatch(addNewCampus({name, image}))
          .then(newCampus => ownProps.history.push(`/campuses/${newCampus.id}`))
      } else {
        dispatch(updateCampusDetails({name, image}, id))
      }
    }
  }
}

const NewCampusContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampusForm)
export default NewCampusContainer
