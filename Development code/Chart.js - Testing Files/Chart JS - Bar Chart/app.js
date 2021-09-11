d3.csv("data-2 copy.csv").then(function(data) {

    var crimeLabels = data.map(function(d)  {return d.Crime})
    console.log(crimeLabels)
    
    for (var i = 0; i < data.length; i++)   {
        crime = data[i].Crime;

        // console.log([crime])

    }

    const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B", "#87CEEB", "#1E90FF", "#00008B"]
    new Chart("myChart", {
        type: "bar",

        data: {
          labels: crimeLabels,
          datasets: [{
            backgroundColor: barColors,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            grouped: true, 
            maxBarThickness: 50, 
            label: "Total Number of Offences",            
          }]
        },


        options: {

            title: {
                            display: true,
                            text: "Offences Comitted by Type of Offence"    },
            
            scales: {
                            yAxes: [{
                            ticks: {
                            beginAtZero: true,
                            grouped: true       }
                }]
            },
    }})})