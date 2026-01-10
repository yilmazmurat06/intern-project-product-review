import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

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
      <Text style={[styles.category, { textAlign: 'right', marginTop: 8 }]}>Click to see details</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: moderateScale(16),
    marginVertical: verticalScale(8),
    marginHorizontal: scale(16),
    borderRadius: moderateScale(8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: moderateScale(16),
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  category: {
    fontSize: moderateScale(14),
    color: '#7f8c8d',
    marginBottom: verticalScale(8),
    fontStyle: 'italic',
  },
  description: {
    fontSize: moderateScale(14),
    color: '#34495e',
    marginBottom: verticalScale(12),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginRight: scale(8),
    color: '#f1c40f',
  },
  reviews: {
    fontSize: moderateScale(12),
    color: '#95a5a6',
  },
});

export default ProductCard;
