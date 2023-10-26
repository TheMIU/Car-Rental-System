package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class User{
    @Id
    private String userId;
    private String name;
    private String address;
    private String type;
    private double salary;
    private String contact;
    private String email;
    private String nic_num;
    private String license_num;
    private String id_img_front;
    private String id_img_back;
    private boolean editable;
    private boolean is_approved;

    @OneToOne
    @JoinColumn(name = "loginId",insertable = false,updatable = false)
    private Login login;
}
