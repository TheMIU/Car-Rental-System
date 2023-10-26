////////////// baseURL
const baseURL = 'http://localhost:8080/Backend_war/';

////////////// enlarge images when click
$(".enlargeableImg").click(function () {
    var newWindow = window.open("", "_blank");
    newWindow.document.write("<div style=' background-color: black;position: absolute; top: 0; left: 0; right: 0;" +
        " bottom: 0; display: flex; justify-content: center; align-items: center;'><img src=" + this.src + " /></div>");
});
