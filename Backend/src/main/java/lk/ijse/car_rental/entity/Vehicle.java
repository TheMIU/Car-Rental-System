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
public class Vehicle {
    @Id
    private String vId;
    private String regNo;
    private String brand;
    private String type;
    private String color;
    private int passengers;
    private String img;
    private String transmissionType;
    private String fuelType;
    private String status;

    @ManyToOne
    @JoinColumn(name = "rid",insertable = false,updatable = false)
    private Rate rate;
}
