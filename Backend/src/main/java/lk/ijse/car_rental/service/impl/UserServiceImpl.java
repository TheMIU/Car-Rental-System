package lk.ijse.car_rental.service.impl;

import lk.ijse.car_rental.dto.UserDTO;
import lk.ijse.car_rental.entity.User;
import lk.ijse.car_rental.repo.UserRepo;
import lk.ijse.car_rental.service.UserService;
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
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper mapper;

    String idImagesFolderPath;

    public UserServiceImpl() {
        checkIdUploadFolderCreated();
    }

    @Override
    public void saveUser(UserDTO dto) {
        User user = mapper.map(dto, User.class);

        System.out.println(dto);
        // if save customer multipart files will save, if save driver no images
        if(user.getType().equals("customer")){
            String nextUserID = dto.getUserId();

            // save multipart files
            MultipartFile id_img_front = (MultipartFile) dto.getId_img_front();
            MultipartFile id_img_back = (MultipartFile) dto.getId_img_back();

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
        }

        userRepo.save(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> all = userRepo.findAllOrderedBySubstring();
        return mapper.map(all, new TypeToken<ArrayList<UserDTO>>() {
        }.getType());
    }

    @Override
    public void updateUser(UserDTO dto) {
        if (!userRepo.existsById(dto.getUserId())) throw new RuntimeException("User not exists!");

        User userByUserId = userRepo.findUserByUserId(dto.getUserId());

        // update only this information
        userByUserId.setName(dto.getName());
        userByUserId.setAddress(dto.getAddress());
        userByUserId.setSalary(dto.getSalary());
        userByUserId.setContact(dto.getContact());
        userByUserId.setEmail(dto.getEmail());
        userByUserId.setLicense_num(dto.getLicense_num());
        userByUserId.setNic_num(dto.getNic_num());
        userByUserId.setEditable(dto.isEditable());
        userByUserId.setApproved(dto.isApproved());

        userRepo.save(userByUserId);
    }

    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    @Override
    public String getNextUserID() {
        String lastUserId = userRepo.findLastRecord();
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

    @Override
    public String getImage(String imageName) throws IOException {
        Path imagePath = Paths.get(idImagesFolderPath + imageName);

        if (Files.exists(imagePath)) {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return Base64.getEncoder().encodeToString(imageBytes);
        } else {
            return null;
        }
    }

    @Override
    public void toggleEditable(String userId) {
        System.out.println(userId);
        boolean isApprovedByUserID = userRepo.findIsApprovedByUserID(userId);
        System.out.println(isApprovedByUserID);

        if (isApprovedByUserID) {
            userRepo.changeIsApprovedFalse(userId);
        } else {
            userRepo.changeIsApprovedTrue(userId);
        }
    }

    @Override
    public void deleteImage(String imageName) {
        System.out.println(idImagesFolderPath+imageName);
        new File(idImagesFolderPath+imageName).delete();
    }

    @Override
    public void approveUser(String userId) {
        userRepo.approveUser(userId);
    }

    public void checkIdUploadFolderCreated() {
        //String appPath = servletContext.getRealPath("/");

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
