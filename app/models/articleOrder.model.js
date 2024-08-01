

module.exports = (sequelize, Sequelize) => {
  const ArticleOrder = sequelize.define("articleOrder", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    articleId: {
      type: Sequelize.UUID,
    },
    order: {
      type: Sequelize.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["articleId"],
      },
      // {
      //   unique: true,
      //   fields: ["order"], // Whatever other field you need to make unique
      // },
    ],
  });

  return ArticleOrder
};