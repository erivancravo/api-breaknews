import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });
    res.send(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const news = await findAllService();
    if (news.length === 0) {
      res.status(400).send({ message: "There are no news at the moment" });
    }
    res.send(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { create, findAll };
