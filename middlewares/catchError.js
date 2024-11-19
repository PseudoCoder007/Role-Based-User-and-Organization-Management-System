exports.catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next))
    .then((data) => {
      if (data === null) {
        const error = new Error("Bad request: Null data received");
        error.statusCode = 400;
        throw error;
      }
    })
    .catch((error) => {
      console.error(
        "Error in catchAsyncError middleware:",
        error.response && error.response.data
          ? error.response.data.error
          : error
      );

      if (error instanceof Error) {
        let statusCode = error.statusCode || 500;
        let message = "Internal Server Error";

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          message = error.response.data.error;
        }

        return res.status(statusCode).json({ success: false, message });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    });
};


