import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../constants/identidade';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ops!' }} />
      <View style={styles.tela}>
        <Text style={styles.titulo}>Essa tela não existe.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkTexto}>Voltar para o início</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: cores.fundo },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.texto },
  link: { marginTop: 16 },
  linkTexto: { color: cores.primaria, fontWeight: 'bold' },
});