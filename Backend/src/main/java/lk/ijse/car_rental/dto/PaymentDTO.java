package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentDTO {
    private String pId;
    private String reason;
    private String bId;
    private String uId;
    private Date paidDate;
    private double amount;
    private String method;

    private BookingDTO booking;
    private UserDTO user;
}