package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LoginRepo extends JpaRepository<Login, String> {
    @Query(value = "SELECT * FROM login ORDER BY CAST(SUBSTRING(loginId, 2) AS UNSIGNED)", nativeQuery = true)
    List<Login> findAllOrderedBySubstring();

    @Query(value = "SELECT * FROM login ORDER BY CAST(SUBSTRING(loginId, 2) AS UNSIGNED) DESC limit 1", nativeQuery = true)
    String findLastRecord();

    boolean existsByLoginNameEquals(String loginName);

    boolean existsByPasswordEquals(String password);

    Login findLoginByLoginName(String loginName);
}
