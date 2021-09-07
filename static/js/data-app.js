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

var tbody = d3.select("tbody");

function buildTable() {

    d3.json("/api/v1.0/data_tab").then((data) => {

    data.forEach((dataRow) => {
    
        var row = tbody.append("tr");

        Object.values(dataRow).forEach((value) => {
            row.append("td").text(value);
        });

    });

});
}

var filterButton = d3.select("#filter-btn");

filterButton.on("click", runFilter);



function runFilter() {

    d3.event.preventDefault();

    var suburbElement = d3.select("#suburbSelect");
    
    var suburbValue = suburbElement.property("value");
    console.log(suburbValue);

    var yearElement = d3.select("#yearSelect");
    var yearValue = yearElement.property("value");
    console.log(yearValue);

    d3.json("/api/v1.0/data_tab").then((data)=> {
        
        var filteredData = data.filter(dataEntry => ((dataEntry[1] === suburbValue) && dataEntry[0] === parseInt(yearValue, 10)))

        console.log(filteredData);

        if (!filteredData.length) {

            console.log("No result")
    
            tbody.html("");
    
            tbody.text("No results for selected inputs.");}
    
        else {
        
        tbody.html("");
    
        filteredData.forEach((dataEntry) => {
    
            var row = tbody.append("tr");
    
            Object.values(dataEntry).forEach((value) => {
                row.append("td").text(value);
            });
        });

    }

});

}




