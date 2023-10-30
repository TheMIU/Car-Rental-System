package lk.ijse.car_rental.controller;

import lk.ijse.car_rental.dto.RateDTO;
import lk.ijse.car_rental.service.RatesService;
import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/rates")
public class RatesController {
    @Autowired
    private RatesService service;

    // get all
    @GetMapping
    public ResponseUtil getAllRates() {
        return new ResponseUtil("Ok", "Get all Success", service.getAllRates());
    }

    // save
    @PostMapping
    public ResponseUtil saveRate(@ModelAttribute RateDTO dto) throws Exception {
        service.saveRate(dto);
        return new ResponseUtil("Ok", "Save Success", null);
    }

    // update
    @PutMapping
    public ResponseUtil updateRate(@RequestBody RateDTO dto) {
        System.out.println(dto);
        service.updateRate(dto);
        return new ResponseUtil("Ok", "Update Success", dto);
    }

    // delete
    @DeleteMapping("/{rId}")
    public ResponseUtil deleteRate(@PathVariable String rId) {
        service.deleteRate(rId);
        return new ResponseUtil("Ok", "Delete Success", rId);
    }
}

