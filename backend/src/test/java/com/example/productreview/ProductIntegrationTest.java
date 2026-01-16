package com.example.productreview;

import com.example.productreview.dto.AuthenticationRequest;
import com.example.productreview.dto.AuthenticationResponse;
import com.example.productreview.dto.ProductDTO;
import com.example.productreview.dto.RegisterRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ProductIntegrationTest extends AbstractIntegrationTest {

    @LocalServerPort
    private Integer port;

    private String token;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;
        
        // Register a user to get a token
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("testuser_" + System.currentTimeMillis())
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
    }

    @Test
    void shouldCreateAndRetrieveProduct() {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName("Integration Test Product");
        productDTO.setCategory("Gaming");
        productDTO.setPrice(99.99);
        productDTO.setDescription("A product for integration testing");

        // 1. Create Product (Authenticated)
        Integer productId = given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(productDTO)
                .when()
                .post("/api/products")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Integration Test Product"))
                .extract()
                .path("id");

        // 2. Retrieve Product (Public)
        given()
                .when()
                .get("/api/products/" + productId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("Integration Test Product"))
                .body("price", equalTo(99.99f));
    }

    @Test
    void shouldFailValidation_WhenNameIsEmpty() {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(""); // Invalid
        productDTO.setCategory("Gaming");
        productDTO.setPrice(99.99);

        given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(productDTO)
                .when()
                .post("/api/products")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("error", equalTo("Validation Failed"))
                .body("details.name", containsString("required"));
    }
}
