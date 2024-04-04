import db from "../bd.js";

class Review {
  async getReviews(req, res) {
    try {
      const query = await db.query(`SELECT * FROM reviews`);
      res.json(query.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReview(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`SELECT * FROM reviews WHERE id = $1`, [id]);
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createReview(req, res) {
    const { user_id, tour_id, rating, comment, date_created, date_updated } = req.body;

    try {
      const query = await db.query(
        `INSERT INTO reviews (
          user_id, tour_id, rating, comment
          ) VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, tour_id, rating, comment]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteReview(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`DELETE FROM reviews WHERE id = $1`, [id]);
      res.json({ message: "Review deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateReview(req, res) {
    const id = req.params.id;
    const { user_id, tour_id, rating, comment } = req.body;
    try {
      const query = await db.query(
        `UPDATE reviews SET user_id = $1, tour_id = $2, rating = $3, comment = $4 WHERE id = $5 RETURNING *`,
        [user_id, tour_id, rating, comment, id]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new Review();