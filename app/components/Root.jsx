import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import NotFound from './NotFound'

export default () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={AllCampuses} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route path="/students/:studentId" component={SingleStudent} />
          <Route component={NotFound}></Route>
        </Switch>
        <footer className="footer center-block">
          <h1>MONSTER UNIVERSITY</h1>
        </footer>
      </div>
    </Router>
  )
}



