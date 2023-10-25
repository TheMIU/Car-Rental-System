const data = [
    {userId: 1, name: "John Doe", address: "123 Main St", contact: "johndoe@example.com"},
    {userId: 2, name: "Jane Smith", address: "456 Elm St", contact: "janesmith@example.com"},
    {userId: 3, name: "Alice Johnson", address: "789 Oak St", contact: "alicejohnson@example.com"},
    {userId: 4, name: "Bob Wilson", address: "101 Pine St", contact: "bobwilson@example.com"},
    {userId: 5, name: "Linda Brown", address: "202 Cedar St", contact: "lindabrown@example.com"},
    {userId: 6, name: "David Lee", address: "303 Birch St", contact: "davidlee@example.com"},
    {userId: 7, name: "Susan Hall", address: "404 Maple St", contact: "susanhall@example.com"},
    {userId: 8, name: "Michael Green", address: "505 Walnut St", contact: "michaelgreen@example.com"},
    {userId: 9, name: "Robert Adams", address: "606 Oak St", contact: "robertadams@example.com"},
    {userId: 10, name: "Karen Taylor", address: "707 Elm St", contact: "karentaylor@example.com"},
    {userId: 11, name: "James Miller", address: "808 Birch St", contact: "jamesmiller@example.com"},
    {userId: 12, name: "Emily Clark", address: "909 Cedar St", contact: "emilyclark@example.com"},
    {userId: 13, name: "Daniel White", address: "1010 Maple St", contact: "danielwhite@example.com"},

];

const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");
const itemsPerPage = 8;
let currentPage = 1;

// Initial display
displayData();
updatePagination();

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

    dataToDisplay.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.userId}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.contact}</td>
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
        const item = data[dataIndex];

        // Update the modal
        $('#name').val(item.name);
        $('#address').val(item.address);
    }
});

