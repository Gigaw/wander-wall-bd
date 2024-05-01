import db from "../db.js";

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
    try {
      const tour_id = req.params.tour_id;
      const query = await db.query(
        `SELECT * FROM bookings WHERE tour_id = $1`,
        [tour_id]
      );
      if (query.rowCount !== 0) {
        res.json(query.rows[0]);
      } else {
        res.json({});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  }

  async createBooking(req, res) {
    const { tour_id } = req.body;
    const user = req.user;
    const pendingStatusId = 1;
    try {
      const query0 = await db.query(
        `select id from bookings where user_id = $1 and tour_id = $2`,
        [user.id, tour_id]
      );
      if (query0.rowCount !== 0) {
        return res.status(400).json({ message: "Запись Уже существует" });
      }
      const query = await db.query(
        `INSERT INTO bookings (
          user_id, tour_id, status_id
          ) VALUES ($1, $2, $3) RETURNING *`,
        [user.id, tour_id, pendingStatusId]
      );
      res.json(query.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
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
