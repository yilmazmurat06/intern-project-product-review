import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createReview } from '../services/api';
import { verticalScale, moderateScale, scale } from '../utils/responsive';

const AddReviewScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter a review');
      return;
    }

    setSubmitting(true);
    try {
      await createReview(productId, {
        rating,
        content,
        productId // Backend expects this in DTO though path variable is also used
      });
      Alert.alert('Success', 'Review submitted successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Review submission error:', error);
      const errorMessage = error.message || 'Failed to submit review';
      Alert.alert('Error', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Text style={[styles.star, star <= rating ? styles.starSelected : styles.starUnselected]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.ratingValue}>{rating} / 5</Text>

      <Text style={styles.label}>Review</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Write your review here..."
        value={content}
        onChangeText={setContent}
      />

      <Button 
        title={submitting ? "Submitting..." : "Submit Review"} 
        onPress={handleSubmit} 
        disabled={submitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  starButton: {
    padding: moderateScale(5),
  },
  star: {
    fontSize: moderateScale(32),
  },
  starSelected: {
    color: '#f1c40f',
  },
  starUnselected: {
    color: '#bdc3c7',
  },
  ratingValue: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
    color: '#7f8c8d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    height: verticalScale(120),
    textAlignVertical: 'top',
    marginBottom: verticalScale(20),
  },
});

export default AddReviewScreen;
