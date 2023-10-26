package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Booking {
    @Id
    private String bookId;
    private String userId;
    private String driverId;
    private Date bookDate;
    private Time bookTime;
    private String slip;
    private double loosDamage;
    private Boolean isApproved;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;
}
