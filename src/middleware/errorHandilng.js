const { errorMsg, errorName } = require("../utils/errorMiddleware");

exports.errorHandling = (err, req, res, next) => {

  if (err?.name === errorName.BAD_REQUEST) {
    res.status(400).json({
      message: err?.message ?? "Bad Request",
    });
    return;
  }

  if (err?.name === errorName.NOT_FOUND) {
    res.status(404).json({
      message: err?.message ?? "Not Found",
    });
    return;

  }
  console.log(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected Error from server",
  });
};
