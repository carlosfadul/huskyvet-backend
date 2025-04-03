const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database');

const vacunaRoutes = require('./routes/vacuna.routes');
const veterinariaRoutes = require('./routes/veterinaria.routes');
const sucursalRoutes = require('./routes/sucursal.routes');


const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Rutas
app.use('/api/vacunas', vacunaRoutes);
app.use('/api/veterinarias', veterinariaRoutes);
app.use('/api/sucursal', sucursalRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

module.exports = app;
