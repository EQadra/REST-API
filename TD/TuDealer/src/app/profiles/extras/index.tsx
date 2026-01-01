import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper'

const ProfileScreen = () => {
  const user = {
    name: 'Adminuiuxer',
    email: 'adminuiuxer@adminuiuxi.com',
    avatar: 'https://picsum.photos/100',
    memberSince: '2023',
    orders: 2501,
    revenue: 12501,
    phone: '+91 9856225A588',
    dob: '15/09/2000',
    address: '13th Street, 47 W 13th St, New York, NY 10011, USA',
  }

  const ordersData = [
    { id: 1, product: 'Nike Sneakers', date: '2023-08-20', price: '$120' },
    { id: 2, product: 'Apple Watch', date: '2023-08-19', price: '$350' },
    { id: 3, product: 'Leather Jacket', date: '2023-08-10', price: '$200' },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerCard}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.member}>Member since {user.memberSince}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.orders}</Text>
            <Text style={styles.statLabel}>Orders this month</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>${user.revenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Revenue Generated</Text>
          </View>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>📧 {user.email}</Text>
        <Text style={styles.infoText}>📱 {user.phone}</Text>
        <Text style={styles.infoText}>🎂 {user.dob}</Text>
        <Text style={styles.infoText}>📍 {user.address}</Text>
      </View>

      {/* Data Table */}
      <View style={styles.tableBox}>
        <Text style={styles.tableTitle}>Recent Orders</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>

          {ordersData.map((order) => (
            <DataTable.Row key={order.id}>
              <DataTable.Cell>{order.product}</DataTable.Cell>
              <DataTable.Cell>{order.date}</DataTable.Cell>
              <DataTable.Cell numeric>{order.price}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>

      {/* ✅ Sección Extra al final */}
      <View style={styles.extraSection}>
        <Text style={styles.extraTitle}>Membership Benefits</Text>
        <Text style={styles.extraText}>✨ Exclusive discounts for premium users</Text>
        <Text style={styles.extraText}>🚚 Free shipping on all orders</Text>
        <Text style={styles.extraText}>🎁 Birthday gifts and surprises</Text>

        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 14, color: '#666' },
  member: { fontSize: 12, color: '#999', marginBottom: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 16, fontWeight: 'bold', color: '#4caf50' },
  statLabel: { fontSize: 12, color: '#666' },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoText: { fontSize: 14, color: '#444', marginBottom: 6 },
  tableBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
  },
  tableTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  extraSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  extraTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  extraText: { fontSize: 14, color: '#555', marginBottom: 6 },
  upgradeButton: {
    backgroundColor: '#4caf50',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})

export default ProfileScreen
