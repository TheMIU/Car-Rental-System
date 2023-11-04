package lk.ijse.car_rental.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

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

    private String driverId;
    private boolean completed;

    private Date bookDateFrom;
    private Date bookDateTo;
    private double lossDamage;
    private String slipName;

    @ManyToOne
    @JoinColumn(name = "bookId", referencedColumnName = "bookId", insertable = false, updatable = false)
    private Booking booking;
    
    @ManyToOne
    @JoinColumn(name = "vid", referencedColumnName = "vid", insertable = false, updatable = false)
    private Vehicle vehicle;

}
