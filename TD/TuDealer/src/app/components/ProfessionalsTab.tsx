import React, { useState } from 'react';
import { View, Text, FlatList, Image, Modal, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Professional = {
  id: string;
  name: string;
  photo: string;
  profession: string;
  specialty?: string;
  experience: string;
  rating: number;
  description: string;
};

const professionalsData = {
  Doctores: [
    {
      id: '1',
      name: 'Dr. Carlos Méndez',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      profession: 'Cardiólogo',
      specialty: 'Cardiología Intervencionista',
      experience: '15 años',
      rating: 4.8,
      description: 'Especialista en procedimientos cardíacos mínimamente invasivos con amplia experiencia en angioplastias.'
    },
    {
      id: '2',
      name: 'Dra. Ana López',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      profession: 'Pediatra',
      specialty: 'Neonatología',
      experience: '12 años',
      rating: 4.9,
      description: 'Especializada en cuidado de recién nacidos y seguimiento de desarrollo infantil.'
    },
    {
      id: '3',
      name: 'Dr. Javier Ruiz',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      profession: 'Ortopedista',
      specialty: 'Cirugía de Columna',
      experience: '18 años',
      rating: 4.7,
      description: 'Experto en tratamiento de lesiones de columna vertebral y cirugías reconstructivas.'
    }
  ],
  Abogados: [
    {
      id: '4',
      name: 'Lic. María González',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      profession: 'Enfermera',
      specialty: 'Cuidados Intensivos',
      experience: '8 años',
      rating: 4.9,
      description: 'Especialista en cuidados críticos y manejo de pacientes en UCI.'
    },
    {
      id: '5',
      name: 'Lic. Roberto Sánchez',
      photo: 'https://randomuser.me/api/portraits/men/85.jpg',
      profession: 'Enfermero',
      specialty: 'Emergencias',
      experience: '10 años',
      rating: 4.6,
      description: 'Experto en atención de emergencias y primeros auxilios avanzados.'
    }
  ]
};

const ProfessionalsTab = () => {
  const [activeTab, setActiveTab] = useState<'Doctores' | 'Enfermeros'>('Doctores');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetails = (professional: Professional) => {
    setSelectedProfessional(professional);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Doctores' && styles.activeTab]}
          onPress={() => setActiveTab('Doctores')}
        >
          <Text style={[styles.tabText, activeTab === 'Doctores' && styles.activeTabText]}>Doctores</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Enfermeros' && styles.activeTab]}
          onPress={() => setActiveTab('Enfermeros')}
        >
          <Text style={[styles.tabText, activeTab === 'Enfermeros' && styles.activeTabText]}>Enfermeros</Text>
        </TouchableOpacity>
      </View>

      {/* Professionals List */}
      <FlatList
        data={professionalsData[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.professionalCard}>
            <View style={styles.professionalInfo}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.profession}>{item.profession}</Text>
                {item.specialty && <Text style={styles.specialty}>{item.specialty}</Text>}
              </View>
            </View>
            <TouchableOpacity 
              style={styles.detailButton}
              onPress={() => openDetails(item)}
            >
              <MaterialIcons name="info-outline" size={24} color="#2A59FE" />
              <Text style={styles.detailButtonText}>Detalle</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Professional Details Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedProfessional && (
              <>
                <Image 
                  source={{ uri: selectedProfessional.photo }} 
                  style={styles.modalPhoto} 
                />
                <Text style={styles.modalName}>{selectedProfessional.name}</Text>
                <Text style={styles.modalProfession}>{selectedProfessional.profession}</Text>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Especialidad:</Text>
                  <Text style={styles.detailValue}>{selectedProfessional.specialty}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Experiencia:</Text>
                  <Text style={styles.detailValue}>{selectedProfessional.experience}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Calificación:</Text>
                  <Text style={styles.detailValue}>{selectedProfessional.rating}/5</Text>
                </View>
                
                <Text style={styles.description}>{selectedProfessional.description}</Text>
                
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF5E1', // verde pastel muy suave
    padding: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#A7D7A8', // verde pastel medio
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#86C79A', // verde pastel más intenso
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5A4F', // tono gris verdoso
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  professionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4633',
    marginBottom: 4,
  },
  profession: {
    fontSize: 14,
    color: '#67A97A', // verde suave para destacar
    fontWeight: '500',
  },
  specialty: {
    fontSize: 12,
    color: '#6B7B6E', // gris verdoso
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  detailButtonText: {
    marginLeft: 4,
    color: '#67A97A',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#2D4633',
  },
  modalProfession: {
    fontSize: 16,
    color: '#67A97A',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#2D4633',
    width: 100,
  },
  detailValue: {
    flex: 1,
    color: '#6B7B6E',
  },
  description: {
    marginTop: 16,
    color: '#445C4F',
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#67A97A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default ProfessionalsTab;