import db from "../db.js";

class TourController {
  async getTours(req, res) {
    try {
      const query = await db.query(`SELECT * FROM tours`);
      res.json(query.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTour(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`SELECT * FROM tours WHERE id = $1`, [id]);
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTour(req, res) {
    const { name, description, price, location, duration, distance, level } =
      req.body;
    let level_id;
    console.log("body", req.body);
    switch (Number(level)) {
      case 1:
        level_id = 1;
        break;
      case 2:
        level_id = 2;
        break;
      case 3:
        level_id = 3;
        break;
    }

    try {
      const query = await db.query(
        `INSERT INTO tours (name, description, price, 
          location,
          duration,
          distance,
          level_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, description, price, location, duration, distance, level_id]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTour(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`DELETE FROM tours WHERE id = $1`, [id]);
      res.json({ message: "Tour deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTour(req, res) {
    const id = req.params.id;
    const { name, description, price } = req.body;
    try {
      const query = await db.query(
        `UPDATE tours SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *`,
        [name, description, price, id]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TourController();
