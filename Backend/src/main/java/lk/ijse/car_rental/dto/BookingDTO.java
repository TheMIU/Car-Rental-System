package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingDTO {
    private String bookId;
    private String userId;
    private Date bookDate;
    private Time bookTime;
    private String slip;
    private double loosDamage;
    private Boolean approved;

    private UserDTO user;
    private List<BookingDetailDTO> bookingDetails;
}
