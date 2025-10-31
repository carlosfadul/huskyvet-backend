// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// ====== Cargar DB con fallback de ruta ======
let db;
try {
  db = require('../database'); // raíz del proyecto
} catch (e1) {
  try {
    db = require('./database'); // dentro de src/
  } catch (e2) {
    console.error('[DB] No se pudo cargar database.js desde ../database ni ./database');
    throw e2;
  }
}

// ====== Swagger ======
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
let swaggerSpec = {};
try {
  swaggerSpec = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));
} catch (e) {
  console.warn('[Swagger] No se encontró src/docs/swagger.yaml. /api/docs mostrará vacío.');
}

// ====== Importación de rutas ======
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
const authRoutes = require('./routes/auth.routes');

// Controlador para detalles de nómina (ruta espejo)
const detalleNominaController = require('./controllers/detalleNomina.controller');
const { idParam } = require('./validators/detalleNomina.validators');

// ====== Crear app ======
const app = express();

// ====== Middlewares base ======
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// No-cache global
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Estáticos
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Prefijo común
const API = '/api';

// ====== Swagger ======
if (swaggerSpec && Object.keys(swaggerSpec).length) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
} else {
  app.get('/api/docs', (_req, res) =>
    res.send('Swagger no configurado: asegúrate de tener src/docs/swagger.yaml')
  );
}

// ====== Rutas principales ======
app.use(`${API}/vacunas`, vacunaRoutes);
app.use(`${API}/veterinarias`, veterinariaRoutes);
app.use(`${API}/sucursales`, sucursalRoutes);
app.use(`${API}/proveedores`, proveedorRoutes);
app.use(`${API}/servicios`, servicioRoutes);
app.use(`${API}/enfermedades`, enfermedadRoutes);
app.use(`${API}/tratamientos`, tratamientoRoutes);
app.use(`${API}/aliados`, aliadoRoutes);
app.use(`${API}/clientes`, clienteRoutes);
app.use(`${API}/mascotas`, mascotaRoutes);
app.use(`${API}/productos`, productoRoutes);
app.use(`${API}/mascota-enfermedad`, mascotaEnfermedadRoutes);
app.use(`${API}/desparasitantes`, desparasitanteRoutes);
app.use(`${API}/aplicacion-desparasitante`, aplicacionDesparasitanteRoutes);
app.use(`${API}/servicio-aliado`, servicioAliadoRoutes);
app.use(`${API}/empleados`, empleadoRoutes);
app.use(`${API}/nomina`, nominaRoutes);
app.use(`${API}/usuarios`, usuarioRoutes);
app.use(`${API}/citas`, citaRoutes);
app.use(`${API}/configuracion`, configuracionRoutes);
app.use(`${API}/auditoria`, auditoriaRoutes);
app.use(`${API}/movimiento-inventario`, movimientoInventarioRoutes);
app.use(`${API}/facturas`, facturaRoutes);
app.use(`${API}/factura-detalle`, facturaDetalleRoutes);
app.use(`${API}/pedidos`, pedidoRoutes);
app.use(`${API}/detalle-pedido`, detallePedidoRoutes);
app.use(`${API}/ventas`, ventaRoutes);
app.use(`${API}/detalle-venta`, detalleVentaRoutes);
app.use(`${API}/atenciones`, atencionRoutes);
app.use(`${API}/detalle-atencion`, detalleAtencionRoutes);
app.use(`${API}/mascota-tratamiento`, mascotaTratamientoRoutes);
app.use(`${API}/aplicacion-vacuna`, aplicacionVacunaRoutes);
app.use(`${API}/remisiones`, remisionRoutes);
app.use(`${API}/detalle-remision`, detalleRemisionRoutes);

// ====== Detalle Nómina ======
app.use(`${API}/detalle-nomina`, detalleNominaRoutes);

// 🔹 Ruta espejo requerida por el frontend Angular
app.get(`${API}/nominas/:nominaId/detalles`, idParam('nominaId'), detalleNominaController.listByNomina);

// ====== Auth ======
app.use(`${API}/auth`, authRoutes);

// ====== Healthcheck ======
app.get(`${API}/health`, (_req, res) => {
  res.json({ status: 'ok', service: 'huskyvet-backend', time: new Date().toISOString() });
});

// ====== Raíz ======
app.get('/', (_req, res) => {
  res.send('API funcionando 🚀');
});

// ====== 404 ======
app.use((req, res, next) => {
  const err = new Error(`No encontrado: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// ====== Manejo de errores global ======
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    ...(err.details ? { errors: err.details } : {}),
  });
});

module.exports = app;
