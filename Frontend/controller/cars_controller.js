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
});