const basicResponse = (res, statusCode, data) => res.status(statusCode).json(data);;

const success = (res, message, data) => basicResponse(res, 200, { success: true, msg: message, data: data });
const created = (res, message) => basicResponse(res, 201, { success: true, msg: message });
const badRequest = (res, message) => basicResponse(res, 400, { success: false, msg: message });
const unauthorized = (res) => basicResponse(res, 401, { success: false, msg: "Unathorized" });
const notFound = (res, message) => basicResponse(res, 404, { success: false, msg: message });
const error = (res, message) => basicResponse(res, 500, { success: false, msg: message });

export default {
  success,
  created,
  badRequest,
  unauthorized,
  notFound,
  error
};