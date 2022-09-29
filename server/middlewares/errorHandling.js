const notFound = (req, res, next) => {
  const error = new Error("Page not Found " + "" + req?.originalUrl);
  res?.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    messgae: err.message,
  });
  //   next();
};

module.exports = {
  notFound,
  errorHandler,
};
