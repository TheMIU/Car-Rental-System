package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Booking {
    @Id
    private String bookId;
    private String userId;
    private Date bookDate;
    private Time bookTime;
    private String slip;
    private double loosDamage;
    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "booking",cascade = CascadeType.ALL)
    private List<BookingDetail> bookingDetails;
}
