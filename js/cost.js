
$(function () {
   
    $(document).ready(function() {
   
       
        costchartoptions = {
            chart: {
                renderTo: 'cost',
                animation: false,
                type: 'areaspline',
                zoomType: 'x'
            },
            title: {
                text: 'Cost of your Electricity for next 24hrs'
            },
            
           xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat('%I:%M %P', this.value);
                    }
                }
            },
            yAxis: {
                title: {
                    text: '€'
                },
               
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
        
            plotOptions: 
            {
                arespline: 
                {
                    lineWidth: 2,
                    fillOpacity: 0.9,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    
                    // one hour
                     pointStart: Date.UTC(2012, 4, 11, 6, 00),
                    pointInterval: 30 * 60 * 1000
                }
            },

            tooltip: {
                 valueDecimals: 2,
                formatter: function () {
                    return '' +
                        Highcharts.dateFormat('%H:%M', this.x) + ': ' + this.y + ' €';
                }
            },

            series: [{
                name: 'Your Cost',
                data: costarray, 
                color: '#CC3232'
    
            }, ]
            ,
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        };

           

      
    });
    
});