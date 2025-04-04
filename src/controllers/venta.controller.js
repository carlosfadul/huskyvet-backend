const db = require('../database');

exports.createVenta = async (req, res) => {
  try {
    const {
      cliente_id,
      sucursal_id,
      usuario_id,
      venta_estado,
      venta_detalles,
      subtotal,
      impuestos,
      descuentos,
      total,
      metodo_pago
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO Venta 
        (cliente_id, sucursal_id, usuario_id, venta_estado, venta_detalles, subtotal, impuestos, descuentos, total, metodo_pago) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cliente_id, sucursal_id, usuario_id, venta_estado, venta_detalles, subtotal, impuestos, descuentos, total, metodo_pago]
    );

    res.status(201).json({ message: 'Venta creada', venta_id: result.insertId });
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ message: 'Error al crear la venta' });
  }
};

exports.getVentas = async (req, res) => {
  try {
    const [ventas] = await db.query('SELECT * FROM Venta');
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ message: 'Error al obtener ventas' });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const [venta] = await db.query('SELECT * FROM Venta WHERE venta_id = ?', [req.params.id]);
    if (venta.length === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json(venta[0]);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).json({ message: 'Error al obtener la venta' });
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cliente_id,
      sucursal_id,
      usuario_id,
      venta_estado,
      venta_detalles,
      subtotal,
      impuestos,
      descuentos,
      total,
      metodo_pago
    } = req.body;

    await db.query(
      `UPDATE Venta SET 
        cliente_id=?, sucursal_id=?, usuario_id=?, venta_estado=?, venta_detalles=?, 
        subtotal=?, impuestos=?, descuentos=?, total=?, metodo_pago=?
      WHERE venta_id=?`,
      [cliente_id, sucursal_id, usuario_id, venta_estado, venta_detalles, subtotal, impuestos, descuentos, total, metodo_pago, id]
    );

    res.status(200).json({ message: 'Venta actualizada' });
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    res.status(500).json({ message: 'Error al actualizar la venta' });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    await db.query('DELETE FROM Venta WHERE venta_id = ?', [req.params.id]);
    res.status(200).json({ message: 'Venta eliminada' });
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    res.status(500).json({ message: 'Error al eliminar la venta' });
  }
};
