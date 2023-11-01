let loggedIn;
let username;
let type;
let loginId;

// check login
checkLoginState();

function checkLoginState() {
    loggedIn = localStorage.getItem('loggedIn');
    username = localStorage.getItem('username');
    type = localStorage.getItem('type');
    loginId = localStorage.getItem('loginId');

    changePageByType(type);
    profileChange();

    if (loggedIn === 'true' && username) {
        console.log(`Logged in as ${type}`);
        getLoggedCustomer(loginId);

    } else {
        console.log('Not logged in');
    }
}

// login
function login(username, password, type, loginId) {
    if (username === $('#username').val() && password === $('#password').val()) {
        alert('Login success');

        // Store the login state in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('type', type);
        localStorage.setItem('loginId', loginId);

        checkLoginState();

        $('#login').modal('hide');
        // Clear register form
        $("#loginForm").find("input:not([type='submit'])").val("");

    } else {
        console.log('Login failed');
    }
}

// change page by type
function changePageByType(type) {
    if (type === 'admin') {
        window.location.href = '../pages/admin/admin_dashboard.html';
    } else if (type === 'driver') {
        window.location.href = '../pages/driver/driver_dashboard.html';
    } else if (type === 'customer') {

    }
}

// logout
function logout() {
    // Clear the login state in localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    localStorage.removeItem('loginId');
}

/////////////////////////////////////////////////////////////
// Login
$("#loginBtn").on("click", function () {
    let formData = $('#loginForm').serialize();

    $.ajax({
        type: "POST",
        url: baseURL + "login/check",
        data: formData,

        success: function (response) {
            console.log(response.data)

            if (response.data === null || response.data.type === null) {
                alert("Login failed !");
            } else {
                login(response.data.loginName, response.data.password, response.data.type, response.data.loginId)
            }
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

//////////////////////////////
// login profile change
function profileChange() {
    if (loggedIn) {
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
        $('#Logged').modal('hide');
        logout();
        checkLoginState();
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
