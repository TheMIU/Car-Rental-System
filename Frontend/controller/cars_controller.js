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

        const h4Element = $("<h4>").text(vid);
        const description = $("<p>").text(vehicles[v].brand);
        const price = $("<p>").text(vehicles[v].rate.dailyRate);

        const button = $("<button>").addClass("add-to-cart-button btn btn-sm btn-outline-warning").text("View more");

        carDiv.append(imgElement, h4Element, description, price, button);
        carListContainer.append(carDiv);
    }
}

// view more button click
$(document).on('click', '.add-to-cart-button', function () {
    const vid = $(this).siblings("h4").text(); // Get the vid from the sibling h4 element

    const foundVehicle = vehicles.find(vehicle => vehicle.vid === vid);
    if (foundVehicle) {
        console.log(foundVehicle);
    } else {
        console.log("Vehicle not found");
    }
    $("#moreInfo").modal("show");
    $("#moreModalLabel").text(vid);
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
    let vid = $('#moreModalLabel').text();

    // cart array
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].vid === vid) {
            // Increment the qty by 1
            cart[i].qty += 1;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({vid: vid, qty: 1});
    }

    console.log(cart);

    $("#moreInfo").modal("hide");
    $("#alertModal").modal("show");
});

// place order button click
$('#booking').click(function () {
    console.log('clickd')
    $("#alertModal").modal("hide");
    $("#bookModal").modal("show");

    // clear div
    $('#bookModalBody').empty();

    // append description
    const div = $("<div>");
    for (i in cart) {
        const description = $("<p>").text(cart[i].vid + ' : ' + cart[i].qty);
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
    }else {
        $("#bookModal").modal("show");
    }
});


//////////////////////// place order
$('#placeOrder').click(function () {
    console.log('order placed')
    console.log(cart)


    ////////////
    const bookingObject = {
        bookId: 'B10',
        userId: 'C1',
        driverId: 'D1',
        bookDate: '2023-11-01', // Correctly formatted date
        bookTime: '14:30:00', // Correctly formatted time
        slip: 'S123',
        loosDamage: 50.25,
        approved: false,

        user: {
            userId: 'C1'
        },
        bookingDetail: cart/*[
            {
                bookId: 'B10',
                vid: 'V1',
                qty: 2,
                completed: true,
            },
            {
                bookId: 'B10',
                vid: 'V2',
                qty: 1,
                completed: true,
            }
        ]*/
    };

    console.log(bookingObject)
    /////////////////

    $.ajax({
        url: baseURL+'place-order',
        method: 'POST',
        contentType: "application/json",
        data: JSON.stringify(bookingObject),
        async: false,

        success: function (res) {
            alert(res.message);
        },
        error: function (error) {
            console.log(error.responseJSON.message)
            alert(error.responseJSON.message);
        }
    });
});