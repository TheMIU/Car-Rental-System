package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class User {
    @Id
    private String user_id;
    private String name;
    private String address;
    private double salary;
    private String contact;
    private String email;
    private String nic_num;
    private String license_num;
    private String id_img;
    private boolean editable;
    private boolean is_approved;
}
