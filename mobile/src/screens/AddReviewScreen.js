import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createReview } from '../services/api';

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
      console.error(error);
      Alert.alert('Error', 'Failed to submit review');
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
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
  },
  star: {
    fontSize: 32,
  },
  starSelected: {
    color: '#f1c40f',
  },
  starUnselected: {
    color: '#bdc3c7',
  },
  ratingValue: {
    fontSize: 16,
    marginBottom: 20,
    color: '#7f8c8d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

export default AddReviewScreen;
