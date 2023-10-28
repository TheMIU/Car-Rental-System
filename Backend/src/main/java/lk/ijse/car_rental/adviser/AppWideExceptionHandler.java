package lk.ijse.car_rental.adviser;

import lk.ijse.car_rental.util.ResponseUtil;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseUtil handleSameUserIDExceptions(Exception e){
        return new ResponseUtil("Error", "User name exists! Try another user name. "+e, null);
    }

    @ExceptionHandler({Exception.class})
    public ResponseUtil handleAllExceptions(Exception e){
        return new ResponseUtil("Error", e.getMessage(), null);
    }
}