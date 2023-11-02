package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.PaymentDTO;
import lk.ijse.car_rental.entity.Payment;
import lk.ijse.car_rental.repo.PaymentRepo;
import lk.ijse.car_rental.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public void savePayment(PaymentDTO dto) {
        paymentRepo.save(mapper.map(dto, Payment.class));
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        List<Payment> all = paymentRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());
    }

    @Override
    public void updatePayment(PaymentDTO dto) {
        if (!paymentRepo.existsById(dto.getPid())) throw new RuntimeException("not exists!");
        paymentRepo.save(mapper.map(dto, Payment.class));
    }

    @Override
    public void deletePayment(String id) {
        paymentRepo.deleteById(id);
    }
}
