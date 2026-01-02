package com.example.productreview;

import com.example.productreview.entity.Product;
import com.example.productreview.entity.Review;
import com.example.productreview.repository.ProductRepository;
import com.example.productreview.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class ProductReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductReviewApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository productRepository, ReviewRepository reviewRepository) {
		return args -> {
			System.out.println("------------------------------------------------");
			System.out.println("Checking database status...");
			long count = productRepository.count();
			System.out.println("Current product count: " + count);

			// Check if data already exists
			if (count > 0) {
				System.out.println("Data already exists. Skipping initialization.");
				System.out.println("------------------------------------------------");
				return;
			}

			System.out.println("Initializing mock data...");

			// Create Products
			Product p1 = new Product();
			p1.setName("iPhone 15 Pro");
			p1.setDescription("The latest iPhone with titanium design.");
			p1.setCategory("Electronics");
			p1.setPrice(999.99);
			p1.setAverageRating(4.5);
			p1.setReviewCount(2);

			Product p2 = new Product();
			p2.setName("Samsung Galaxy S24");
			p2.setDescription("AI powered smartphone.");
			p2.setCategory("Electronics");
			p2.setPrice(899.99);
			p2.setAverageRating(5.0);
			p2.setReviewCount(1);

			Product p3 = new Product();
			p3.setName("Sony WH-1000XM5");
			p3.setDescription("Noise cancelling headphones.");
			p3.setCategory("Audio");
			p3.setPrice(349.99);
			p3.setAverageRating(0.0);
			p3.setReviewCount(0);

			productRepository.saveAll(Arrays.asList(p1, p2, p3));
			System.out.println("Products saved.");

			// Create Reviews
			Review r1 = new Review();
			r1.setContent("Great phone, love the camera!");
			r1.setRating(5);
			r1.setProduct(p1);

			Review r2 = new Review();
			r2.setContent("Battery life could be better.");
			r2.setRating(4);
			r2.setProduct(p1);

			Review r3 = new Review();
			r3.setContent("Best Android experience.");
			r3.setRating(5);
			r3.setProduct(p2);

			reviewRepository.saveAll(Arrays.asList(r1, r2, r3));
			System.out.println("Reviews saved.");

			System.out.println("Mock data initialized successfully!");
			System.out.println("------------------------------------------------");
		};
	}

}
