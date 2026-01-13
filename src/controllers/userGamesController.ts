import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { getGameById } from "../api/gameAPI";

// GET /user/games
export const getUserGames = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: "No autorizado" });
  }

  const userId = req.user.id;

  const { data, error } = await supabase
    .from("user_games")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  const enrichedGames = await Promise.all(
    data.map(async (row) => {
      const info = await getGameById(row.game_id);

      return {
        user_game_id: row.id,
        estado: row.estado,
        horas_jugadas: row.horas_jugadas,
        valoracion: row.valoracion,
        fecha_inicio: row.fecha_inicio,
        fecha_fin: row.fecha_fin,
        game: info
      };
    })
  );

  res.json({ success: true, games: enrichedGames });
};

// POST /user/games
export const addUserGame = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: "No autorizado" });
  }

  const userId = req.user.id;
  const { game_id, estado = "jugando", fecha_inicio } = req.body;

  const { data, error } = await supabase
    .from("user_games")
    .insert([{ user_id: userId, game_id, estado, fecha_inicio }])
    .select();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.status(201).json({ success: true, game: data[0] });
};

// PATCH /user/games/:id
export const updateUserGame = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: "No autorizado" });
  }

  const userId = req.user.id;
  const { id } = req.params;
  const { horas_jugadas, estado, valoracion, fecha_fin } = req.body;

  const { data, error } = await supabase
    .from("user_games")
    .update({
      horas_jugadas,
      estado,
      valoracion,
      fecha_fin,
      updated_at: new Date(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true, game: data[0] });
};

// DELETE /user/games/:id
export const deleteUserGame = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: "No autorizado" });
  }

  const userId = req.user.id;
  const { id } = req.params;

  const { data, error } = await supabase
    .from("user_games")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true, message: "Juego eliminado", game: data[0] });
};
