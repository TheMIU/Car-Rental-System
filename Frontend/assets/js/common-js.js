////////////// baseURL
const baseURL = 'http://localhost:8080/Backend_war/';

////////// logout navigation
$('#btnLogout').click(function () {
    let rootLocation = window.location.origin;
    let relativeURL = '../Car-Rental-System/Frontend/index.html';
    let absoluteURL = rootLocation + '/' + relativeURL;
    console.log(absoluteURL);

    logout();
    window.location.href = absoluteURL;
});

// logout
function logout() {
    // Clear the login state in localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    localStorage.removeItem('loginId');
}

////////////// enlarge images when click
$(".enlargeableImg").click(function () {
    var newWindow = window.open("", "_blank");
    newWindow.document.write("<div style=' background-color: black;position: absolute; top: 0; left: 0; right: 0;" +
        " bottom: 0; display: flex; justify-content: center; align-items: center;'><img src=" + this.src + " /></div>");
});
