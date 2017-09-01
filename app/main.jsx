'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Root from './components/Root'
import {fetchCampuses, fetchStudents} from './reducers/index.jsx'

class Main extends Component {
  componentDidMount() {
    store.dispatch(fetchCampuses())
    store.dispatch(fetchStudents())
  }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

ReactDOM.render (
  <Main />,
  document.getElementById('main')
)
