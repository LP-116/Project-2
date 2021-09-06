function init() {

    d3.json("/api/v1.0/suburbs").then((item) => {

        var dropdownMenu = d3.select("#mylist");

        var dropdownNames = item;
        console.log(dropdownNames);

        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);
        });

    });
};

init()


d3.json("/api/v1.0/all_data").then((data) => {

    var suburb = unpack(data.data, 2);
    var lga = unpack(data.data, 3);
    var postcode = unpack(data.data, 4);
    var year = unpack(data.data, 1);
    var offence_div = unpack(data.data, 5);
    var offence_sub_div = unpack(data.data, 6);
    var incident = unpack(data.data, 7);
    var lat = unpack(data.data, 8);
    var lng = unpack(data.data, 9);

    


    // console.log(Object.keys(data.columns[0]));


    console.log(suburb);
    console.log(lga);
    console.log(postcode);
    console.log(year);
    console.log(offence_div);
    console.log(offence_sub_div);
    console.log(incident);
    console.log(lat);
    console.log(lng);



});

function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}