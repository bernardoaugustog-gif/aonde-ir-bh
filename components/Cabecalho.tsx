import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../constants/identidade';

export default function Cabecalho() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.caixa, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.nome}>
        Aonde Ir <Text style={styles.bh}>BH</Text>
      </Text>
      <Text style={styles.lema}>é logo ali</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  nome: { fontSize: 30, fontWeight: 'bold', color: cores.branco },
  bh: { color: cores.destaqueClaro },
  lema: { fontSize: 14, fontStyle: 'italic', color: cores.sobrePrimaria },
});