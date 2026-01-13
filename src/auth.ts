import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// === Registro de usuario ===
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email y password son obligatorios' });
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// === Login de usuario ===
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email y password son obligatorios' });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    // data.session tiene el JWT generado por Supabase
    res.json({ success: true, token: data.session?.access_token });
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message });
  }
};

// === Middleware de autenticación ===
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'Token faltante' });

    const token = authHeader.split(' ')[1];

    // Validar token con Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) return res.status(401).json({ success: false, error: 'Token inválido' });

    (req as any).user = data.user;
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};

// === Endpoint perfil ===
export const me = async (req: Request, res: Response) => {
  res.json({ success: true, user: (req as any).user });
};