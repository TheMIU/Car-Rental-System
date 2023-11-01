package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepo extends JpaRepository<Booking,String> {
    @Modifying
    @Query("UPDATE Booking b SET b.approved = true WHERE b.bookId = :bookId")
    void approveBooking(@Param("bookId") String bookId);
}
