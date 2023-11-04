package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.BookingDTO;
import lk.ijse.car_rental.entity.Booking;
import lk.ijse.car_rental.repo.BookingRepo;
import lk.ijse.car_rental.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private BookingRepo bookingRepo;

    String bookingSlipsFolderPath;

    public BookingServiceImpl() {
        checkIdUploadFolderCreated();
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        List<Booking> all = bookingRepo.findAll();
        return mapper.map(all, new TypeToken<List<BookingDTO>>() {
        }.getType());
    }

    @Override
    public void approveBooking(String bookId) {
        bookingRepo.approveBooking(bookId);
    }

    @Override
    public String getNextBookId() {
        String lastBookId = bookingRepo.findLastRecord();
        System.out.println("Last : " + lastBookId);

        if (lastBookId == null) {
            return "B1";
        } else {
            String[] lastNum = lastBookId.split("B");
            int lastId = Integer.parseInt(lastNum[1]);
            int newId = lastId + 1;

            System.out.println("New : " + newId);

            return "B" + newId;
        }
    }

    @Override
    public void uploadImage(MultipartFile image, String imageName) throws IOException {
        image.transferTo(new File(bookingSlipsFolderPath + imageName));
    }

    @Override
    public String getImage(String imageName) throws IOException {
        Path imagePath = Paths.get(bookingSlipsFolderPath + imageName);

        if (Files.exists(imagePath)) {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return Base64.getEncoder().encodeToString(imageBytes);
        } else {
            return null;
        }
    }

    @Override
    public void deleteImages(String imageName) {
        new File(bookingSlipsFolderPath + imageName).delete();
    }

    public void checkIdUploadFolderCreated() {
        // get user directory and create folders
        bookingSlipsFolderPath = System.getProperty("user.dir") + File.separator
                + "Car Rental System" + File.separator + "uploads" + File.separator + "slipsImages" + File.separator;
        System.out.println("uploadsFolderPath : " + bookingSlipsFolderPath);

        // Create a File object to represent the 'uploads' folder based on the specified path
        File uploadsFolder = new File(bookingSlipsFolderPath);

        // Check if the 'uploads' folder exists
        if (!uploadsFolder.exists()) uploadsFolder.mkdirs();
    }
}
