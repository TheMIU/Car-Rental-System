package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Payment {
    @Id
    private String pid;
    private String reason;
    private String bid;
    private String uid;
    private Date paidDate;
    private double amount;
    private String method;

    @ManyToOne
    @JoinColumn(name = "bid",insertable = false,updatable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "uid",insertable = false,updatable = false)
    private User user;
}
