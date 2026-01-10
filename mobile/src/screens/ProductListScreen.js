import React, { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getProducts } from '../services/api';
import { verticalScale, moderateScale } from '../utils/responsive';
import ProductCard from '../components/ProductCard';

const ProductListScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const numColumns = width > 600 ? 2 : 1;

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const response = await getProducts();
      console.log('Products response:', JSON.stringify(response, null, 2));
      
      if (response && response.data && response.data.content) {
        setProducts(response.data.content);
      } else {
        console.warn('Unexpected response structure:', response);
        setProducts([]);
      }
      setLoading(false);
    } catch (err) {
      setError(`Failed to load products: ${err.message}`);
      setLoading(false);
      console.error('Fetch error:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns} // Sütun sayısı değişince yeniden render et
        numColumns={numColumns}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, maxWidth: numColumns > 1 ? '50%' : '100%' }}>
            <ProductCard 
              product={item} 
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: verticalScale(8),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(16),
  },
});

export default ProductListScreen;
