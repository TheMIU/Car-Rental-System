let nextUserID = "";
let logged = false;
let loginId;

// Login
$("#loginBtn").on("click", function () {
    var formData = $('#loginForm').serialize();

    $.ajax({
        type: "POST",
        url: baseURL + "login/check",
        data: formData,

        success: function (response) {
            console.log(response.data)

            // get logging Id
            loginId = response.data.loginId;
            console.log(loginId);

            if (response.data === null || response.data.type === null) {
                alert("Login failed !");
            } else if (response.data.type === 'admin') {
                window.location.href = '../pages/admin/admin_dashboard.html';
            } else if (response.data.type === 'driver') {
                window.location.href = '../pages/driver/driver_dashboard.html';
            } else if (response.data.type === 'customer') {
                alert("Login success !");
                getLoggedCustomer();
                logged = true;
                profileChange();
                $('#login').modal('hide');

                // Clear register form
                $("#loginForm").find("input:not([type='submit'])").val("");
            }
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

// get logged customer data
function getLoggedCustomer() {
    $.ajax({
        url: baseURL + 'user/' + loginId,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.data)
            $('#LoggedLabel').text(response.data.userId+' : '+response.data.name);
            $('#cus_name').val(response.data.name);
            $('#cus_address').val(response.data.address);
            $('#cus_contact').val(response.data.contact);
            $('#cus_email').val(response.data.email);
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });
}

// get next id
$("#registerBtn").on("click", function () {
    $.ajax({
        type: "GET",
        url: baseURL + "user/next_id",
        success: function (response) {
            nextUserID = response.data;
            console.log(nextUserID)
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

// submit form
$("#registerForm").submit(function (e) {
    e.preventDefault();

    if ($('#registerForm')[0].checkValidity()) { // check form filled or not
        // submit form
        const formData = new FormData(this);
        formData.set('type', 'customer');
        formData.set('loginId', nextUserID);
        formData.set('userId', nextUserID);

        $.ajax({
            type: "POST",
            url: baseURL + 'user',
            data: formData,
            processData: false,
            contentType: false,

            success: function (response) {
                console.log(response.message);
            },
            error: function (error) {
                alert('failed : ' + error.responseJSON.message);
            }
        });

        // show the second modal
        $('#registerSubmitted').modal('show');
        $('#registerInfo').modal('hide');

        // Clear register form
        $("#registerForm").find("input:not([type='submit'])").val("");


    } else {
        // Required fields are not filled, display an error message
        alert('Please fill in all required fields before submitting.');
    }
});

//////////////////////////////
// password field eye toggle
const $passwordInput = $('#password');
const $cus_passwordInput = $('#cus_password');
const $togglePasswordButtons = $('.toggle-password');

$togglePasswordButtons.click(function () {
    if ($passwordInput.attr('type') === 'password') {
        $passwordInput.attr('type', 'text');
        $cus_passwordInput.attr('type', 'text');
        $(this).html('<i class="fas fa-eye-slash"></i>');
    } else {
        $passwordInput.attr('type', 'password');
        $cus_passwordInput.attr('type', 'password');
        $(this).html('<i class="fas fa-eye"></i>');
    }
});

//////////////////////////////
// login profile change
$('#profileImage').hide();
$('#not_logged').show();

function profileChange() {
    if (logged) {
        $('#profileImage').show();
        $('#not_logged').hide();
    } else {
        $('#profileImage').hide();
        $('#not_logged').show();
    }
}

// logout
$('#logout').click(function () {
    let logoutConfirmed = confirm("Are you sure you want to log out?");

    if (logoutConfirmed) {
        location.reload();
    }
});

$('#profileButton').click(function () {
    $('#editCustomerFields').hide();
    $('#update').hide();
    $('#editData').show();
});

$('#editData').click(function () {
    $('#editCustomerFields').show();
    $('#update').show();
    $('#editData').hide();
});

/////////////// update
$("#update").click(function () {
    let name = $('#cus_name').val();
    let address = $('#cus_address').val();
    let contact = $('#cus_contact').val();
    let email = $('#cus_email').val();

    let customer = {
        "userId": loginId,
        "name": name,
        "address": address,
        "contact": contact,
        "email": email,
    }
    console.log(customer);

    let b = confirm("Do you want to Update " + loginId + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'user',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(customer),

            success: function (res) {
                alert(res.message);
                getLoggedCustomer();
                $('#Logged').modal('hide');
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }
});