import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import Cabecalho from '../../components/Cabecalho';
import { cores } from '../../constants/identidade';
import { type Ponto } from '../../database/banco';

export default function Pontos() {
  const db = useSQLiteContext();
  const [pontos, setPontos] = useState<Ponto[]>([]);

  useEffect(() => {
    async function carregar() {
      const linhas = await db.getAllAsync<Ponto>('SELECT * FROM pontos ORDER BY nome');
      setPontos(linhas);
    }
    carregar();
  }, [db]);

  return (
    <View style={styles.tela}>
      <Cabecalho />
      <View style={styles.corpo}>
        <Text style={styles.titulo}>Pontos Turísticos</Text>
        <FlatList
          data={pontos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => router.push(`/ponto/${item.id}`)}>
              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.sub}>
                  {item.bairro} · {item.categoria}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={cores.textoSuave} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  corpo: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto, marginBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: cores.card,
    borderLeftWidth: 5,
    borderLeftColor: cores.destaque,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  sub: { color: cores.textoSuave, marginTop: 2 },
});