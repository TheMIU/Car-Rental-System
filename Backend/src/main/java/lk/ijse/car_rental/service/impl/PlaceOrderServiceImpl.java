package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.BookingDTO;
import lk.ijse.car_rental.service.PlaceOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {
    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(BookingDTO dto) {

    }
}
