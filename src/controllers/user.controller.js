import UserService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;
    if (!name || !userName || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Fulfil all fields" });
    }

    const user = await UserService.createService(req.body);
    console.log(user._id);

    if (!user) {
      return res.status(400).json({ message: "Unable to create user" });
    }
    res.status(201).json({
      message: "Deu bom meu nobre",
      user: {
        id: user._id,
        name,
        userName,
        email,
        password,
        avatar,
        background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAllService();
    if (users.length === 0) {
      res.status(400).json({ message: "deu ruim meu nobre, lista vazia" });
    } else {
      res.status(200).json({ users });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;

    const id = req.id;
    if (!name && !userName && !email && !password && !avatar && !background) {
      res
        .status(400)
        .send({ message: "Pelo Menos um campo pra mudar meu nobre" });
    }

    const user = req.user;

    await UserService.updateService(
      id,
      name,
      userName,
      email,
      password,
      avatar,
      background
    );
    res.send({ message: "Atualizamo o meno meu nobre", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAllUsers, findById, update };
