// get all vehicle data
let vehicles = [];
let cart = [];

$.ajax({
    url: baseURL + 'vehicle',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
        vehicles = response.data;
        console.log(vehicles);

        loadCarFrontImages();
    },
    error: function (error) {
        console.log("Error fetching data: " + error);
    }
});

// load images
function loadCarFrontImages() {
    const carListContainer = $("#all_cars");

    for (let v in vehicles) {
        const vid = vehicles[v].vid;

        // Create a new <div> element for each vid
        const carDiv = $("<div>").addClass("car").css("height", "10%");

        const imgElement = $("<img>").attr("src", '').attr("alt", vid).css("width", "100%").addClass("mb-2");
        loadImages(vid + '_front.jpg', imgElement);

        const h4Element = $("<h4>").text(vehicles[v].brand);
        const description = $("<p id='v_id'>").text(vid);
        const price = $("<p>").text(vehicles[v].rate.dailyRate);

        const button = $("<button>").addClass("view-more-btn btn btn-sm btn-outline-warning").text("View more");

        carDiv.append(imgElement, h4Element, description, price, button);
        carListContainer.append(carDiv);
    }
}

// view more button click
$(document).on('click', '.view-more-btn', function () {
    let vid = $(this).closest('.car').find('#v_id').text();
    console.log(vid);

    const foundVehicle = vehicles.find(vehicle => vehicle.vid === vid);
    if (foundVehicle) {
        console.log(foundVehicle);
        console.log(foundVehicle.vid)
        loadImages(vid + '_front.jpg', $('#slider_i1'));
        loadImages(vid + '_side1.jpg', $('#slider_i2'));
        loadImages(vid + '_side2.jpg', $('#slider_i3'));
        loadImages(vid + '_back.jpg', $('#slider_i4'));

        $("#moreInfo").modal("show");
        $("#moreModalLabel").text(vid);

        // car details
        let detailsContainer = $('#details');

        let bookingHtml = `
        <table style="margin-left: 20px">
          <tr>
            <td>Vehicle ID</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.vid}</span></td>
          </tr>
          
          <tr>
            <td>Reg. No</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.regNo}</span></td>
          </tr> 
          
          <tr>
            <td>Passengers</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.passengers}</span></td>
          </tr>
          
          <tr>
            <td>Color</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.color}</span></td>
          </tr>
          
          <tr>
            <td>Type</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.type}</span></td>
          </tr>
          
          <tr>
            <td>Brand</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.brand}</span></td>
          </tr>
          
          <tr>
            <td>Transmission Type</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.transmissionType}</span></td>
          </tr>
          
          <tr>
            <td>Fuel Type</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.fuelType}</span></td>
          </tr>
          
          <tr>
            <td>Price for extra km</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.rate.extraKm}</span></td>
          </tr>
          
          <tr>
            <td>Daily Rate</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.rate.dailyRate}</span></td>
          </tr> 
          
          <tr>
            <td>Free km p'day</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.rate.freeKmDay}</span></td>
          </tr>
          
          <tr>
            <td>Monthly Rate</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.rate.monthlyRate}</span></td>
          </tr> 
          
          <tr>
            <td>Free km p'month</td>
            <td>:</td>
            <td><span style="color: #00f1ff">${foundVehicle.rate.freeKmMonth}</span></td>
          </tr>
          
        </table>
        `;

        detailsContainer.html(bookingHtml);

    } else {
        alert("Vehicle not found");
    }
});

// load Image from backend
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

///////////////////////////////////////////////////
// add to cart click
$('#addToCart').click(function () {
    if (loggedIn) {
        let vid = $('#moreModalLabel').text();

        const existingVehicle = cart.find(item => item.vid === vid);

        if (existingVehicle) {
            alert("This vehicle is already in your cart.");
        } else {
            cart.push({vid: vid});
        }

        $("#moreInfo").modal("hide");
        $("#alertModal").modal("show");
    } else {
        alert("Login to continue !")
    }
});

// booking click
$('#booking').click(function () {
    $("#alertModal").modal("hide");
    $("#bookModal").modal("show");

    $('#bookModalBody').empty();

    // table columns
    const columns = ["Vehicle Id", "Book Date", "Driver", "Loss Damage", "Slip", "Action"];

    const table = $("<table>").addClass("vehicle-booking-table table table-bordered text-white");

    // Create the table header
    const thead = $("<thead>");
    const headerRow = $("<tr>");

    columns.forEach(columnTitle => {
        const th = $("<th>").text(columnTitle);
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    // Create the table body
    const tbody = $("<tbody>");

    // Define an object to keep track of seen vehicle IDs
    const seenVehicleIds = {};

    // Iterate through cart data and create rows
    cart.forEach(item => {
        const vehicleId = item.vid;

        // Check if the vehicle ID has already been added to the table
        if (!seenVehicleIds[vehicleId]) {
            const row = $("<tr>");

            // column 1
            const vehicleIdInput = $("<td>").append(
                $("<label>").text(vehicleId)
            );

            // column 2
            const datetimeInput = $("<td>").append(
                $("<label>").text("From"),
                $("<input>").attr("type", "datetime-local").addClass("form-control form-control-sm"),

                $("<label>").text("To"),
                $("<input>").attr("type", "datetime-local").addClass("form-control form-control-sm")
            );

            // column 4
            const checkboxCell = $("<td>").append(
                $("<div>").addClass("form-check").append(
                    $("<input>")
                        .attr("type", "checkbox")
                        .prop("checked", true)
                        .attr("id", "needDriver")
                )
            );

            // column 5
            let lossDamageInput = $("<td>").append(
                $("<label>").text(vehicleId.type)
            );

            // change loss damage by type
            $.ajax({
                url: baseURL + 'vehicle',
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    let vehicles = response.data;
                    let find = vehicles.find(vehicle => vehicle.vid === vehicleId);
                    console.log(find.type);

                    if (find.type === 'general') lossDamageInput.find("label").text(10000);
                    if (find.type === 'premium') lossDamageInput.find("label").text(15000);
                    if (find.type === 'luxury') lossDamageInput.find("label").text(20000);

                },
                error: function (error) {
                    console.log("Error : " + error)
                }
            });

            // column 6
            const slipInput = $("<td>").append(
                $("<input>")
                    .attr("type", "file")
                    .attr("name", "Slip")
                    .addClass("form-control form-control-sm")
            );

            // column 7
            const removeButton = $("<td>").append(
                $("<button>")
                    .text("Remove")
                    .addClass("btn btn-outline-danger btn-sm")
                    .click(function () {
                        row.remove();
                        delete seenVehicleIds[vehicleId];
                        // Remove the item from the cart array
                        cart = cart.filter(item => item.vid !== vehicleId);
                        console.log(cart);
                    })
            );

            // Add the vehicle ID to the seenVehicleIds object
            seenVehicleIds[vehicleId] = true;

            row.append(vehicleIdInput, datetimeInput, checkboxCell, lossDamageInput, slipInput, removeButton);
            tbody.append(row);
        }
    });

    table.append(tbody);

    // Append the table to #bookModalBody
    $('#bookModalBody').append(table);
});

///////


// cancel button click
$('#cancelOrder').click(function () {
    // confirm alert
    if (confirm("Are you sure you want to cancel the order?")) {
        cart = [];
        console.log(cart);
        $("#bookModal").modal("hide");
    } else {
        $("#bookModal").modal("show");
    }
});


//////////////////////// place order
// get next book id
getNextBookID();

function getNextBookID(){
    $.ajax({
        url: baseURL + '/booking/next',
        method: 'GET',
        success: function (res) {
            $('#bookModalLabel').text(res.data);
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            alert(error.responseJSON.message);
        }
    });
}


$('#placeOrder').click(function () {
    let book_Id = $('#bookModalLabel').text();
    cart.forEach(item => {
        item.bookId = book_Id;
    });

    let userIdName = $('#LoggedLabel').text();
    let userId = userIdName.match(/\b\w+\b/)[0];

    ///////////////////
    // Loop through the cart items
    cart.forEach(item => {
        // Find the corresponding row in the table for the cart item
        const $row = $('#bookModalBody tbody tr').filter(function () {
            return $(this).find('td:eq(0) label').text() === item.vid;
        });

        // Add data to the cart item
        item['bookDateFrom'] = $row.find('td:eq(1) input[type="datetime-local"]:eq(0)').val();
        item['bookDateTo'] = $row.find('td:eq(1) input[type="datetime-local"]:eq(1)').val();
        item['driverNeeded'] = $row.find('td:eq(2) input[type="checkbox"]').prop('checked');
        item['lossDamage'] = $row.find('td:eq(3) label').text();
        item['slip'] = $row.find('td:eq(4) input[type="file"]').val();
    });

    console.log(cart);

   /* // load all drivers and assign random driver to cart
    $.ajax({
        url: baseURL + 'user',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            let allItems = response.data;
            let selectedDrivers = allItems.filter(driver => driver.type === 'driver');
            console.log(selectedDrivers)
            // Iterate through the cart and assign random drivers to items where driverNeeded is true
            cart.forEach(item => {
                console.log( "Item need: "+item.driverNeeded)
                if (item.driverNeeded) {
                    const randomIndex = Math.floor(Math.random() * selectedDrivers.length);
                    const randomDriver = selectedDrivers[randomIndex];
                    item['driverId'] = randomDriver.userId;
                }
            });

            console.log(cart);
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });

    // upload slip

    let bookingObject = {
        bookId: book_Id,
        userId: userId,
        bookDate: new Date(),
        approved: false,
        user: {userId: userId},
        bookingDetails: cart
    };

    console.log("cart : " + JSON.stringify(cart))
    console.log("booking : " + JSON.stringify(bookingObject))

    $.ajax({
        url: baseURL + 'place-order',
        method: 'POST',
        contentType: "application/json",
        data: JSON.stringify(bookingObject),
        async: false,

        success: function (res) {
            alert(res.message);
            cart = [];
            $("#bookModal").modal("hide");
            getNextBookID();
        },
        error: function (error) {
            console.log(error.responseJSON.message)
            alert(error.responseJSON.message);
        }
    });
});*/

// Load all drivers and assign random driver to cart
    $.ajax({
        url: baseURL + 'user',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            let allItems = response.data;
            let selectedDrivers = allItems.filter(driver => driver.type === 'driver');
            console.log(selectedDrivers);

            // Iterate through the cart and assign random drivers to items where driverNeeded is true
            cart.forEach(item => {
                if (item.driverNeeded) {
                    const randomIndex = Math.floor(Math.random() * selectedDrivers.length);
                    const randomDriver = selectedDrivers[randomIndex];
                    item['driverId'] = randomDriver.userId;
                }
            });

            console.log(cart);

            let bookingObject = {
                bookId: book_Id,
                userId: userId,
                bookDate: new Date(),
                approved: false,
                user: { userId: userId },
                bookingDetails: cart
            };

            console.log("cart : " + JSON.stringify(cart))
            console.log("booking : " + JSON.stringify(bookingObject))

            $.ajax({
                url: baseURL + 'place-order',
                method: 'POST',
                contentType: "application/json",
                data: JSON.stringify(bookingObject),
                async: false,

                success: function (res) {
                    alert(res.message);
                    cart = [];
                    $("#bookModal").modal("hide");
                    getNextBookID();
                },
                error: function (error) {
                    console.log(error.responseJSON.message)
                    alert(error.responseJSON.message);
                }
            });
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });
});
