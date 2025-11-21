const db = require('../database');

// Crear atención
exports.createAtencion = async (req, res) => {
  const {
    mascota_id,
    servicio_id,
    usuario_id,
    atencion_fecha,       // 👈 viene del frontend (YYYY-MM-DD HH:MM:SS)
    atencion_cantidad,
    atencion_precio,
    atencion_motivo,      // 👈 nuevo campo
    atencion_detalle,
    atencion_estado,
    diagnostico,
    tratamiento,
    observaciones
  } = req.body;

  // archivo enviado en el campo "archivo"
  const archivoAdjunto = req.file ? req.file.buffer : null;

  try {
    const [result] = await db.query(
      `INSERT INTO Atencion (
         mascota_id,
         servicio_id,
         usuario_id,
         atencion_fecha,
         atencion_cantidad,
         atencion_precio,
         atencion_motivo,
         atencion_detalle,
         atencion_archivoAdjunto,
         atencion_estado,
         diagnostico,
         tratamiento,
         observaciones
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        mascota_id,
        servicio_id,
        usuario_id || null,
        atencion_fecha,             // si viene null, MySQL usará CURRENT_TIMESTAMP si así lo defines
        atencion_cantidad,
        atencion_precio,
        atencion_motivo || null,
        atencion_detalle || null,
        archivoAdjunto,
        atencion_estado || 'pendiente',
        diagnostico || null,
        tratamiento || null,
        observaciones || null
      ]
    );

    res.status(201).json({ message: 'Atención creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear atención:', error);
    res.status(500).json({ message: 'Error al crear atención' });
  }
};

// Obtener todas las atenciones
exports.getAtenciones = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Atencion');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener atenciones:', error);
    res.status(500).json({ message: 'Error al obtener atenciones' });
  }
};

// Obtener atenciones por mascota
exports.getAtencionesByMascota = async (req, res) => {
  const { mascotaId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT a.*
       FROM Atencion a
       WHERE a.mascota_id = ?
       ORDER BY a.atencion_fecha DESC, a.atencion_id DESC`,
      [mascotaId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener atenciones por mascota:', error);
    res.status(500).json({ message: 'Error al obtener atenciones por mascota' });
  }
};

// Obtener una atención por ID
exports.getAtencionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM Atencion WHERE atencion_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Atención no encontrada' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener atención por ID:', error);
    res.status(500).json({ message: 'Error al obtener atención' });
  }
};

// Actualizar atención
exports.updateAtencion = async (req, res) => {
  const { id } = req.params;

  const {
    mascota_id,
    servicio_id,
    usuario_id,
    atencion_fecha,       // 👈 también actualizable
    atencion_cantidad,
    atencion_precio,
    atencion_motivo,      // 👈 nuevo
    atencion_detalle,
    atencion_estado,
    diagnostico,
    tratamiento,
    observaciones
  } = req.body;

  const archivoAdjunto = req.file ? req.file.buffer : null;

  try {
    const query = `
      UPDATE Atencion SET
        mascota_id = ?,
        servicio_id = ?,
        usuario_id = ?,
        atencion_fecha = ?,
        atencion_cantidad = ?,
        atencion_precio = ?,
        atencion_motivo = ?,
        atencion_detalle = ?,
        atencion_archivoAdjunto = IFNULL(?, atencion_archivoAdjunto),
        atencion_estado = ?,
        diagnostico = ?,
        tratamiento = ?,
        observaciones = ?
      WHERE atencion_id = ?
    `;

    await db.query(query, [
      mascota_id,
      servicio_id,
      usuario_id || null,
      atencion_fecha,
      atencion_cantidad,
      atencion_precio,
      atencion_motivo || null,
      atencion_detalle || null,
      archivoAdjunto,
      atencion_estado || 'pendiente',
      diagnostico || null,
      tratamiento || null,
      observaciones || null,
      id
    ]);

    res.json({ message: 'Atención actualizada' });
  } catch (error) {
    console.error('Error al actualizar atención:', error);
    res.status(500).json({ message: 'Error al actualizar atención' });
  }
};

// Eliminar atención
exports.deleteAtencion = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Atencion WHERE atencion_id = ?', [id]);
    res.json({ message: 'Atención eliminada' });
  } catch (error) {
    console.error('Error al eliminar atención:', error);
    res.status(500).json({ message: 'Error al eliminar atención' });
  }
};
