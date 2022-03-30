module.exports = {
  success: (res, data, status, message, pagination) => {
    // Pagination
    if (pagination) {
      res.json({
        code: 200,
        status,
        data,
        pagination,
        message
      })
    } else {
      res.json({
        code: 200,
        status,
        data,
        message
      })
    }
  },
  failed: (res, data, status, message) => {
    res.json({
      code: 500,
      status,
      data: null,
      message
    })
  },
  successWithtoken: (res, token, status, message) => {
    res.json({
      status,
      token,
      message
    })
  }
}
