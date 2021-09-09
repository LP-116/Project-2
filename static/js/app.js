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


function buildGraph() {
    
    d3.json("/api/v1.0/incidents").then((data) => {

        document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';

        var idSelect = d3.select("#selDataset").property("value")

        console.log(idSelect);
       
        suburb_list = []
        incident_list = []
        offence_sub_div_list = []


        for (var i in data) {

            if(data[i][1] === idSelect){
                suburb_list.push(data[i][1])
                incident_list.push(data[i][3]) &&
                offence_sub_div_list.push(data[i][2])
            }
        }

        var top5_incidents = incident_list.slice(0,5);
        var top5_sub_div = offence_sub_div_list.slice(0,5);

        console.log(top5_incidents);
        console.log(top5_sub_div);

        const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B"]
        var myChart = new Chart("myChart", {
        type: "horizontalBar",

        data: {
          labels: top5_sub_div,
          datasets: [{
            backgroundColor: barColors,
            data: top5_incidents,
            grouped: true, 
            maxBarThickness: 50, 
            label: "Total Number of Offences",            
          }]
        },


        options: {

            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            title: {
                    display: true,
                    text: "Offences Comitted by Type of Offence"
                },
            
            scales: {
                    yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    grouped: true
                }
                }]

            },

            
    }})})

    d3.json("/api/v1.0/line_data").then((data) => {

        document.querySelector("#chartReport2").innerHTML = '<canvas id="myChart2"></canvas>';

        var idSelect = d3.select("#selDataset").property("value")

        console.log(idSelect);

        incident_list = []
        year_list = []

        for (var i in data) {

            if(data[i][1] === idSelect){
                year_list.push(data[i][0])
                incident_list.push(data[i][2])
            }
        }


        console.log(incident_list);
        console.log(year_list)

        const barColors = ["#87CEEB"]
        new Chart("myChart2", {
        type: "line",

        data: {
          labels: year_list.reverse(),
          datasets: [{
            //// INSERT Y AXIS DATA IN 'DATA' ///////
            data: incident_list.reverse(),
            grouped: true, 
            maxBarThickness: 50, 
            //// INSERT X AXIS DATA IN 'LABEL' /////
            label: "Total Number of Offences",   
            fill: false,
            borderDash: [5, 5],    
            borderColor: "#87CEEB",
            pointStyle: 'rectRot'
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
    }})


});

}




function optionChanged()
{ buildGraph() }


init();