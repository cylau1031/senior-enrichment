//DOESNT WORK//

const db = require('./db/index.js')
const User = db.models.user
const Campus = db.models.campus
const bluebird = require('bluebird')

const campuses = [{
  name: 'Grace Hopper',
  image: 'http://lorempixel.com/300/300/'
}, {
  name: 'FullStack',
  image: 'http://lorempixel.com/300/300/'
}, {
  name: 'WDF',
  image: 'http://lorempixel.com/300/300/'
}];

const students = [{
  name: 'James',
  email: 'james@james.com',
  campuses: campuses[1]
}, {
  name: 'Maria',
  email: 'maria@maria.com',
  campuses: campuses[1]
}, {
  name: 'Kenta',
  email: 'kenta@kenta.com',
  campuses: campuses[2]
}, {
  name: 'Sam',
  email: 'sam@sam.com',
  campuses: campuses[3]
}];


const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');

        return bluebird.map(students, student => {
          return User.create(student, {
            include: Campus

        })
      })
    })
    .then( () =>{
      console.log('done seeding')
    })
    .catch( (err) => {
      console.log('OH NO AN ERROR HAPPENED:', err.message, err.callstack)
    })
};

main();
