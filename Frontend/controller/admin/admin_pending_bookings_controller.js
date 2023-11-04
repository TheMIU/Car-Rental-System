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
        url: 'http://localhost:8080/Backend_war/booking',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.data);

            let allItems = response.data
            let selectedItems = allItems.filter(booking => booking.approved === false);
            console.log(selectedItems);

            data = selectedItems;

            // Initial display
            displayData();
            updatePagination();
        },
        error: function (error) {
            console.log(error)
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

    dataToDisplay.forEach((booking) => {
        const row = document.createElement("tr");

        const bookingDetailsHtml = booking.bookingDetails.map((detail) => {
            return ` Driver : ${detail.driverId} | Vehicle: ${detail.vid} | Loss damage : ${detail.lossDamage}`;
        }).join('<br>');

        row.innerHTML = `
        <td>${booking.bookId}</td>
        <td>${new Date(booking.bookDate).toLocaleDateString()}</td>
        <td>${booking.userId}</td>
        <td>${bookingDetailsHtml}</td>
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
        const Booking = data[dataIndex];

        // Update the modal
        updateModal(Booking);

        // load images
        $('img[data-image-name]').each(function () {
            const imageName = $(this).attr('data-image-name');
            loadImages(imageName, $(this));
        });
    }
});

function updateModal(Booking) {
    var detailsContainer = $('#details');

    var bookingHtml = `
    <table style="margin-left: 20px">
      <tr>
        <td>Book id</td>
        <td>:</td>
        <td><span id="bookID" style="color: #00f1ff">${Booking.bookId}</span></td>
      </tr>
      <tr>
        <td>Book date</td>
        <td>:</td>
        <td><span style="color: #00f1ff">${new Date(Booking.bookDate).toLocaleDateString()}</span></td>
      </tr>
      
        <tr>
          <td>Description</td>
          <td>:</td>
          <td>
            <span style="color: #00f1ff">
              ${Booking.bookingDetails.map((detail) => {
        return `Driver: ${detail.driverId} <br> Vehicle: ${detail.vid} <br> Loss damage: ${detail.lossDamage} <br> Slip Image: <img src="" alt="${detail.slipName}" data-image-name="${detail.slipName}" width="50%">`;
    }).join('<br>')}
            </span>
          </td>
        </tr>

      
      <tr>
        <td>User Name</td>
         <td>:</td>
        <td><span style="color: #00f1ff">${Booking.user.name}</span></td>
      </tr>
      <tr>
        <td>User Contact</td>
         <td>:</td>
        <td><span style="color: #00f1ff">${Booking.user.contact}</span></td>
      </tr>
      <tr>
        <td>User Email</td>
         <td>:</td>
        <td><span style="color: #00f1ff">${Booking.user.email}</span></td>
      </tr>
      <tr>
        <td>User Address</td>
         <td>:</td>
        <td><span style="color: #00f1ff">${Booking.user.address}</span></td>
      </tr>
    
    </table>
  `;

    detailsContainer.html(bookingHtml);
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
            $row.find("td:lt(5)").each(function () {
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

///////////////////// Approve booking
$('#approve').click(function () {
    let bookId = $('#bookID').text();
    console.log(bookId)

    $.ajax({
        url: baseURL + 'booking/approve/' + bookId,
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

///////////////////// load slip images
function loadImages(imageName, imgElement) {
    $.ajax({
        url: baseURL + 'booking/get_image/' + imageName,
        method: 'GET',
        success: function (response) {
            imgElement.attr('src', "data:image/jpeg;base64," + response);
        },
        error: function (error) {
            console.log("Error loading image: " + error);
        }
    });
}