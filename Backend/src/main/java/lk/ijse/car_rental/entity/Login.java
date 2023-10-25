package lk.ijse.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Login {
    @Id
    private String loginId;
    @Column(unique = true)
    private String loginName;
    private String password;
    private String type;
}