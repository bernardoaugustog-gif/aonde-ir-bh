import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../../constants/identidade';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false,tabBarActiveTintColor: cores.destaqueClaro,tabBarInactiveTintColor: cores.sobrePrimaria,tabBarStyle: { backgroundColor: cores.primaria, borderTopColor: cores.primaria },}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meus Eventos',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="pontos"
        options={{
          title: 'Pontos',
          tabBarIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color as string} />,
      }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color as string} />,
        }}
      />
    </Tabs>
  );
}