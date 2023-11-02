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
        url: baseURL + 'rates',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.data)
            data = response.data;

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

    dataToDisplay.forEach((rate) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${rate.rid}</td>
                <td>${rate.dailyRate}</td>
                <td>${rate.freeKmDay}</td>
                <td>${rate.monthlyRate}</td>
                <td>${rate.freeKmMonth}</td>
                <td>${rate.extraKm}</td>
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
        const rate = data[dataIndex];

        // Update the modal
        updateModal(rate);
    }
});

function updateModal(rate) {
    $('#rId').val(rate.rid);
    $('#dailyRate').val(rate.dailyRate);
    $('#freeKmDay').val(rate.freeKmDay);
    $('#monthlyRate').val(rate.monthlyRate);
    $('#freeKmMonth').val(rate.freeKmMonth);
    $('#extraKm').val(rate.extraKm);
}

////////////// Delete rate
$('#delete').click(function () {
    let rId = $('#rId').val();

    if (confirm('Are you sure you want to delete this Rate?')) {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'rates/' + rId,
            success: function (response) {
                alert(response.data + ' Rate deleted');
                updateTable();
                $('#moreInfo').modal('hide');
            },
            error: function (error) {
                alert('Error: ' + error.responseJSON.message);
            }
        });
    }
});

////////////// Edit rate
$('#edit').click(function () {
    makeEditableTextFields();
    $('#dailyRate').focus();
    $('#update').show();
    $('#edit').hide();
});

function makeEditableTextFields() {
    // make editable text fields
    $('#dailyRate').removeAttr('readonly');
    $('#freeKmDay').removeAttr('readonly');
    $('#monthlyRate').removeAttr('readonly');
    $('#freeKmMonth').removeAttr('readonly');
    $('#extraKm').removeAttr('readonly');
}

$('#moreInfo').on('hidden.bs.modal', function () {
    // make non editable text fields
    $('#dailyRate').attr('readonly', true);
    $('#freeKmDay').attr('readonly', true);
    $('#monthlyRate').attr('readonly', true);
    $('#freeKmMonth').attr('readonly', true);
    $('#extraKm').attr('readonly', true);
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
    $('#save').hide();
    $('#edit').show();
    $('#update').hide();
    $('#delete').show();
});

$('#addNew').click(function () {
    $('#save').show();
    $('#edit').hide();
    $('#update').hide();
    $('#delete').hide();
    updateModal('');
    $('#dailyRate').focus();
    makeEditableTextFields();
    generateNextRateID();
});

/////////////// update
$("#update").click(function () {
    let rId = $('#rId').val();
    let dailyRate = $('#dailyRate').val();
    let freeKmDay = $('#freeKmDay').val();
    let monthlyRate = $('#monthlyRate').val();
    let freeKmMonth = $('#freeKmMonth').val();
    let extraKm = $('#extraKm').val();

    let rate = {
        "rid": rId,
        "dailyRate": dailyRate,
        "freeKmDay": freeKmDay,
        "monthlyRate": monthlyRate,
        "freeKmMonth": freeKmMonth,
        "extraKm": extraKm
    }
    console.log(rate)

    let b = confirm("Do you want to Update " + rId + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'rates',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(rate),

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
    const formData = new FormData(document.getElementById('ratesForm'));
    $.ajax({
        type: "POST",
        url: baseURL + 'rates',
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

function generateNextRateID() {
    if (data.length !== 0) {
        let lastId = data[data.length - 1].rid;
        let nextNum = parseInt(lastId.substring(1)) + 1;
        $('#rId').val('R' + nextNum);
    } else {
        $('#rId').val('R1');
    }
}

