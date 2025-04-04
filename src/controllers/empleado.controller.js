const db = require('../database');

exports.createEmpleado = async (req, res) => {
  const {
    sucursal_id,
    empleado_nombre,
    empleado_apellido,
    empleado_cedula,
    empleado_rol,
    empleado_direccion,
    empleado_telefono,
    empleado_email,
    empleado_fecha_nac,
    empleado_genero,
    empleado_detalles,
    empleado_estado,
    fecha_contratacion,
    fecha_terminacion
  } = req.body;

  const empleado_foto = req.file ? req.file.buffer : null;

  try {
    const [result] = await db.promise().query(
      `INSERT INTO Empleado (
        sucursal_id, empleado_nombre, empleado_apellido, empleado_cedula, empleado_rol, 
        empleado_direccion, empleado_telefono, empleado_email, empleado_fecha_nac, 
        empleado_genero, empleado_detalles, empleado_foto, empleado_estado, 
        fecha_contratacion, fecha_terminacion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sucursal_id, empleado_nombre, empleado_apellido, empleado_cedula, empleado_rol,
        empleado_direccion, empleado_telefono, empleado_email, empleado_fecha_nac,
        empleado_genero, empleado_detalles, empleado_foto, empleado_estado,
        fecha_contratacion, fecha_terminacion
      ]
    );
    res.status(201).json({ message: 'Empleado creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ message: 'Error al crear empleado', error });
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM Empleado');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

exports.getEmpleadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM Empleado WHERE empleado_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ message: 'Error al obtener empleado' });
  }
};

exports.updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const {
    sucursal_id,
    empleado_nombre,
    empleado_apellido,
    empleado_cedula,
    empleado_rol,
    empleado_direccion,
    empleado_telefono,
    empleado_email,
    empleado_fecha_nac,
    empleado_genero,
    empleado_detalles,
    empleado_estado,
    fecha_contratacion,
    fecha_terminacion
  } = req.body;

  const empleado_foto = req.file ? req.file.buffer : null;

  try {
    const [result] = await db.promise().query(
      `UPDATE Empleado SET
        sucursal_id = ?, empleado_nombre = ?, empleado_apellido = ?, empleado_cedula = ?, empleado_rol = ?,
        empleado_direccion = ?, empleado_telefono = ?, empleado_email = ?, empleado_fecha_nac = ?, 
        empleado_genero = ?, empleado_detalles = ?, empleado_estado = ?, fecha_contratacion = ?, 
        fecha_terminacion = ?${empleado_foto ? ', empleado_foto = ?' : ''}
      WHERE empleado_id = ?`,
      empleado_foto
        ? [
            sucursal_id, empleado_nombre, empleado_apellido, empleado_cedula, empleado_rol,
            empleado_direccion, empleado_telefono, empleado_email, empleado_fecha_nac,
            empleado_genero, empleado_detalles, empleado_estado, fecha_contratacion,
            fecha_terminacion, empleado_foto, id
          ]
        : [
            sucursal_id, empleado_nombre, empleado_apellido, empleado_cedula, empleado_rol,
            empleado_direccion, empleado_telefono, empleado_email, empleado_fecha_nac,
            empleado_genero, empleado_detalles, empleado_estado, fecha_contratacion,
            fecha_terminacion, id
          ]
    );

    res.json({ message: 'Empleado actualizado' });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};

exports.deleteEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query('DELETE FROM Empleado WHERE empleado_id = ?', [id]);
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ message: 'Error al eliminar empleado' });
  }
};
