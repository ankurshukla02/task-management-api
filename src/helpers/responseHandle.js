const responseCode = require('./responseCode');
const responseMessage = require('./responseMessage');

module.exports = {
  responseWithoutData: (res, responseCode, message = '') => {
    return res.status(responseCode).send({ result: true, message: message });
  },

  handleError: (res, err) => {
    const statusCode = err.status || responseCode.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || responseMessage.INTERNAL_SERVER_ERROR;
    console.error('ERROR:', errorMessage, err.stack || '');
    return res
      .status(statusCode)
      .send({ result: false, message: errorMessage, payload: null });
  },

  handleOK: (
    res,
    status = responseCode.OK,
    message = responseMessage.SUCCESS,
  ) => {
    return res.status(status).send({ result: true, message: message });
  },

  handleData: (
    res,
    data,
    status = responseCode.OK,
    message = responseMessage.SUCCESS,
    token = null,
  ) => {
    return res.status(status).send({
      result: true,
      message: message,
      payload: data,
      token: token ? token : undefined,
    });
  },
};
