//@ts-nocheck

const RESPONSE_CODE = require("../utils/CONSTANT/RESPONSE_CODE");
const ERROR_CODE = require("../utils/CONSTANT/ERROR_CODE");

const {
  createOrUpdateOrder,
  getOrders,
  deleteOrder
} = require("../service/orderService");

const expressRouter = require("express");

const router = new expressRouter.Router();

router.post("/", (req, res) => {
  createOrUpdateOrder(req.body)
    .then((result) => {
      return res
        .status(RESPONSE_CODE["patch"](result).code)
        .send(RESPONSE_CODE["patch"](result));
    }).catch((error) => {
      console.warn(error);
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });
})



// {articleId:string, order:number} [] = orderEditList
router.patch("/", async (req, res) => {
  try {
    const orderEditList = req.body;
    const promises = await orderEditList.map((order) => createOrUpdateOrder(order));


    const result = await Promise.all(promises);
    return res
      .status(RESPONSE_CODE["patch"](result).code)
      .send(RESPONSE_CODE["patch"](result));

  } catch (error) {
    return res
      .status(ERROR_CODE[error.name].code)
      .send(ERROR_CODE[error.name]);
  }





  Promise.all(promises)
    .then((result) => {
      console.log(result)
      return res
        .status(RESPONSE_CODE["patch"](result).code)
        .send(RESPONSE_CODE["patch"](result));
    }).catch((error) => {
      console.warn(error);
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    });

})


router.get("/", (req, res) => {
  getOrders().then((result) => {
    return res
      .status(RESPONSE_CODE["retrieve"](result).code)
      .send(RESPONSE_CODE["retrieve"](result));
  }).catch((error) => {
    console.warn(error);
    return res
      .status(ERROR_CODE[error.name].code)
      .send(ERROR_CODE[error.name]);
  })
})

router.delete("/:id", (req, res) => {
  deleteOrder(req.params.id)
    .then((result) => {
      return res
        .status(RESPONSE_CODE["delete"]().code)
        .send(RESPONSE_CODE["delete"]());
    }).catch((error) => {
      console.warn(error);
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    })

})


module.exports = router;