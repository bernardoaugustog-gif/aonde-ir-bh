import { type SQLiteDatabase } from 'expo-sqlite';

export type Evento = {
  id: number;
  nome: string;
  local: string;
  data: string;
  descricao: string | null;
};

export async function iniciarBanco(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      local TEXT NOT NULL,
      data TEXT NOT NULL,
      descricao TEXT
    );
  `);
}