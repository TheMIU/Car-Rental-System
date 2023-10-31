package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VehicleDTO {
    private String vId;
    private String regNo;
    private String brand;
    private String type;
    private String color;
    private int passengers;
    private String transmissionType;
    private String fuelType;
    private String status;

    private RateDTO rate;
}
