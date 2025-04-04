const db = require('../database');

// Obtener todos los proveedores
exports.getProveedores = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Proveedor');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error al obtener proveedores:', err);
        res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};

// Obtener proveedor por ID
exports.getProveedorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Proveedor WHERE proveedor_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error al obtener proveedor por ID:', err);
        res.status(500).json({ message: 'Error al obtener el proveedor' });
    }
};

// Crear proveedor
exports.createProveedor = async (req, res) => {
    const {
        nombre_proveedor,
        direccion_proveedor,
        telefono_proveedor,
        email_proveedor,
        nit_proveedor,
        detalles_proveedor,
        proveedor_estado
    } = req.body;

    try {
        await db.query(
            `INSERT INTO Proveedor 
            (nombre_proveedor, direccion_proveedor, telefono_proveedor, email_proveedor, nit_proveedor, detalles_proveedor, proveedor_estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre_proveedor, direccion_proveedor, telefono_proveedor, email_proveedor, nit_proveedor, detalles_proveedor, proveedor_estado || 'activo']
        );
        res.status(201).json({ message: 'Proveedor creado correctamente' });
    } catch (err) {
        console.error('Error al crear proveedor:', err);
        res.status(500).json({ message: 'Error al crear proveedor' });
    }
};

// Actualizar proveedor
exports.updateProveedor = async (req, res) => {
    const { id } = req.params;
    const {
        nombre_proveedor,
        direccion_proveedor,
        telefono_proveedor,
        email_proveedor,
        nit_proveedor,
        detalles_proveedor,
        proveedor_estado
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE Proveedor SET 
            nombre_proveedor = ?, direccion_proveedor = ?, telefono_proveedor = ?, 
            email_proveedor = ?, nit_proveedor = ?, detalles_proveedor = ?, proveedor_estado = ? 
            WHERE proveedor_id = ?`,
            [nombre_proveedor, direccion_proveedor, telefono_proveedor, email_proveedor, nit_proveedor, detalles_proveedor, proveedor_estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.status(200).json({ message: 'Proveedor actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar proveedor:', err);
        res.status(500).json({ message: 'Error al actualizar proveedor' });
    }
};

// Eliminar proveedor
exports.deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Proveedor WHERE proveedor_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar proveedor:', err);
        res.status(500).json({ message: 'Error al eliminar proveedor' });
    }
};
