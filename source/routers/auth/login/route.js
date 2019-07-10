import { logError } from "../../../utils";

export const post = (req, res) => {
  try {
    res.status(204);
  } catch (error) {
    logError(error);
    res.status(400).json({ message: "incorrect payload" });
  }
};
