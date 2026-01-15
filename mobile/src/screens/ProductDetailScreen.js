import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, FlatList } from 'react-native';
import { getProductById, getReviewsByProduct } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productRes, reviewsRes] = await Promise.all([
        getProductById(productId),
        getReviewsByProduct(productId)
      ]);
      setProduct(productRes.data);
      setReviews(reviewsRes.data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [productId])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewRating}>{'⭐'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.reviewContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{product.averageRating ? product.averageRating.toFixed(1) : 'N/A'}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{product.reviewCount}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet.</Text>
          ) : (
            reviews.map(review => (
                <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
                    </View>
                    <Text style={styles.reviewContent}>{review.content}</Text>
                </View>
            ))
          )}
        </View>
      </ScrollView>
      
      <View style={styles.fabContainer}>
        <Button 
          title="Write a Review" 
          onPress={() => navigation.navigate('AddReview', { productId: product.id })} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: moderateScale(20),
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  price: {
    fontSize: moderateScale(20),
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  section: {
    padding: moderateScale(20),
  },
  category: {
    fontSize: moderateScale(16),
    color: '#7f8c8d',
    marginBottom: verticalScale(12),
    fontStyle: 'italic',
  },
  description: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(24),
    color: '#2c3e50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(20),
    backgroundColor: '#f1f2f6',
    marginVertical: verticalScale(10),
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: '#7f8c8d',
  },
  reviewsSection: {
    padding: moderateScale(20),
    paddingBottom: verticalScale(80), // Space for FAB
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  reviewRating: {
    fontSize: moderateScale(14),
  },
  reviewContent: {
    fontSize: moderateScale(14),
    color: '#34495e',
  },
  noReviews: {
    fontStyle: 'italic',
    color: '#95a5a6',
  },
  fabContainer: {
    padding: moderateScale(16),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
});

export default ProductDetailScreen;
