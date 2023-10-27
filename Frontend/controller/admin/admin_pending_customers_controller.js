////////// get customer data to table
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
        url: 'http://localhost:8080/Backend_war/user',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            let allItems = response.data
            let selectedItems = allItems.filter(customer => customer._approved === false);
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
    $('#email').val(user.email);
    $('#nic_num').val(user.nic_num);
    $('#license_num').val(user.license_num);
    $('#id_img_front_label').val(user.id_img_front);
    $('#id_img_back_label').val(user.id_img_back);

    loadImages(user.id_img_front, $('#id_img_front'));
    loadImages(user.id_img_back, $('#id_img_back'));
}

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

///////////////////// Approve customer
$('#approve').click(function () {
    let userId = $('#userId').val();

    $.ajax({
        url: baseURL + 'user/approve/' + userId,
        method: 'PUT',
        success: function (response) {
            alert(response.message);
            updateTable();
            $('#moreInfo').modal('hide');
        },
        error: function (error) {
            console.log("Error: " + error.responseJSON.message);
        }
    });
});