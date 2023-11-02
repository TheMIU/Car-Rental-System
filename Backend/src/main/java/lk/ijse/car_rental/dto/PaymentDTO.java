package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentDTO {
    private String pid;
    private String reason;
    private String bid;
    private String uid;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date paidDate;

    private double amount;
    private String method;

    private BookingDTO booking;
    private UserDTO user;
}
