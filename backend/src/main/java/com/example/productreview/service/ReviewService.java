package com.example.productreview.service;

import com.example.productreview.dto.ReviewDTO;
import com.example.productreview.entity.Product;
import com.example.productreview.entity.Review;
import com.example.productreview.repository.ProductRepository;
import com.example.productreview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public Page<ReviewDTO> getReviewsByProductId(Long productId, Pageable pageable) {
        return reviewRepository.findByProductId(productId, pageable)
                .map(this::mapToDTO);
    }

    @Transactional
    public ReviewDTO createReview(Long productId, ReviewDTO reviewDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        review.setProduct(product);

        Review savedReview = reviewRepository.save(review);

        // Update product aggregation
        updateProductStats(product);

        return mapToDTO(savedReview);
    }

    private void updateProductStats(Product product) {
        Double avgRating = reviewRepository.findAverageRatingByProductId(product.getId());
        Long count = reviewRepository.countByProductId(product.getId());
        
        product.setAverageRating(avgRating != null ? avgRating : 0.0);
        product.setReviewCount(count.intValue());
        
        productRepository.save(product);
    }

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setContent(review.getContent());
        dto.setRating(review.getRating());
        dto.setProductId(review.getProduct().getId());
        return dto;
    }
}
