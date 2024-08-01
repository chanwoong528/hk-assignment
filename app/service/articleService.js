
const db = require("../models");
const CustomError = require('../utils/exceptions/CustomError')
const Article = db.articles;

const createArticle = async (articleParam) => {
  try {
    const newArticle = await Article.create(articleParam);
    return newArticle.dataValues;
  } catch (error) {
    throw error
  }
}
const getArticles = async () => {
  try {
    const articles = await Article.findAll();
    return articles;
  } catch (error) {
    throw error;
  }
}
const getSingleArticle = async (id) => {
  try {
    const article = await Article.findByPk(id);
    return article;
  } catch (error) {
    throw error;
  }
}
const updateArticle = async (id, articleParam) => {
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    await article.update(articleParam);
    return article;
  } catch (error) {
    console.log(error)
    throw error;
  }
}



module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle
}