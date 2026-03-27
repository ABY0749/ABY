package com.aby.controller;

import com.aby.model.Booking;
import com.aby.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/bookings")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @GetMapping("/admin/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PutMapping("/admin/bookings/{id}/status")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestBody String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        // Remove quotes if they are sent in the body
        String cleanStatus = status.replace("\"", "");
        booking.setStatus(cleanStatus);
        return bookingRepository.save(booking);
    }

    @GetMapping("/bookings/search")
    public List<Booking> searchBookingsByName(@RequestParam String name) {
        return bookingRepository.findByNameIgnoreCase(name);
    }

    @GetMapping("/bookings/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id).orElseThrow();
    }

    @PutMapping("/bookings/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setCheckIn(updatedBooking.getCheckIn());
        booking.setCheckOut(updatedBooking.getCheckOut());
        booking.setName(updatedBooking.getName());
        booking.setHotelName(updatedBooking.getHotelName());
        booking.setRooms(updatedBooking.getRooms());
        return bookingRepository.save(booking);
    }
}
