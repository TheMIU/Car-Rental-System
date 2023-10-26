package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingDetailDTO {
    private BookingDTO booking;
    private VehicleDTO vehicle;

    private Integer qty;
    private Boolean isCompleted;
}
