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
    private String pId;
    private String reason;
    private String bId;
    private String uId;
    private Date paidDate;
    private double amount;
    private String method;

    @ManyToOne
    @JoinColumn(name = "b_id",insertable = false,updatable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "u_id",insertable = false,updatable = false)
    private User user;
}
