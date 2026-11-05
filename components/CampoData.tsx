import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../constants/identidade';
import { formatarDataBR } from '../utils/data';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

type Props = {
  valor: string;
  onChange: (dataIso: string) => void;
};

export default function CampoData({ valor, onChange }: Props) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <Pressable style={styles.campo} onPress={() => setAberto(true)}>
        <Text style={valor ? styles.texto : styles.placeholder}>
          {valor ? formatarDataBR(valor) : 'Selecione a data'}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={cores.primaria} />
      </Pressable>

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <Pressable style={styles.fundo} onPress={() => setAberto(false)}>
          <Pressable style={styles.caixa} onPress={() => {}}>
            <Calendar
              current={valor || undefined}
              markedDates={valor ? { [valor]: { selected: true, selectedColor: cores.primaria } } : {}}
              onDayPress={(dia) => {
                onChange(dia.dateString);
                setAberto(false);
              }}
              theme={{
                arrowColor: cores.primaria,
                monthTextColor: cores.primaria,
                todayTextColor: cores.destaque,
                selectedDayBackgroundColor: cores.primaria,
                selectedDayTextColor: cores.branco,
                textSectionTitleColor: cores.textoSuave,
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  campo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  texto: { color: cores.texto },
  placeholder: { color: cores.textoSuave },
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  caixa: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 8,
    overflow: 'hidden',
  },
});