const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user); // usuário que deu o dislike
    const targetDev = await Dev.findById(devId); // usuário que recebeu o dislike

    if(!targetDev) {
      return res.status(400).json({ error: 'Dev not exist'});
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};