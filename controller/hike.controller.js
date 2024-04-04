import db from "../bd.js";

class Hike {
  async getHikes(req, res) {
    try {
      const query = await db.query(`SELECT * FROM hikes`);
      res.json(query.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getHike(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`SELECT * FROM hikes WHERE id = $1`, [id]);
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createHike(req, res) {
    const { tour_id, date_start, date_end, capacity, max_capacity } = req.body;

    try {
      const query = await db.query(
        `INSERT INTO hikes (
          tour_id, date_start, date_end, capacity, max_capacity
          ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [tour_id, date_start, date_end, capacity, max_capacity]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteHike(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`DELETE FROM hikes WHERE id = $1`, [id]);
      res.json({ message: "Hike deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}


export default new Hike();