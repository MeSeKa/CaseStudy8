import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PromoCodeInput = ({ promoCode, setPromoCode, onApply }) => {
  return (
    <View style={styles.promoContainer}>
      <TextInput
        style={styles.promoInput}
        placeholder="Promosyon Kodunu Girin"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <Button title="Apply" onPress={onApply} />
    </View>
  );
};

const styles = StyleSheet.create({
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  promoInput: {
    flex: 1,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  }
});

export default PromoCodeInput;
