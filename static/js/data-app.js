function init() {

    d3.json("/api/v1.0/suburbs").then((item) => {

        var dropdownMenu = d3.select("#selDataset");

        var dropdownNames = item;
        // console.log(dropdownNames);
        
        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);
        });
        
        buildGraph();
    });
};

init()


function buildGraph() {
    
    d3.json("/api/v1.0/incidents").then((data) => {

        document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';

        var idSelect = d3.select("#selDataset").property("value")

        console.log(idSelect);

        console.log(data[0])

       
        suburb_list = []
        incident_list = []
        offence_sub_div_list = []

        for (var i in data) {

            if(data[i][0] === idSelect){
                suburb_list.push(data[i][0])
                incident_list.push(data[i][2]) &&
                offence_sub_div_list.push(data[i][1])
            }
        }

        console.log(suburb_list);
        console.log(incident_list);
        console.log(offence_sub_div_list);

        const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B"]
        var myChart = new Chart("myChart", {
        type: "bar",

        data: {
          labels: offence_sub_div_list,
          datasets: [{
            backgroundColor: barColors,
            data: incident_list,
            grouped: true, 
            maxBarThickness: 50, 
            label: "Total Number of Offences",            
          }]
        },


        options: {

            responsive: true,
            maintainAspectRatio: false,

            title: {
                            display: true,
                            text: "Offences Comitted by Type of Offence"    },
            
            scales: {
                            yAxes: [{
                            ticks: {
                            beginAtZero: true,
                            grouped: true}
                }]

            },

            
    }})})

    
    

    // var offence_div = unpack(data.data, 5);
    // var offence_sub_div = unpack(data.data, 6);
    // var incident = unpack(data.data, 7);
  
    // var top10 = suburb.slice(0,10)
    // var top_incidents = incident.slice(0,10)

    // console.log(top10)

    // console.log(suburb);
    // console.log(lga);
    // console.log(postcode);
    // console.log(year);
    // console.log(offence_div);
    // console.log(offence_sub_div);
    // console.log(incident);
    // console.log(lat);
    // console.log(lng);

    var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);


    // var suburbMatch = suburb.filter(element => element === idSelect)

    

    // console.log(suburbMatch)

    // var idMatch = idInfo.find(element => element.id === idSelect);
    
    // const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B"]
    // new Chart("myChart", {
    //     type: "bar",

    //     data: {
    //       labels: top10,
    //       datasets: [{
    //         backgroundColor: barColors,
    //         data: top_incidents,
    //         grouped: true, 
    //         maxBarThickness: 50, 
    //         label: "Total Number of Offences",            
    //       }]
    //     },


    //     options: {

    //         title: {
    //                         display: true,
    //                         text: "Offences Comitted by Type of Offence"    },
            
    //         scales: {
    //                         yAxes: [{
    //                         ticks: {
    //                         beginAtZero: true,
    //                         grouped: true       }
    //             }]
    //         },
    // }})})
    }
  
    //   Plotly.newPlot("plot", data, layout);


function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}

function optionChanged()
{

    buildGraph()
}

// buildGraph()

// function filteredTable() {

//     // Prevent the page from refreshing:
//     d3.event.preventDefault();

//     // Select the input element and pass it into a variable:
//     var inputElement = d3.select(“#mylist”);
//     var inputValue = inputElement.property("value");
//     let filteredData = tableData;

//     // Printing inputValue to the console:
//     console.log(inputValue)

//     // Passing a variable to store the date in which the user inputs in the webpage.
//     // Creating a condition where only the results from the data.js file which = the input value are returned: 
//     filteredData = filteredData.filter(suburb => suburb  == inputValue)

//     // Building table for the filtered data:
    // buildTable(filteredData)};

// Appending results into a new table on the HTML page:

// 
// d3.selectAll(“#mylist”)on("click", filteredTable)
// buildTable(tableData);
