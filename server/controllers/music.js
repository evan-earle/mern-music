import axios from "axios";

export const getVideo = async (req, res, next) => {
  const song = req.params.song;

  try {
    const response = await Promise.all([
      axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&q=${song}`
      ),
    ]);

    const data = response.map((response) => response.data);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
