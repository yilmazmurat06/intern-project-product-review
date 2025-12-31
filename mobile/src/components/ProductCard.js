import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.category}>{product.category}</Text>
      <Text numberOfLines={2} style={styles.description}>{product.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.rating}>⭐ {product.averageRating ? product.averageRating.toFixed(1) : 'N/A'}</Text>
        <Text style={styles.reviews}>({product.reviewCount} reviews)</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#f1c40f',
  },
  reviews: {
    fontSize: 12,
    color: '#95a5a6',
  },
});

export default ProductCard;
