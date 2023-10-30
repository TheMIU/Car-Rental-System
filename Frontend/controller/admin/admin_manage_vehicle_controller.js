////////// get vehicle data to table
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
        url: baseURL + 'vehicle',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            data = response.data;
            console.log(data);

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

    dataToDisplay.forEach((vehicle) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${vehicle.vid}</td>
                <td>${vehicle.regNo}</td>
                <td>${vehicle.brand}</td>
                <td>${vehicle.type}</td>
                <td>${vehicle.color}</td>
                <td>${vehicle.passengers}</td>
                <td>${vehicle.transmissionType}</td>
                <td>${vehicle.fuelType}</td>
                <td>${vehicle.status}</td>
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
        const vehicle = data[dataIndex];

        // Update the modal
        updateModal(vehicle);
    }
});

function updateModal(user) {
    $('#vId').val(user.vid);
    $('#regNo').val(user.regNo);
    $('#brand').val(user.brand);
    $('#type').val(user.type);
    $('#color').val(user.color);
    $('#passengers').val(user.passengers);
    $('#transmissionType').val(user.transmissionType);
    $('#fuelType').val(user.fuelType);
    $('#status').val(user.status);
}

////////////// Delete
$('#delete').click(function () {
    let vId = $('#vId').val();

    if (confirm('Are you sure you want to delete this vehicle?')) {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'vehicle/' + vId,
            success: function (response) {
                alert(response.data + ' vehicle deleted');
                updateTable();
                $('#moreInfo').modal('hide');
            },
            error: function (error) {
                alert('Error: ' + error.responseJSON.message);
            }
        });
    }
});

////////////// Edit
$('#edit').click(function () {
    makeEditableTextFields();
    $('#regNo').focus();
    $('#update').show();
    $('#edit').hide();

    $('#selectImages').show();
    $('#sliderImages').hide();
});

function makeEditableTextFields() {
    // make editable text fields
    $('#regNo').removeAttr('readonly');
    $('#brand').removeAttr('readonly');
    $('#type').removeAttr('readonly');
    $('#color').removeAttr('readonly');
    $('#passengers').removeAttr('readonly');
    $('#transmissionType').removeAttr('readonly');
    $('#fuelType').removeAttr('readonly');
    $('#status').removeAttr('readonly');
}

$('#moreInfo').on('hidden.bs.modal', function () {
    // make non editable text fields
    $('#regNo').attr('readonly', true);
    $('#brand').attr('readonly', true);
    $('#type').attr('readonly', true);
    $('#color').attr('readonly', true);
    $('#passengers').attr('readonly', true);
    $('#transmissionType').attr('readonly', true);
    $('#fuelType').attr('readonly', true);
    $('#status').attr('readonly', true);
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
    $('#moreModalLabel').text('Vehicle Details');
    $('#save').hide();
    $('#edit').show();
    $('#update').hide();
    $('#delete').show();

    $('#selectImages').hide();
    $('#sliderImages').show();
});

$('#addNew').click(function () {
    $('#moreModalLabel').text('Add New Vehicle');
    $('#save').show();
    $('#edit').hide();
    $('#update').hide();
    $('#delete').hide();
    updateModal('');
    $('#regNo').focus();
    makeEditableTextFields();
    generateNextVehicleID();

    $('#selectImages').show();
    $('#sliderImages').hide();
});

/////////////// update
$("#update").click(function () {
    let vId = $('#vId').val();
    let regNo = $('#regNo').val();
    let brand = $('#brand').val();
    let type = $('#type').val();
    let color = $('#color').val();
    let passengers = $('#passengers').val();
    let transmissionType = $('#transmissionType').val();
    let fuelType = $('#fuelType').val();
    let status = $('#status').val();

    let vehicle = {
        "vid": vId,
        "regNo": regNo,
        "brand": brand,
        "type": type,
        "color": color,
        "passengers": passengers,
        "transmissionType": transmissionType,
        "fuelType": fuelType,
        "status": status
    }
    console.log(vehicle);

    let b = confirm("Do you want to Update " + vId + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'vehicle',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(vehicle),

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

/////////////// save
$("#save").click(function () {
    const formData = new FormData(document.getElementById('vehicleForm'));
    $.ajax({
        type: "POST",
        url: baseURL + 'vehicle',
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            alert(response.message);
            updateTable();
            $('#moreInfo').modal('hide');
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

function generateNextVehicleID() {
    if (data.length !== 0) {
        let lastId = data[data.length - 1].vid;
        let nextNum = parseInt(lastId.substring(1)) + 1;
        $('#vId').val('V' + nextNum);
    } else {
        $('#vId').val('V1');
    }
}

///////////////////////////////////////////////////////////////////////////