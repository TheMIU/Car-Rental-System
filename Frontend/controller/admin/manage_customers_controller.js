// get customer data to table
let data;
$.ajax({
    url: 'http://localhost:8080/Backend_war/user',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
        data = response.data;

        // Initial display
        displayData();
        updatePagination();
    },
    error: function (error) {
        console.log("Error fetching data: " + error);
    }
});

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
document.getElementById("table-body").addEventListener("click", function(event) {
    if (event.target.classList.contains("more-button")) {
        // Calculate the actual index of the data based on the current page
        const dataIndex = (currentPage - 1) * itemsPerPage + Array.from(this.children).indexOf(event.target.closest("tr"));
        const user = data[dataIndex];

        // Update the modal
        $('#name').val(user.name);
        $('#address').val(user.address);
        $('#contact').val(user.contact);
        $('#email').val(user.email);
        $('#nic_num').val(user.nic_num);
        $('#license_num').val(user.license_num);
        console.log(baseURL+user.id_img_front)
        console.log(baseURL+`${user.id_img_front}`)
        //$('#id_img_front').src(baseURL+`${user.id_img_front}`);
    }
});

