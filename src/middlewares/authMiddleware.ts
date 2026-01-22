import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'Token faltante' });

    const token = authHeader.split(' ')[1];

    // Validar token con Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) return res.status(401).json({ success: false, error: 'Token inválido' });

    req.user = {
      id: data.user.id,
      email: data.user.email ?? undefined
    };
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};
