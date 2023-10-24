package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User, String> {
    @Query(value = "SELECT * FROM user ORDER BY CAST(SUBSTRING(userId, 2) AS UNSIGNED)", nativeQuery = true)
    List<User> findAllOrderedBySubstring();

    @Query(value = "SELECT userId FROM user ORDER BY CAST(SUBSTRING(userId, 2) AS UNSIGNED) DESC limit 1", nativeQuery = true)
    String findLastRecord();

    User findUserByUserId(String id);
}
