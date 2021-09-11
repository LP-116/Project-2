    const barColors = ["#87CEEB"]
    new Chart("myChart", {
        type: "line",

        data: {
          labels: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
          datasets: [{
            //// INSERT Y AXIS DATA IN 'DATA' ///////
            data: [1, 2, 3, 3, 5, 7, 7, 8, 10],
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
    }})