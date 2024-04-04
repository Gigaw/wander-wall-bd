import db from "../bd.js";

class Booking {
  async getBookings(req, res) {
    try {
      const query = await db.query(`SELECT * FROM bookings`);
      res.json(query.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBooking(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createBooking(req, res) {
    const { user_id, hike_id, status } = req.body;

    try {
      const query = await db.query(
        `INSERT INTO bookings (
          user_id, hike_id, status
          ) VALUES ($1, $2, $3) RETURNING *`,
        [user_id, hike_id, status]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteBooking(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`DELETE FROM bookings WHERE id = $1`, [id]);
      res.json({ message: "Booking deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBooking(req, res) {
    const id = req.params.id;
    const { user_id, hike_id, status_id } = req.body;
    try {
      const query = await db.query(
        `UPDATE bookings SET user_id = $1, hike_id = $2, status = $3 WHERE id = $4 RETURNING *`,
        [user_id, hike_id, status_id, id]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new Booking();