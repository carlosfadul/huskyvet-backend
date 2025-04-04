const db = require('../database');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.promise().query('SELECT * FROM Usuario WHERE usuario_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
    const {
        empleado_id,
        sucursal_id,
        veterinaria_id,
        usuario_username,
        usuario_password,
        usuario_tipo,
        usuario_estado,
        ultimo_login
    } = req.body;

    const usuario_foto = req.file ? req.file.buffer : null;

    try {
        const [result] = await db.promise().query(
            `INSERT INTO Usuario (empleado_id, sucursal_id, veterinaria_id, usuario_username, usuario_password, usuario_tipo, usuario_estado, usuario_foto, ultimo_login)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [empleado_id || null, sucursal_id || null, veterinaria_id || null, usuario_username, usuario_password, usuario_tipo, usuario_estado || 'activo', usuario_foto, ultimo_login || null]
        );
        res.status(201).json({ message: 'Usuario creado', usuario_id: result.insertId });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const {
        empleado_id,
        sucursal_id,
        veterinaria_id,
        usuario_username,
        usuario_password,
        usuario_tipo,
        usuario_estado,
        ultimo_login
    } = req.body;

    const usuario_foto = req.file ? req.file.buffer : null;

    try {
        const [result] = await db.promise().query(
            `UPDATE Usuario SET empleado_id = ?, sucursal_id = ?, veterinaria_id = ?, usuario_username = ?, usuario_password = ?, usuario_tipo = ?, usuario_estado = ?, usuario_foto = ?, ultimo_login = ? WHERE usuario_id = ?`,
            [empleado_id || null, sucursal_id || null, veterinaria_id || null, usuario_username, usuario_password, usuario_tipo, usuario_estado, usuario_foto, ultimo_login || null, id]
        );
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await db.promise().query('DELETE FROM Usuario WHERE usuario_id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};
