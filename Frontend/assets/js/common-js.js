////////////// baseURL
const baseURL = 'http://localhost:8080/Backend_war/';

////////////// enlarge images when click
$(".enlargeableImg").click(function () {
    const imageUrl = this.src; // Get the image URL from the src attribute
    window.open(imageUrl, "_blank"); // Open the image in a new tab
});
