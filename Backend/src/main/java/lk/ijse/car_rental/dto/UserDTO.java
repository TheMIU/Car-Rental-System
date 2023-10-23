package lk.ijse.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String userId;
    private String name;
    private String address;
    private double salary;
    private String contact;
    private String email;
    private String nic_num;
    private String license_num;
    private MultipartFile id_img_front;
    private MultipartFile id_img_back;
    private boolean editable;
    private boolean is_approved;
}
