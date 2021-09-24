exports.emptyResponse = (res,msg) => {
  return res.status(404).json({
    success: false,
    message: msg ? msg : "Records not found",
    data: []
  });
};

exports.duplicateResponse = (res,msg) => {
  return res.status(409).json({
    success: false,
    message: msg ? msg : "Record already exist"
  });
};


exports.failResponse = (res, msg) => {
  return res.status(400).json({
    success: false,
    message: msg
  });
};
exports.duplicateResponse = (res, msg) => {
  return res.status(409).json({
    success: false,
    message: msg ? msg : "Duplicate!!! Record exist"
  });
};
exports.successResponse = (res, data) => {
  return res.status(200).json({
    success: true,
    count: data.length,
    data: data,
  });
};

exports.successResMsgOnly = (res, msg) => {
  return res.status(200).json({
    success: true,
    message: msg
  });
};
