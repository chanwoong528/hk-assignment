const db = require("../models");

const ArticleOrder = db.articleOrder;
const Article = db.articles;

const CustomError = require('../utils/exceptions/CustomError')


const { getSingleArticle } = require('./articleService')

//order param {
//   "id": UUID //order id, 
//   "articleId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
//   "order": number
// }

const createOrUpdateOrder = async (orderParam) => {
  try {

    const targetArticle = await getSingleArticle(orderParam.articleId)
    if (!targetArticle) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    const newOrder = await ArticleOrder.upsert(orderParam);
    return newOrder[0];
  } catch (error) {
    throw error
  }
};

const getOrders = async () => {
  try {
    const orders = await ArticleOrder.findAll({
      include: [{ model: Article }]
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

const deleteOrder = async (id) => {
  try {
    const order = await ArticleOrder.findByPk(id);
    if (!order) {
      throw new CustomError("NotFoundError", "result not found in database");
    }
    await order.destroy();
    return order;
  } catch (error) {
    throw error;
  }
}




module.exports = {
  createOrUpdateOrder,
  getOrders,
  deleteOrder
}