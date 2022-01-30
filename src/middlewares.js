function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}


/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    error: err.message,
    // stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

async function userAuthenticate(req, res, next) {
  if (req.get('Authorization')) {
    await res.locals.db.Users.tokenVerify(req.get('Authorization'), async (err, ressult) => {
      if (err) {

        return res.status(401).json({ error: `Authorization failed: ${err.message}` });
        // const error = new Error(err.message);
        // next(error);
      }
      const user = await res.locals.db.Users.getUserWithId(ressult.userId).catch(() => { })
      if (user == null) {
        return res.status(401).json({ error: 'Authorization failed: user not found' });
      }
      res.locals.user = user

      next()
    })
  }
  else {
    res.status(401).json({ error: 'Authorization failed: no token' });
    // const error = new Error('Authorization failed: no token');
    // next(error);
  }
}

module.exports = {
  notFound,
  errorHandler,
  userAuthenticate
};