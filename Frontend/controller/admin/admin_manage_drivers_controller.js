////////// get driver data to table
let data;
let tableBody;
let pagination;
let itemsPerPage;
let currentPage;
updateTable();

function updateTable() {
    tableBody = document.getElementById("table-body");
    pagination = document.getElementById("pagination");
    itemsPerPage = 8;
    currentPage = 1;

    $.ajax({
        url: baseURL + 'user',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            let allItems = response.data
            let selectedItems = allItems.filter(drivers => drivers.type === 'driver');
            console.log(selectedItems);

            data = selectedItems;

            // Initial display
            displayData();
            updatePagination();
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });
}

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
                <td>${user.contact}</td>
                <td>${user.salary}</td>
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
$("#table-body").on("click", ".more-button", function (event) {
    if ($(event.target).hasClass("more-button")) {
        // Calculate the actual index of the data based on the current page
        const dataIndex = (currentPage - 1) * itemsPerPage + $(event.target).closest("tr").index();
        const user = data[dataIndex];

        // Update the modal
        updateModal(user);
    }
});

function updateModal(user) {
    $('#userId').val(user.userId);
    $('#name').val(user.name);
    $('#address').val(user.address);
    $('#contact').val(user.contact);
    $('#salary').val(user.salary);
    $('#email').val(user.email);
    $('#nic_num').val(user.nic_num);
    $('#license_num').val(user.license_num);
}

////////////// Delete driver
$('#delete').click(function () {
    let userId = $('#userId').val();

    if (confirm('Are you sure you want to delete this driver?')) {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'user/' + userId,
            success: function (response) {
                alert(response.data + ' Driver deleted');
                updateTable();
                $('#moreInfo').modal('hide');
            },
            error: function (error) {
                alert('Error: ' + error.responseJSON.message);
            }
        });
    }
});

////////////// Edit customer
$('#edit').click(function () {
    makeEditableTextFields();
    $('#name').focus();
    $('#update').show();
    $('#edit').hide();
});

function makeEditableTextFields() {
    // make editable text fields
    $('#name').removeAttr('readonly');
    $('#address').removeAttr('readonly');
    $('#contact').removeAttr('readonly');
    $('#salary').removeAttr('readonly');
    $('#email').removeAttr('readonly');
    $('#nic_num').removeAttr('readonly');
    $('#license_num').removeAttr('readonly');
}

$('#moreInfo').on('hidden.bs.modal', function () {
    // make non editable text fields
    $('#name').attr('readonly', true);
    $('#address').attr('readonly', true);
    $('#contact').attr('readonly', true);
    $('#salary').attr('readonly', true);
    $('#email').attr('readonly', true);
    $('#nic_num').attr('readonly', true);
    $('#license_num').attr('readonly', true);
});

///////////////////// table search
$(document).ready(function () {
    let $input = $("#search");
    let $tableBody = $("#table-body");

    // Add an event listener for the input element
    $input.on("input", function () {
        let filter = $input.val().toLowerCase();

        $tableBody.find("tr").each(function () {
            let $row = $(this);
            let match = false;

            // Loop through the columns (excluding the last one) and check for a match
            $row.find("td:lt(4)").each(function () {
                let cellText = $(this).text().toLowerCase();
                if (cellText.includes(filter)) {
                    match = true;
                    return false; // Exit the loop if a match is found
                }
            });

            // Show or hide the row based on the match
            if (match) {
                $row.show();
            } else {
                $row.hide();
            }
        });
    });
});

////////////// separate save and view logics
$(document).on('click', '.more-button', function () {
    $('#moreModalLabel').text('Driver Details');
    $('#save').hide();
    $('#edit').show();
    $('#update').hide();
    $('#delete').show();
});

$('#addNew').click(function () {
    $('#moreModalLabel').text('Add New Driver');
    $('#save').show();
    $('#edit').hide();
    $('#update').hide();
    $('#delete').hide();
    updateModal('');
    makeEditableTextFields();
});

/////////////// update
$("#update").click(function () {
    let userId = $('#userId').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let contact = $('#contact').val();
    let salary = $('#salary').val();
    let email = $('#email').val();
    let nic_num = $('#nic_num').val();
    let license_num = $('#license_num').val();

    let driver = {
        "userId": userId,
        "name": name,
        "address": address,
        "contact": contact,
        "salary": salary,
        "email": email,
        "nic_num": nic_num,
        "license_num": license_num,
        "editable":true,
        "_approved":true,
        "type":'driver'
    }

    let b = confirm("Do you want to Update " + userId + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'user',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(driver),

            success: function (res) {
                alert(res.message);
                updateTable();
                $('#moreInfo').modal('hide');
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }
});
