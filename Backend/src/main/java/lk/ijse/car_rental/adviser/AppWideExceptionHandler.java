package lk.ijse.car_rental.adviser;

import lk.ijse.car_rental.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler({Exception.class})
    public ResponseUtil handleAllExceptions(Exception e){
        return new ResponseUtil("Error", e.getMessage(), null);
    }
}