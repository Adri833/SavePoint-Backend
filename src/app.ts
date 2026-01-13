import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { register, login, authMiddleware, me } from './auth';
import gamesRoutes from './routes/games.routes';
 
dotenv.config(); // Carga variables del .env

const app = express();

app.use(cors());
app.use(express.json());

// === Rutas de autenticación ===
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/me', authMiddleware, me);

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, '../public')));

// === Rutas de juegos ===
app.use('/games', gamesRoutes);

// === Conexión a Supabase ===
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// === Rutas ===
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: 'SavePoint API' });
});

// GET: prueba Supabase, protegido
app.get('/test-supabase', authMiddleware, async (_req, res) => {
  try {
    const { data, error } = await supabase.from('test').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: insertar fila con 'name', protegido
app.post('/test-supabase', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'El campo "name" es obligatorio' });

    const { data, error } = await supabase.from('test').insert([{ name }]);
    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;