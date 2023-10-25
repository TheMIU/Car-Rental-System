// password field eye toggle
const passwordInput = document.getElementById('password');
const cus_passwordInput = document.getElementById('cus_password');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

togglePasswordButtons.forEach((togglePasswordButton) => {
    togglePasswordButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            cus_passwordInput.type = 'text';
            togglePasswordButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            cus_passwordInput.type = 'password';
            togglePasswordButton.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });
});

// login profile change
const profileImage = document.getElementById('profileImage');
const not_logged = document.getElementById('not_logged');

profileImage.style.display = "none";
not_logged.style.display = "block";

function profileChange() {
    if (logged) {
        profileImage.style.display = "block";
        not_logged.style.display = "none";
    } else {
        profileImage.style.display = "none";
        not_logged.style.display = "block";
    }
}

$('#btnLogout').click(function () {
    logged = false;
    profileChange();
});