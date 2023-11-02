package lk.ijse.car_rental.service;

import lk.ijse.car_rental.dto.PaymentDTO;
import java.util.List;

public interface PaymentService {
    void savePayment(PaymentDTO dto);

    List<PaymentDTO> getAllPayments();

    void updatePayment(PaymentDTO dto);

    void deletePayment(String id);
}
