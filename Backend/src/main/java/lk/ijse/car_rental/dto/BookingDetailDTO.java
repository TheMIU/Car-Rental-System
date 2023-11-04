package lk.ijse.car_rental.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.ijse.car_rental.entity.Booking;
import lk.ijse.car_rental.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingDetailDTO {
    private String bookId;
    private String vid;
    private String driverId;
    private boolean completed;
    private Date bookDateFrom;
    private Date bookDateTo;
    private double lossDamage;
    private String slipName;

    @JsonIgnore
    private BookingDTO booking;
    @JsonIgnore
    private VehicleDTO vehicle;
}
