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
public class BookingDetail implements Serializable{
    @Id
    @ManyToOne
    @JoinColumn(name = "bookid", insertable = false, updatable = false)
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "vid", insertable = false, updatable = false)
    private Vehicle vehicle;

    private Integer qty;
    private Boolean isCompleted;
}
