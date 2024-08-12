//@ts-nocheck
const RESPONSE_CODE = require("../utils/CONSTANT/RESPONSE_CODE");
const ERROR_CODE = require("../utils/CONSTANT/ERROR_CODE");

const {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require("../service/articleService");

const expressRouter = require("express");

const router = new expressRouter.Router();

router.get("/", (req, res) => {
  let { articleId } = req.query;
  if (!!articleId) {
    getSingleArticle(articleId).then((result) => {
      return res
        .status(RESPONSE_CODE["retrieve"](result).code)
        .send(RESPONSE_CODE["retrieve"](result));
    }).catch((error) => {
      console.warn(error);
      return res
        .status(ERROR_CODE[error.name].code)
        .send(ERROR_CODE[error.name]);
    })
    return;
  }

  getArticles().then((result) => {
    return res
      .status(RESPONSE_CODE["retrieve"](result).code)
      .send(RESPONSE_CODE["retrieve"](result));
  }).catch((error) => {
    console.warn(error);
    return res
      .status(ERROR_CODE[error.name].code)
      .send(ERROR_CODE[error.name]);
  })
});

router.post("/", (req, res) => {
  console.log(req.body)
  createArticle(req.body).then((result) => {
    return res
      .status(RESPONSE_CODE["created"](result).code)
      .send(RESPONSE_CODE["created"](result));
  }).catch((error) => {
    console.warn(error);
    return res
      .status(ERROR_CODE[error.name].code)
      .send(ERROR_CODE[error.name]);
  });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  updateArticle(id, {
    title,
    content,
    published,
  }).then((result) => {
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  deleteArticle(id).then((result) => {
    return res
      .status(RESPONSE_CODE["delete"](result).code)
      .send(RESPONSE_CODE["delete"]());
  }).catch((error) => {
    console.warn(error);
    return res
      .status(ERROR_CODE[error.name].code)
      .send(ERROR_CODE[error.name]);
  });
})

module.exports = router;