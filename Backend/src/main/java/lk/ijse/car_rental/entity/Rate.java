package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Rate {
    @Id
    private String rId;
    private double dailyRate;
    private double freeKmDay;
    private double monthlyRate;
    private double freeKmMonth;
    private double extraKm;
}

