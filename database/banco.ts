import { type SQLiteDatabase } from 'expo-sqlite';
import { pontosIniciais } from './pontosInicias';

export type Evento = {
  id: number;
  nome: string;
  local: string;
  data: string;
  descricao: string | null;
};

export type Ponto = {
  id: number;
  nome: string;
  bairro: string;
  categoria: string;
  endereco: string;
  descricao: string;
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
    CREATE TABLE IF NOT EXISTS pontos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      bairro TEXT NOT NULL,
      categoria TEXT NOT NULL,
      endereco TEXT NOT NULL,
      descricao TEXT NOT NULL
    );
  `);

  const resultado = await db.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) AS total FROM pontos'
  );

  if (resultado && resultado.total === 0) {
    for (const p of pontosIniciais) {
      await db.runAsync(
        'INSERT INTO pontos (nome, bairro, categoria, endereco, descricao) VALUES (?, ?, ?, ?, ?)',
        [p.nome, p.bairro, p.categoria, p.endereco, p.descricao]
      );
    }
  }
}