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
                <td>${vehicle.rate.rid}</td>
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

function updateModal(vehicle) {
    $('#vId').val(vehicle.vid);
    $('#regNo').val(vehicle.regNo);
    $('#brand').val(vehicle.brand);
    $('#type').val(vehicle.type);
    $('#color').val(vehicle.color);
    $('#passengers').val(vehicle.passengers);
    $('#transmissionType').val(vehicle.transmissionType);
    $('#fuelType').val(vehicle.fuelType);
    $('#status').val(vehicle.status);
    $('#rid').val(vehicle.rate.rid);

    loadImages(vehicle.vid + '_front.jpg', $('#slider_i1'));
    loadImages(vehicle.vid + '_side1.jpg', $('#slider_i2'));
    loadImages(vehicle.vid + '_side2.jpg', $('#slider_i3'));
    loadImages(vehicle.vid + '_back.jpg', $('#slider_i4'));
}

function emptyModal() {
    $('#vId').val('');
    $('#regNo').val('');
    $('#brand').val('');
    $('#type').val('');
    $('#color').val('');
    $('#passengers').val('');
    $('#transmissionType').val('');
    $('#fuelType').val('');
    $('#status').val('');
    $('#rid').val('');

    resetImagesToDefault();
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
                deleteImages(vId);
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

    let vid = $('#vId').val();
    loadImages(vid + '_front.jpg', $('#f_image'));
    loadImages(vid + '_side1.jpg', $('#s1_image'));
    loadImages(vid + '_side2.jpg', $('#s2_image'));
    loadImages(vid + '_back.jpg', $('#b_image'));

    $('#front, #side1, #side2, #back').val('');
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
    $('#rid').removeAttr('readonly');
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
    $('#rid').attr('readonly', true);
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
            $row.find("td:lt(10)").each(function () {
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

    emptyModal();
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
    let rid = $('#rid').val();

    let vehicle = {
        "vid": vId,
        "regNo": regNo,
        "brand": brand,
        "type": type,
        "color": color,
        "passengers": passengers,
        "transmissionType": transmissionType,
        "fuelType": fuelType,
        "status": status,
        "rate": {
            "rid": rid
        }
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
                uploadImages(vId);
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
    let vId = $('#vId').val();
    let regNo = $('#regNo').val();
    let brand = $('#brand').val();
    let type = $('#type').val();
    let color = $('#color').val();
    let passengers = $('#passengers').val();
    let transmissionType = $('#transmissionType').val();
    let fuelType = $('#fuelType').val();
    let status = $('#status').val();
    let rid = $('#rid').val();

    let vehicle = {
        "vid": vId,
        "regNo": regNo,
        "brand": brand,
        "type": type,
        "color": color,
        "passengers": passengers,
        "transmissionType": transmissionType,
        "fuelType": fuelType,
        "status": status,
        "rate": {
            "rid": rid
        }
    }
    console.log(vehicle);

    // Check if images are selected
    if (
        !$("#front")[0].files[0] ||
        !$("#side1")[0].files[0] ||
        !$("#side2")[0].files[0] ||
        !$("#back")[0].files[0]
    ) {
        alert("Please select all images before saving.");
        return;
    }

    $.ajax({
        type: "POST",
        url: baseURL + 'vehicle',
        data: JSON.stringify(vehicle),
        contentType: "application/json",
        success: function (response) {
            alert(response.message);
            uploadImages(vId);
            updateTable();
            $('#moreInfo').modal('hide');
        },
        error: function (error) {
            console.log(error.responseJSON.message)
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

///////////////////////////////// handle images //////////////////////////////////////////
// show selected images
handleFileInputChange('#front', '#f_image');
handleFileInputChange('#side1', '#s1_image');
handleFileInputChange('#side2', '#s2_image');
handleFileInputChange('#back', '#b_image');

function handleFileInputChange(inputId, imageId) {
    $(inputId).change(function () {
        const file = this.files[0];
        const image = $(imageId);

        if (file) {
            image.attr('src', URL.createObjectURL(file));
        } else {
            image.attr('src', '../../assets/img/NotSelected.jpg');
        }
    });
}

// reset images if cancel pressed
$('#cancel').click(function () {
    resetImagesToDefault();
});

function resetImagesToDefault() {
    $('#f_image, #s1_image, #s2_image, #b_image').attr('src', '../../assets/img/NotSelected.jpg');
    $('#front, #side1, #side2, #back').val('');
}

// upload images to server
function uploadImages(vId) {
    // Check if images are selected
    if (
        !$("#front")[0].files[0] ||
        !$("#side1")[0].files[0] ||
        !$("#side2")[0].files[0] ||
        !$("#back")[0].files[0]
    ) {
        alert("Images are not updated. if you want to update images , select all images before update.");
        return;
    }

    let formData = new FormData();
    formData.append("frontImage", $("#front")[0].files[0]);
    formData.append("side1Image", $("#side1")[0].files[0]);
    formData.append("side2Image", $("#side2")[0].files[0]);
    formData.append("backImage", $("#back")[0].files[0]);
    formData.append("vId", vId);

    $.ajax({
        url: baseURL + 'vehicle/uploadImg',
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response.message);
        },
        error: function (error) {
            console.error("Error uploading images: " + error.responseJSON.message);
        },
    });
}

// delete images when vehicle deleted
function deleteImages(vId) {
    $(document).ready(function () {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'vehicle/deleteImages/' + vId,
            success: function () {
                console.log("deleted");
            },
            error: function () {
                alert('Error');
            }
        });
    });
}

// loadImages from backend
function loadImages(imageName, imgElement) {
    $.ajax({
        url: baseURL + 'vehicle/get_image/' + imageName,
        method: 'GET',
        success: function (response) {
            imgElement.attr('src', "data:image/jpeg;base64," + response);
        },
        error: function (error) {
            console.log("Error loading image: " + error);
        }
    });
}

