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
        url: baseURL + 'pay',
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

    dataToDisplay.forEach((payment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${payment.pid}</td>
                <td>${payment.reason}</td>
                <td>${payment.bid}</td>
                <td>${payment.uid}</td>
                <td>${new Date(payment.paidDate).toLocaleDateString()}</td>
                <td>${payment.amount}</td>
                <td>${payment.method}</td>
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
        const payment = data[dataIndex];

        // Update the modal
        updateModal(payment);
    }
});

function updateModal(payment) {
    $('#pid').val(payment.pid);
    $('#reason').val(payment.reason);
    $('#bid').val(payment.bid);
    $('#uid').val(payment.uid);
    $('#paidDate').val(new Date(payment.paidDate).toISOString().slice(0, 10));
    $('#amount').val(payment.amount);
    $('#method').val(payment.method);
}

function clearModal() {
    $('#pid').val('');
    $('#reason').val('');
    $('#bid').val('');
    $('#uid').val('');
    $('#paidDate').val('');
    $('#amount').val('');
    $('#method').val('');
}

////////////// Delete
$('#delete').click(function () {
    let pid = $('#pid').val();

    if (confirm('Are you sure you want to delete this Payment?')) {
        $.ajax({
            type: 'DELETE',
            url: baseURL + 'pay/' + pid,
            success: function (response) {
                alert(response.data + ' Payment deleted');
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
    $('#reason').focus();
    $('#update').show();
    $('#edit').hide();
});

function makeEditableTextFields() {
    // make editable text fields
    $('#reason').removeAttr('readonly');
    $('#bid').removeAttr('readonly');
    $('#uid').removeAttr('readonly');
    $('#paidDate').removeAttr('readonly');
    $('#amount').removeAttr('readonly');
    $('#method').removeAttr('readonly');
}

$('#moreInfo').on('hidden.bs.modal', function () {
    // make non editable text fields
    $('#reason').attr('readonly', true);
    $('#bid').attr('readonly', true);
    $('#uid').attr('readonly', true);
    $('#paidDate').attr('readonly', true);
    $('#amount').attr('readonly', true);
    $('#method').attr('readonly', true);
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
            $row.find("td:lt(7)").each(function () {
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
    clearModal();
    $('#reason').focus();
    makeEditableTextFields();
    generateNextPaymentID();
});

/////////////// update
$("#update").click(function () {
    let pid = $('#pid').val();
    let reason = $('#reason').val();
    let bid = $('#bid').val();
    let uid = $('#uid').val();
    let paidDate = $('#paidDate').val();
    let amount = $('#amount').val();
    let method = $('#method').val();

    let payment = {
        "pid": pid,
        "reason": reason,
        "bid": bid,
        "uid": uid,
        "paidDate": paidDate,
        "amount": amount,
        "method": method
    }
    console.log(payment)

    let b = confirm("Do you want to Update " + pid + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'pay',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(payment),

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
    const formData = new FormData(document.getElementById('paymentForm'));
    $.ajax({
        type: "POST",
        url: baseURL + 'pay',
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            alert(response.message);
            updateTable();
            $('#moreInfo').modal('hide');
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

function generateNextPaymentID() {
    if (data.length !== 0) {
        let lastId = data[data.length - 1].pid;
        let nextNum = parseInt(lastId.substring(1)) + 1;
        $('#pid').val('P' + nextNum);
    } else {
        $('#pid').val('P1');
    }
}

