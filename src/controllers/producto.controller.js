const db = require('../database');

// Crear nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const {
            proveedor_id,
            categoria_producto,
            nombre_producto,
            codigoBarras_producto,
            cantidad_producto,
            unidades_producto,
            precioCompra_producto,
            precioVenta_producto,
            marca_producto,
            descripcion_producto,
            producto_estado,
            fecha_vencimiento
        } = req.body;

        const foto_producto = req.file ? req.file.buffer : null;

        const [result] = await db.query(
            `INSERT INTO Producto (
                proveedor_id, categoria_producto, nombre_producto, codigoBarras_producto,
                cantidad_producto, unidades_producto, precioCompra_producto, precioVenta_producto,
                marca_producto, descripcion_producto, foto_producto, producto_estado, fecha_vencimiento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                proveedor_id, categoria_producto, nombre_producto, codigoBarras_producto,
                cantidad_producto || 0, unidades_producto, precioCompra_producto, precioVenta_producto,
                marca_producto, descripcion_producto, foto_producto, producto_estado || 'activo', fecha_vencimiento
            ]
        );

        res.status(201).json({ message: 'Producto creado', producto_id: result.insertId });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM Producto');
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// Obtener producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Producto WHERE producto_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            proveedor_id,
            categoria_producto,
            nombre_producto,
            codigoBarras_producto,
            cantidad_producto,
            unidades_producto,
            precioCompra_producto,
            precioVenta_producto,
            marca_producto,
            descripcion_producto,
            producto_estado,
            fecha_vencimiento
        } = req.body;

        const foto_producto = req.file ? req.file.buffer : null;

        const query = `
            UPDATE Producto SET
                proveedor_id=?, categoria_producto=?, nombre_producto=?, codigoBarras_producto=?,
                cantidad_producto=?, unidades_producto=?, precioCompra_producto=?, precioVenta_producto=?,
                marca_producto=?, descripcion_producto=?, ${foto_producto ? 'foto_producto=?,' : ''} 
                producto_estado=?, fecha_vencimiento=?
            WHERE producto_id=?`;

        const params = [
            proveedor_id, categoria_producto, nombre_producto, codigoBarras_producto,
            cantidad_producto, unidades_producto, precioCompra_producto, precioVenta_producto,
            marca_producto, descripcion_producto,
            ...(foto_producto ? [foto_producto] : []),
            producto_estado, fecha_vencimiento,
            id
        ];

        await db.query(query, params);

        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Producto WHERE producto_id = ?', [id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};
