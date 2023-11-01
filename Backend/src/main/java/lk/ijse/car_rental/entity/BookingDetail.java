package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@IdClass(BookingVehicle_PK.class)
public class BookingDetail implements Serializable {
    @Id
    private String bookId;
    @Id
    private String vid;

    private int qty;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "bookId", referencedColumnName = "bookId", insertable = false, updatable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "vid", referencedColumnName = "vid", insertable = false, updatable = false)
    private Vehicle vehicle;

}
