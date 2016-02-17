'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    commentAuthor: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER,
    commentText: { 
    type: DataTypes.TEXT,
    validate: {
      len: [20, 200] 
    }
  }  
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};