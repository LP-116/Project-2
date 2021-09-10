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
        updatestats();

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

        const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#1f50cc", "#1E90FF"]
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
                    text: "2021: Top 5 Offences Comitted",
                    fontSize: 16
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
            data: incident_list.reverse(),
            grouped: true, 
            maxBarThickness: 50, 
            label: "Total Number of Offences",   
            fill: false,
            borderDash: [5, 5],    
            borderColor: "#1f50cc",
            pointBordercolor: "navy",
            pointBackgroundColor: 'red',
            pointStyle: 'rectRot'
          }]
        },


        options: {

            responsive: true,
            maintainAspectRatio: false,

            title: {
            display: true,
            text: "Total No. of Offences Comitted from 2012 - 2021",
            fontSize: 16},
            
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

function updatestats() {


    d3.json("/api/v1.0/stats_data").then((data) => {

        var idSelect = d3.select("#selDataset").property("value")

        console.log(idSelect);

        incident_list = []
        incident_list2 = []

        for (var i in data) {

            if(data[i][1] === idSelect && data[i][0] === parseInt("2021")){
                incident_list.push(data[i][4])
            }
        }

        for (var x in data) {

            if(data[x][1] === idSelect && data[x][0] === parseInt("2020")){
                incident_list2.push(data[x][4])
            }
        }

        var difference = (incident_list[0] - incident_list2[0])
        var difference2 = ((incident_list2[0] - incident_list[0]) / incident_list[0] * 100).toFixed(2);

        d3.select("#card2021").text(incident_list[0]);
        d3.select("#card2020").text(incident_list2[0]);
        d3.select("#difference").text(difference);

        if (difference < 0) {

            d3.select("#difference2").text((difference2) + "% decrease");
            }

            else {
                var newDifference = Math.abs(difference2)
                d3.select("#difference2").text((newDifference) + "% increase");
            }


    })


}




function optionChanged()
{ buildGraph();
updatestats()
 }


init();