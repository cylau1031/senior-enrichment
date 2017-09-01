'use strict'
const api = require('express').Router()
const db = require('../db')
const User = db.models.user
const Campus = db.models.campus

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!


/* CAMPUS ROUTES */

api.param('campusId', (req, res, next, campusId) => {
	Campus.findById(campusId)
		.then(campus => {
			//not found
			if(campus === null) {
				let err = new Error('CAMPUS NOT FOUND')
				err.status = 404
				next(err)
			} else {
				req.campus = campus
				next()
			}
		})
		.catch(next)
})

//GET all campuses
api.get('/campuses', (req, res, next) => {
	Campus.findAll({
		include: {
			model: User
		}
	})
		.then(campuses => res.send(campuses))
		.catch(next)
})

//GET a campus by id
api.get('/campuses/:campusId', (req, res, next) => {
	res.send(req.campus)
})

//POST a new campus
api.post('/campuses', (req, res, next) => {
	//createOrFind?
	Campus.create(req.body)
		.then(newCampus => res.status(201).send(newCampus))
		.catch(next)
})

//PUT updated campus info for one campus
api.put('/campuses/:campusId', (req, res, next) => {
	console.log(req.body)
	req.campus.update(req.body)
		.then((updatedCampus) => res.status(200).send(updatedCampus))
		.catch(next)
})

//DELETE a campus
api.delete('/campuses/:campusId', (req, res, next) => {
	req.campus.destroy()
		.then( () => res.sendStatus(200) )
		.catch(next)
})


/* STUDENT ROUTES */

api.param('studentId', (req, res, next, studentId) => {
	User.findOne({
		where: {
			id: studentId
		},
		include: {
			model: Campus
		}
	})
		.then(student => {
			if(student === null) {
				let err = new Error('CAMPUS NOT FOUND')
				err.status = 404
				next(err)
			} else {
				req.student = student
				console.log(req.student)
				next()
			}
		}
		)
})

//GET all students
api.get('/students', (req, res, next) => {
	User.findAll({
		include: [{
			model: Campus
		}]
	})
		.then(students => res.send(students))
		.catch(next)
})

//GET a student by id
api.get('/students/:studentId', (req, res, next) => {
	res.send(req.student)
})

//POST a new student
api.post('/students', (req, res, next) => {
	//find or create?

	User.create({
		name: req.body.name,
		email: req.body.email
	}, {
		include: [Campus]
	})
	.then(newStudent => {
		return newStudent.setCampus(req.body.campusId)
	})
	.then(updatedStudent => {
		return updatedStudent.getCampus()
		.then(campus => {
			updatedStudent.campus = campus
			return updatedStudent
		})
	})
	.then(newUpdatedStudent => {
		console.log(newUpdatedStudent)
		res.send(newUpdatedStudent)
	})
	// .then(updatedStudent => {
	// 	return updatedStudent.getCampus()
	// })
	// .then(stud => {

	// })
	.catch(next)
})

//PUT updated student info for one student
api.put('/students/:studentId', (req, res, next) => {
	req.student.update(req.body)
		.then( (updatedStudent) => res.status(200).send(updatedStudent) )
		.catch(next)
})

//DELETE a studet
api.delete('/students/:studentId', (req, res, next) => {
	console.log('trying to delete something from server')
	req.student.destroy()
		.then( () => res.sendStatus(200) )
		.catch(next)

})

module.exports = api
