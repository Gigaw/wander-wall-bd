import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const generateAccessToken = (id, roleId) => {
  return sign({ id, roleId }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
};
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

  async signUp(req, res) {
    const { name, email, password, phone } = req.body;
    const userRoleId = 0;
    const hashedPassword = await bcrypt.hash(password, 7);
    try {
      const query = await db.query(
        `INSERT INTO users (name, email, password, phone, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, hashedPassword, phone, userRoleId]
      );
      const user = query.rows[0];
      const token = generateAccessToken(user.id, user.role_id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await pool.query(query, [email]);
      if (result.rows.length === 0) {
        // User with provided email not found
        return res.status(401).send("Invalid email or password");
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Passwords don't match
        return res.status(401).send("Invalid email or password");
      }
      const token = generateAccessToken(user.id, user.role_id);
      // Passwords match, sign-in successful
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error while signing in:", error);
      res.status(500).send("Error while signing in");
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
