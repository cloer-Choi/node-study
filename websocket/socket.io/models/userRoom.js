const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: 'UserRoom',
        tableName: 'users_rooms',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.UserRoom.belongsTo(db.User);
    db.UserRoom.belongsTo(db.Room);
    db.UserRoom.hasMany(db.Chat);
  }
};