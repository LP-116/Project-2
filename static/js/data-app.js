function init() {

    d3.json("/api/v1.0/suburbs").then((item) => {

        var dropdownMenu = d3.select("#myList");

        var dropdownNames = item;
        // console.log(dropdownNames);
        
        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);
        });

    });
};

init()