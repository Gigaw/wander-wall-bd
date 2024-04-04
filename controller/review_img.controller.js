import db from "../bd.js";

class ReviewImg {
  async createReviewImg(req, res) {
    const { review_id, img_url } = req.body;

    try {
      const query = await db.query(
        `INSERT INTO review_img (
          review_id, img_url
          ) VALUES ($1, $2) RETURNING *`,
        [review_id, img_url]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ReviewImg();