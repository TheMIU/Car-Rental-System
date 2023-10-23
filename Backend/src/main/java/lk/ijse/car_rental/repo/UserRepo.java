package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
    User findFirstByOrderByUserIdDesc();
}
