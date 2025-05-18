class Middleware {
  handlers = [];

  /**
   * @param {MiddlewareFunc} func
   */
  use(func) {
    this.handlers.push(func);
  }

  /**
   * @param {Request} req
   */
  start(req) {
    /**
     * Execute handlers one by one
     * Continue executing another handler if next was called on the previous handler
     *
     * in case of error inside one of the handlers run error handlers
     * if next is called inside error handler process next error handler
     *
     * (middle1) =(next)> (middle2) =(next)> (middle3). =(next)> (middle4)
     *                                           |
     *                                           \> throw error => (error1) =(next)> (error2)
     */
    // let i = 0;
    const runHandler = (i, error) => {
      // if the following handler in not present in list => exit
      if (!(i in this.handlers)) {
        return;
      }

      const handler = this.handlers[i];
      if (
        // if not satisfied handler then look for the next
        (error && handler.length === 2) ||
        (!error && handler.length === 3)
      ) {
        return runHandler(i + 1, error);
      }

      try {
        const nextHandler = (nextError) => {
          // chain the next middleware/error handler
          runHandler(i + 1, nextError || error);
        };
        if (error) {
          handler(error, req, nextHandler);
        } else {
          handler(req, nextHandler);
        }
      } catch (originalError) {
        runHandler(i + 1, originalError);
      }
    };

    // start original trigger callback
    runHandler(0);
  }
}
