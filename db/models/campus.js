'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const User = db.models.user

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  hooks: {
    beforeDestroy: (campus) => {
      User.destroy({
        where: {
          campusId: campus.id
        }
      })
    }
  }
})

