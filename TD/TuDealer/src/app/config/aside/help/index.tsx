import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <MaterialCommunityIcons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {open && <Text style={styles.accordionContent}>{content}</Text>}
    </View>
  );
};

export default function HelpScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ayuda</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Política</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Glosario</Text>
        </TouchableOpacity>
      </View>

      <AccordionItem
        title="Política de Uso Responsable"
        content="TueDealer es una plataforma que conecta a usuarios con profesionales, comercios y asociaciones vinculadas al cannabis medicinal y legal en Latinoamérica."
      />
      <AccordionItem
        title="Política y privacidad de datos"
        content="Detalles sobre privacidad de datos aquí..."
      />
      <AccordionItem
        title="Política de verificación de profesionales"
        content="Detalles sobre verificación de profesionales aquí..."
      />
      <AccordionItem
        title="Política de productos y servicios"
        content="Detalles sobre productos y servicios aquí..."
      />
      <AccordionItem
        title="Términos y condiciones"
        content="Detalles de términos y condiciones aquí..."
      />

      <View style={styles.footerIcon}>
        <MaterialCommunityIcons name="leaf" size={48} color="#2D6A4F" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  tabContainer: { flexDirection: 'row', marginBottom: 16 },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: { borderBottomColor: '#2D6A4F' },
  tabText: { color: '#555', fontWeight: '500' },
  tabTextActive: { color: '#2D6A4F', fontWeight: '700' },
  accordionContainer: { marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  accordionTitle: { fontSize: 16, fontWeight: '500' },
  accordionContent: { padding: 12, color: '#555' },
  footerIcon: { alignItems: 'center', marginTop: 32, marginBottom: 16 },
});
