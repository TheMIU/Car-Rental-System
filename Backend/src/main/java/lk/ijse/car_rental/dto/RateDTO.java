package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RateDTO {
    private String rId;
    private double dailyRate;
    private double freeKmDay;
    private double monthlyRate;
    private double freeKmMonth;
    private double extraKm;
}

