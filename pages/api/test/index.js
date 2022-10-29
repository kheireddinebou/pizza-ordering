const handler = (req, res) => {
  try {
    res.status(200).json("work");
  } catch (error) {
    res.status(500).json(error.response.data);
  }
};

export default handler;
