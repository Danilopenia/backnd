

export default (error, req, res, next) => {
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
    console.log(error.message);
  } else {
    console.log(error.message);
  }
  return res.json({
    statusCode: error.statusCode,
    url: `${req.method} ${req.url}`,
    message: error.message,
  });
};