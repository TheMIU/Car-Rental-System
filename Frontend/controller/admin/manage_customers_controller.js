////////// navigation
$('#btnLogout').click(function () {
    window.location.href = '../../index.html';
});

////////// get customer data to table
let data;
updateTable();

function updateTable() {
    $.ajax({
        url: 'http://localhost:8080/Backend_war/user',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            data = response.data;
            console.log(response.data)
            // Initial display
            displayData();
            updatePagination();
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });
}


const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");
const itemsPerPage = 8;
let currentPage = 1;

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayData();
    updatePagination();
}

function displayData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    dataToDisplay.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.name}</td>
                <td>${user.address}</td>
                <td>${user.contact}</td>
                <td><button class="btn btn-outline-info btn-sm more-button" data-bs-toggle="modal"
            data-bs-target="#moreInfo"> <i class="fas fa-ellipsis-h"></i>  More</button></td>
            `;
        tableBody.appendChild(row);
    });
}

function updatePagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        li.innerHTML = `<a class="page-link bg-dark text-white" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
}

//////////////// "More" buttons
document.getElementById("table-body").addEventListener("click", function (event) {
    if (event.target.classList.contains("more-button")) {
        // Calculate the actual index of the data based on the current page
        const dataIndex = (currentPage - 1) * itemsPerPage + Array.from(this.children).indexOf(event.target.closest("tr"));
        const user = data[dataIndex];

        // Update the modal
        $('#userId').val(user.userId);
        $('#name').val(user.name);
        $('#address').val(user.address);
        $('#contact').val(user.contact);
        $('#email').val(user.email);
        $('#nic_num').val(user.nic_num);
        $('#license_num').val(user.license_num);
        $('#id_img_front_label').val(user.id_img_front);
        $('#id_img_back_label').val(user.id_img_back);

        loadImages(user.id_img_front, $('#id_img_front'));
        loadImages(user.id_img_back, $('#id_img_back'));

        if (user.editable) {
            console.log('user editable ' + user.editable);
            $('#editable').text('Make Editable');
            $('#editable').removeClass('btn-outline-warning').addClass('btn-outline-danger');
        } else {
            console.log('user editable ' + user.editable);
            $('#editable').text('Make Non-Editable');
            $('#editable').removeClass('btn-outline-danger').addClass('btn-outline-danger');
        }
    }
});

function loadImages(imageName, imgElement) {
    $.ajax({
        url: baseURL + 'user/get_image/' + imageName,
        method: 'GET',
        success: function (response) {
            imgElement.attr('src', "data:image/jpeg;base64," + response);
        },
        error: function (error) {
            console.log("Error loading image: " + error);
        }
    });
}

////////////// Delete customer
$('#delete').click(function () {
    let userId = $('#userId').val();
    let frontImage = $('#id_img_front_label').val();
    let backImage = $('#id_img_back_label').val();

    if (confirm('Are you sure you want to delete this customer?')) {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'user/' + userId,
            success: function (response) {
                deleteImage(frontImage);
                deleteImage(backImage);
                alert(response.data + ' Customer deleted');
                updateTable();
                $('#moreInfo').modal('hide');
            },
            error: function (error) {
                alert('Error: ' + error.responseJSON.message);
            }
        });
    }
});

////////////// delete images when customer delete
function deleteImage(imageName) {
    $(document).ready(function () {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'user/delete/' + imageName,
            success: function () {
                console.log("deleted");
            },
            error: function () {
                alert('Error');
            }
        });
    });
}


////////////// Edit customer
$('#edit').click(function () {
    // make editable text fields
    $('#name').removeAttr('readonly');
    $('#address').removeAttr('readonly');
    $('#contact').removeAttr('readonly');
    $('#email').removeAttr('readonly');
    $('#nic_num').removeAttr('readonly');
    $('#license_num').removeAttr('readonly');
});

$('#cancel').click(function () {
    // make non editable text fields
    $('#name').attr('readonly', true);
    $('#address').attr('readonly', true);
    $('#contact').attr('readonly', true);
    $('#email').attr('readonly', true);
    $('#nic_num').attr('readonly', true);
    $('#license_num').attr('readonly', true);
});

////////////// toggle editable & non-editable customer
$('#editable').click(function () {
    let userId = $('#userId').val();
    $.ajax({
        type: 'PUT',
        url: baseURL + 'user/' + userId,
        success: function (response) {
            console.log(response)
            alert('Changed');
        },
        error: function (error) {
            alert('Error: ' + error.responseJSON.message);
        }
    });
    updateTable();
    /* if ($('#editable').text() === 'Make Editable') {
         alert("Customer can edit details.");
         $('#editable').text('Make Non-Editable');
         $('#editable').removeClass('btn-outline-warning').addClass('btn-outline-danger');
     } else {
         alert("Customer can't edit details !");
         $('#editable').text('Make Editable');
         $('#editable').removeClass('btn-outline-danger').addClass('btn-outline-warning');
     }*/
});

