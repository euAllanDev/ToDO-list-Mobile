import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';

const generateId = () => Math.random().toString(36).substr(2, 9);

const TaskItem = ({ task, onRemove }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleRemove = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onRemove(task.id));
  };

  return (
    <Animated.View style={[styles.taskItem, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.taskDot} />
      <Text style={styles.taskText}>{task.text}</Text>
      <TouchableOpacity onPress={handleRemove} style={styles.removeButton} activeOpacity={0.7}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// teste pushhh

export default function App() {
  const [tasks, setTasks] = useState([
   
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks(prev => [{ id: generateId(), text: trimmed }, ...prev]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        
        <View style={styles.header}>
          <Text style={styles.headerLabel}>MINHAS TAREFAS</Text>
          <Text style={styles.headerCount}>{tasks.length} pendente{tasks.length !== 1 ? 's' : ''}</Text>
        </View>

        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Nova tarefa..."
            placeholderTextColor="#555"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addTask}
            returnKeyType="done"
            selectionColor="#e8ff47"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

       
        <View style={styles.divider} />

       
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyText}>Tudo feito!</Text>
            <Text style={styles.emptySubText}>Adicione uma nova tarefa acima</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem task={item} onRemove={removeTask} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    marginBottom: 28,
  },
  headerLabel: {
    fontSize: 11,
    letterSpacing: 4,
    color: '#e8ff47',
    fontWeight: '700',
    marginBottom: 4,
  },
  headerCount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  addButton: {
    backgroundColor: '#e8ff47',
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: '#0d0d0d',
    fontWeight: '300',
    lineHeight: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e1e1e',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 40,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222222',
  },
  taskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e8ff47',
    marginRight: 14,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: '400',
    lineHeight: 22,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  removeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: '#555',
  },
});