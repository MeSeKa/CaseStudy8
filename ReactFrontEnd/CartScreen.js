import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import CartItem from './components/CartItem';
import PromoCodeInput from './components/PromoCodeInput';

const initialCartItems = [
  {
    id: '1',
    name: 'Peptide Complex Serum',
    price: 18.99,
    image: 'https://example.com/image1.jpg',
    quantity: 1
  },
  {
    id: '2',
    name: 'Brightening & Lightening Vitamin C Serum',
    price: 19.99,
    image: 'https://example.com/image2.jpg',
    quantity: 1
  }
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü kontrol etmek için

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    return (subtotal - discount).toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    setModalVisible(true); // Ödeme modalını aç
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <PromoCodeInput
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        onApply={applyPromoCode}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.subtotalText}>Ara Toplam: ${getSubtotal().toFixed(2)}</Text>
        {discount > 0 && (
          <Text style={styles.discountText}>İndirim: -${discount.toFixed(2)}</Text>
        )}
        <Text style={styles.totalText}>Genel Toplam: ${getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Ödeme İşlemine Devam Et</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ödeme İşlemi Başlatıldı</Text>
            <Text style={styles.modalText}>Toplam: ${getTotalPrice()}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  flatListContainer: {
    paddingBottom: 80,
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#333',
  },
  discountText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#FF6347',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
    marginTop: 5,
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
