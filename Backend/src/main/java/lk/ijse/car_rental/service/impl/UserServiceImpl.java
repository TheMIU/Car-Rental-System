package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.entity.User;
import lk.ijse.car_rental.repo.UserRepo;
import lk.ijse.car_rental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper mapper;

    String idImagesFolderPath;

    @Override
    public void saveUser(UserDTO dto) {
        User user = mapper.map(dto, User.class);

        // generate new ID
        String nextUserID = getNextUserID();
        user.setUserId(nextUserID);

        // save multipart files
        MultipartFile id_img_front = dto.getId_img_front();
        MultipartFile id_img_back = dto.getId_img_back();

        checkIdUploadFolderCreated();

        // save in created location, with new file names
        try {
            id_img_front.transferTo(new File(idImagesFolderPath + nextUserID + "_ID_Front.jpg"));
            id_img_back.transferTo(new File(idImagesFolderPath + nextUserID + "_ID_Back.jpg"));
        } catch (IOException e) {
            throw new RuntimeException(e.toString());
        }

        // set saved file name
        user.setId_img_front(nextUserID + "_ID_Front.jpg");
        user.setId_img_back(nextUserID + "_ID_Back.jpg");

        userRepo.save(user);
    }

    @Override
    public String getNextUserID() {
        String lastUserId = userRepo.findAllOrderedBySubstring();
        System.out.println("Last : " + lastUserId);

        if (lastUserId == null) {
            return "C1";
        } else {
            String[] lastNum = lastUserId.split("C");
            int lastId = Integer.parseInt(lastNum[1]);
            int newId = lastId + 1;

            System.out.println("New : " + newId);

            return "C" + newId;
        }
    }

    public void checkIdUploadFolderCreated() {
        // get user directory and create folders
        idImagesFolderPath = System.getProperty("user.dir") + File.separator
                + "Car Rental System" + File.separator + "uploads" + File.separator + "usersIdImages" + File.separator;
        System.out.println("uploadsFolderPath : " + idImagesFolderPath);

        // Create a File object to represent the 'uploads' folder based on the specified path
        File uploadsFolder = new File(idImagesFolderPath);

        // Check if the 'uploads' folder exists
        if (!uploadsFolder.exists()) uploadsFolder.mkdirs();
    }
}
