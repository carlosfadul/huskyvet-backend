const db = require('../database'); // o como llames a tu conexión a MySQL
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM Usuario WHERE usuario_username = ?', [username]);


      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.usuario_password);

      if (!match) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: user.usuario_id, role: user.rol_id },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '1h' }
      );

      res.json({ token, usuario: { id: user.usuario_id, nombre: user.usuario_username, tipo: user.usuario_tipo, estado: user.usuario_estado } });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};




module.exports = authController;
