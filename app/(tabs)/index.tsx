import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import { router, useFocusEffect } from 'expo-router';
import { type Evento } from '../../database/banco';
import Cabecalho from '../../components/Cabecalho';
import { cores } from '../../constants/identidade';
import { Ionicons } from '@expo/vector-icons';
import { confirmar } from '../../utils/confirmar';
import { formatarDataBR } from '../../utils/data';

export default function Lista() {
  const db = useSQLiteContext();
  const [eventos, setEventos] = useState<Evento[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const linhas = await db.getAllAsync<Evento>('SELECT * FROM eventos ORDER BY data ASC, id DESC');
        setEventos(linhas);
      }
      carregar();
    }, [db])
  );

  async function excluir(evento: Evento) {
  const confirmou = await confirmar('Excluir evento', `Deseja excluir "${evento.nome}"?`);
  if (!confirmou) return;
  await db.runAsync('DELETE FROM eventos WHERE id = ?', [evento.id]);
  setEventos((atual) => atual.filter((e) => e.id !== evento.id));
}

  return (
    <View style={styles.tela}>
    <Cabecalho />
    <View style={styles.corpo}>
      <Text style={styles.titulo}>Meus Eventos</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum evento cadastrado ainda.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable style={styles.cardInfo} onPress={() => router.push(`/evento/${item.id}`)}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.data}>{formatarDataBR(item.data)}</Text>
            </Pressable>
            <Pressable style={styles.botaoExcluir} onPress={() => excluir(item)} hitSlop={8}>
              <Ionicons name="trash-outline" size={22} color={cores.perigo} />
            </Pressable>
          </View>
        )}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto, marginBottom: 16 },
  vazio: { color: cores.textoSuave, textAlign: 'center', marginTop: 32 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: cores.card,
    borderLeftWidth: 5,
    borderLeftColor: cores.destaque,
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  data: { color: cores.textoSuave },
  cardInfo: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 16,
},
  botaoExcluir: { paddingHorizontal: 16, paddingVertical: 16 },
  corpo: { flex: 1, padding: 16 },
});
