import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { cores } from '@/constants/identidade';
import Cabecalho from '../../components/Cabecalho';
import CampoData from '../../components/CampoData';



export default function Cadastro() {
  const db = useSQLiteContext();
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  async function salvar() {
  if (!nome.trim() || !local.trim() || !data.trim()) {
    setErro('Preencha nome, local e data.');
    return;
  }
  setErro('');
  await db.runAsync(
    'INSERT INTO eventos (nome, local, data, descricao) VALUES (?, ?, ?, ?)',
    [nome.trim(), local.trim(), data.trim(), descricao.trim()]
  );
  setNome('');
  setLocal('');
  setData('');
  setDescricao('');
  Alert.alert('Pronto', 'Evento cadastrado!');
}

  return (
    <View style={styles.tela}>
    <Cabecalho />
    <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Cadastrar evento</Text>
        <TextInput style={styles.campo} placeholder="Nome do evento" placeholderTextColor="#888" value={nome} onChangeText={setNome} />
        <TextInput style={styles.campo} placeholder="Local" placeholderTextColor="#888" value={local} onChangeText={setLocal} />
        <CampoData valor={data} onChange={setData} />
        <TextInput
          style={[styles.campo, styles.campoGrande]}
          placeholder="Descrição"
          placeholderTextColor="#888"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <Pressable style={styles.botao} onPress={salvar}>
          <Text style={styles.botaoTexto}>Salvar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto, marginBottom: 16 },
  campo: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: cores.texto,
  },
  campoGrande: { height: 100, textAlignVertical: 'top' },
  erro: { color: cores.perigo, marginBottom: 12 },
  botao: { backgroundColor: cores.primaria, padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: cores.branco, fontWeight: 'bold' },
});