const ArticleOrder = require('./articleOrder.model')
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT,
    },
    url: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

  return Article
};