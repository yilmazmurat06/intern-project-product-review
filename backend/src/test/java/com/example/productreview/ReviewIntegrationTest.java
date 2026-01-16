package com.example.productreview;

import com.example.productreview.dto.ProductDTO;
import com.example.productreview.dto.RegisterRequest;
import com.example.productreview.dto.ReviewDTO;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ReviewIntegrationTest extends AbstractIntegrationTest {

    @LocalServerPort
    private Integer port;

    private String token;
    private Long productId;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;

        // Register User
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("reviewuser_" + System.currentTimeMillis())
                .password("password")
                .build();

        token = given()
                .contentType(ContentType.JSON)
                .body(registerRequest)
                .when()
                .post("/api/auth/register")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .path("token");

        // Create Product
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName("Reviewable Product");
        productDTO.setCategory("Books");
        productDTO.setPrice(20.0);
        productDTO.setDescription("Book Description");

        productId = given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(productDTO)
                .when()
                .post("/api/products")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .path("id").toString().transform(Long::parseLong);
    }

    @Test
    void shouldAddReviewToProduct() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setContent("Great book!");
        reviewDTO.setRating(5);
        reviewDTO.setProductId(productId);

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(reviewDTO)
                .when()
                .post("/api/products/" + productId + "/reviews")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("content", equalTo("Great book!"))
                .body("rating", equalTo(5));
    }
}
