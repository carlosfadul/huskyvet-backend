const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database');

const vacunaRoutes = require('./routes/vacuna.routes');
const veterinariaRoutes = require('./routes/veterinaria.routes');
const sucursalRoutes = require('./routes/sucursal.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const servicioRoutes = require('./routes/servicio.routes');
const enfermedadRoutes = require('./routes/enfermedad.routes');
const tratamientoRoutes = require('./routes/tratamiento.routes');
const aliadoRoutes = require('./routes/aliado.routes');
const clienteRoutes = require('./routes/cliente.routes');
const mascotaRoutes = require('./routes/mascota.routes');
const productoRoutes = require('./routes/producto.routes');
const mascotaEnfermedadRoutes = require('./routes/mascotaEnfermedad.routes');
const desparasitanteRoutes = require('./routes/desparasitante.routes');
const aplicacionDesparasitanteRoutes = require('./routes/aplicacionDesparasitante.routes');
const servicioAliadoRoutes = require('./routes/servicioAliado.routes');
const empleadoRoutes = require('./routes/empleado.routes');
const nominaRoutes = require('./routes/nomina.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const citaRoutes = require('./routes/cita.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const auditoriaRoutes = require('./routes/auditoria.routes');
const movimientoInventarioRoutes = require('./routes/movimientoInventario.routes');
const facturaRoutes = require('./routes/factura.routes');
const facturaDetalleRoutes = require('./routes/facturaDetalle.routes');
const pedidoRoutes = require('./routes/pedido.routes');
const detallePedidoRoutes = require('./routes/detallePedido.routes');
const ventaRoutes = require('./routes/venta.routes');
const detalleVentaRoutes = require('./routes/detalleVenta.routes');
const atencionRoutes = require('./routes/atencion.routes');
const detalleAtencionRoutes = require('./routes/detalleAtencion.routes');
const mascotaTratamientoRoutes = require('./routes/mascotaTratamiento.routes');
const aplicacionVacunaRoutes = require('./routes/aplicacionVacuna.routes');
const remisionRoutes = require('./routes/remision.routes');
const detalleRemisionRoutes = require('./routes/detalleRemision.routes');
const detalleNominaRoutes = require('./routes/detalleNomina.routes');


const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Rutas
app.use('/api/vacunas', vacunaRoutes);
app.use('/api/veterinarias', veterinariaRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/enfermedades', enfermedadRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/aliados', aliadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/mascota-enfermedad', mascotaEnfermedadRoutes);
app.use('/api/desparasitantes', desparasitanteRoutes);
app.use('/api/aplicacion-desparasitante', aplicacionDesparasitanteRoutes);
app.use('/api/servicio-aliado', servicioAliadoRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/nomina', nominaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/configuracion', configuracionRoutes);
app.use('/api/auditoria', auditoriaRoutes);
app.use('/api/movimiento-inventario', movimientoInventarioRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/factura-detalle', facturaDetalleRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalle-pedido', detallePedidoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/detalle-venta', detalleVentaRoutes);
app.use('/api/atenciones', atencionRoutes);
app.use('/api/detalle-atencion', detalleAtencionRoutes);
app.use('/api/mascota-tratamiento', mascotaTratamientoRoutes);
app.use('/api/aplicacion-vacuna', aplicacionVacunaRoutes);
app.use('/api/remisiones', remisionRoutes);
app.use('/api/detalle-remision', detalleRemisionRoutes);
app.use('/api/detalle-nomina', detalleNominaRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

module.exports = app;
