package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginDTO {
    private String loginId;
    private String loginName;
    private String password;
    private String type;
}