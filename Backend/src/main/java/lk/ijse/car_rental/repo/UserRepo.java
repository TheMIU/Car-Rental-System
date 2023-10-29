package lk.ijse.car_rental.repo;

import lk.ijse.car_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepo extends JpaRepository<User, String> {
    @Query(value = "SELECT * FROM user ORDER BY CAST(SUBSTRING(userId, 2) AS UNSIGNED)", nativeQuery = true)
    List<User> findAllOrderedBySubstring();

    @Query(value = "SELECT userId FROM user WHERE type='customer' ORDER BY CAST(SUBSTRING(userId, 2) AS UNSIGNED) DESC limit 1", nativeQuery = true)
    String findLastRecord();

    @Query(value = "select editable from user where userId=?", nativeQuery = true)
    boolean findIsApprovedByUserID(String userId);

    @Modifying
    @Query("UPDATE User u SET u.editable = true WHERE u.userId = :userId")
    int changeIsApprovedTrue(@Param("userId") String userId);

    @Modifying
    @Query("UPDATE User u SET u.editable = false WHERE u.userId = :userId")
    int changeIsApprovedFalse(@Param("userId") String userId);

    User findUserByUserId(String id);

    @Modifying
    @Query("UPDATE User u SET u.approved = true WHERE u.userId = :userId")
    void approveUser(@Param("userId") String userId);
}
