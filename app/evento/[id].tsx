import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { type Evento } from '../../database/banco';
import { cores } from '../../constants/identidade';
import { Ionicons } from '@expo/vector-icons';
import { confirmar } from '../../utils/confirmar';
import { formatarDataBR } from '../../utils/data';

export default function DetalheEvento() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    async function carregar() {
      const linha = await db.getFirstAsync<Evento>('SELECT * FROM eventos WHERE id = ?', [Number(id)]);
      setEvento(linha);
    }
    carregar();
  }, [db, id]);
  
  async function excluir() {
  if (!evento) return;
  const confirmou = await confirmar('Excluir evento', `Deseja excluir "${evento.nome}"?`);
  if (!confirmou) return;
  await db.runAsync('DELETE FROM eventos WHERE id = ?', [evento.id]);
  router.back();
}
  
  if (!evento) {
    return <Text style={styles.carregando}>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Stack.Screen options={{title: 'Detalhe do evento', headerStyle: { backgroundColor: cores.primaria }, headerTintColor: cores.branco,}}/>
      <Text style={styles.nome}>{evento.nome}</Text>
      <Text style={styles.rotulo}>Local</Text>
      <Text style={styles.valor}>{evento.local}</Text>
      <Text style={styles.rotulo}>Data</Text>
      <Text style={styles.valor}>{formatarDataBR(evento.data)}</Text>
      <Text style={styles.rotulo}>Descrição</Text>
      <Text style={styles.valor}>{evento.descricao || 'Sem descrição.'}</Text>
      <Pressable style={styles.botaoExcluir} onPress={excluir}>
      <Ionicons name="trash-outline" size={20} color={cores.branco} />
      <Text style={styles.botaoExcluirTexto}>Excluir evento</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16 },
  carregando: { padding: 16, color: cores.texto },
  nome: { fontSize: 24, fontWeight: 'bold', color: cores.primaria, marginBottom: 16 },
  rotulo: { fontSize: 13, color: cores.textoSuave, marginTop: 12 },
  valor: { fontSize: 16, color: cores.texto },
  botaoExcluir: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  backgroundColor: cores.perigo,
  padding: 14,
  borderRadius: 8,
  marginTop: 32,
},
botaoExcluirTexto: { color: cores.branco, fontWeight: 'bold' },
});