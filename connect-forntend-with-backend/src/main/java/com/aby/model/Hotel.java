package com.aby.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private String price;
    private Double rating;
    private String distance;

    public Hotel() {}

    public Hotel(Long id, String name, String image, String price, Double rating, String distance) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.rating = rating;
        this.distance = distance;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }
}
