/**
 *
 * @param {import('express'.Request)} req - express request object
 * @param {import('express').Response} res - express response object
 *
 * @description This function is a controller that will be used to check
 * the status of the application.
 */
function statusController(req, res) {
  res.json({ status: 'OK' });
}

export default statusController;
