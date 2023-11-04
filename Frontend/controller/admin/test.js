/*$.ajax({
    url: 'http://localhost:8080/Backend_war/booking',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
        console.log(response.data);
    },
    error: function (error) {
        console.log(error.responseJSON.message)
        alert(error.responseJSON.message);
    }
});*/

$.ajax({
    url: 'http://localhost:8080/Backend_war/booking',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
        let allItems = response.data
        console.log(allItems)
    },
    error: function (error) {
        console.log(error)
        //alert(error.responseJSON.message);
    }
});