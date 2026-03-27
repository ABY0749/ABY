package com.aby.config;

import com.aby.model.Hotel;
import com.aby.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hotelRepository.count() == 0) {
            Hotel h1 = new Hotel(null, "CROWN suites",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop&q=60",
                    "$550/night", 4.9, "0.5 miles");
            Hotel h2 = new Hotel(null, "HOME STAY", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=60", "$550/night", 5.0, "1.2 miles");
            Hotel h3 = new Hotel(null, "SIX Seasons Resort",
                    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop&q=60",
                    "$550/night", 4.8, "2.0 miles");
            Hotel h4 = new Hotel(null, "Waldorf night",
                    "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=600&auto=format&fit=crop&q=60",
                    "$550/night", 4.7, "0.8 miles");

            hotelRepository.saveAll(Arrays.asList(h1, h2, h3, h4));
            System.out.println("Sample Hotels Initialized");
        }
    }
}
