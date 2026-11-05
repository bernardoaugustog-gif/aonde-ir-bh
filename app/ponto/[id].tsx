import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { cores } from '../../constants/identidade';
import { type Ponto } from '../../database/banco';

export default function DetalhePonto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [ponto, setPonto] = useState<Ponto | null>(null);

  useEffect(() => {
    async function carregar() {
      const linha = await db.getFirstAsync<Ponto>('SELECT * FROM pontos WHERE id = ?', [Number(id)]);
      setPonto(linha);
    }
    carregar();
  }, [db, id]);

  if (!ponto) {
    return <Text style={styles.carregando}>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Stack.Screen
        options={{
          title: 'Ponto turístico',
          headerStyle: { backgroundColor: cores.primaria },
          headerTintColor: cores.branco,
        }}
      />
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.rotulo}>Categoria</Text>
      <Text style={styles.valor}>{ponto.categoria}</Text>
      <Text style={styles.rotulo}>Bairro</Text>
      <Text style={styles.valor}>{ponto.bairro}</Text>
      <Text style={styles.rotulo}>Endereço</Text>
      <Text style={styles.valor}>{ponto.endereco}</Text>
      <Text style={styles.rotulo}>Sobre</Text>
      <Text style={styles.valor}>{ponto.descricao}</Text>
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
});