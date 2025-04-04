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


app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

module.exports = app;
