const dbConfig = require('../config/db.config.js');
console.log(dbConfig)

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Article = require("./article.model.js")(sequelize, Sequelize);
const ArticleOrder = require("./articleOrder.model.js")(sequelize, Sequelize);
db.articles = Article
db.articleOrder = ArticleOrder

ArticleOrder.belongsTo(Article, {
  foreignKey: 'articleId'
});


module.exports = db;