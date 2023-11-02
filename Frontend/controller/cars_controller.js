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
        var detailsContainer = $('#details');

        var bookingHtml = `
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
        //////////////

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

        cart.push({vid: vid, driverId: 'D1'});

        console.log(cart);

        $("#moreInfo").modal("hide");
        $("#alertModal").modal("show");
    } else {
        alert("Login to continue !")
    }
});

///////
// place order button click
$('#booking').click(function () {
    $("#alertModal").modal("hide");
    $("#bookModal").modal("show");

    // clear div
    $('#bookModalBody').empty();

    // append description
    const div = $("<div>");
    for (i in cart) {
        const description = $("<p>").text(cart[i].vid + ' : ' + cart[i].driverId);
        div.append(description);
    }

    $('#bookModalBody').append(div);
});

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

$('#placeOrder').click(function () {
    let book_Id = $('#bookModalLabel').text();
    cart.forEach(item => {
        item.bookId = book_Id;
    });

    let userIdName = $('#LoggedLabel').text();
    let userId = userIdName.match(/\b\w+\b/)[0];

    let bookingObject = {
        bookId: book_Id,
        userId: userId,
        driverId: 'D1',
        bookDate: '2023-11-01',
        bookTime: '14:30:00',
        slip: 'S123',
        loosDamage: 50.25,
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
        },
        error: function (error) {
            console.log(error.responseJSON.message)
            alert(error.responseJSON.message);
        }
    });
});

function test(){
    console.log($('#bookModalLabel').text());
}