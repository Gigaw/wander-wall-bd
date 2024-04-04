import db from "../bd.js";

class UserController {
  async getUser(req, res) {
    const { name, email, password, phone, img_url } = req.body;
    // try {
    //   const user = await User.findById(req.params.id);
    //   res.json(user);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
  }
  async createUser(req, res) {
    const { name, email, password, phone } = req.body;
    const userRoleId = 0;

    try {
      const query = await db.query(
        `INSERT INTO users (name, email, password, phone, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, password, phone, userRoleId]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const query = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password, phone } = req.body;
    try {
      const query = await db.query(
        `UPDATE users SET name = $1, email = $2, password = $3, phone = $4 WHERE id = $5 RETURNING *`,
        [name, email, password, phone, id]
      );
      res.json(query.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
