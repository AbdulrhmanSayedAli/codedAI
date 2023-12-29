const sendResponse = (res, data, statusCode) => {
  res.json(data).status(statusCode)
}

export default sendResponse
