$(function () {
    
    $(document).ready(function() {
       
            
        pricechartoption = {
            chart: {
                renderTo: 'price',
                type: 'areaspline',
                zoomType: 'x'
            },
            title: {
                text: 'Electrical Energy Price Plan'
            },
            subtitle: {
                text: 'Agreed between you and your Energy Provider'
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
                    text: 'Euro'
                },
                
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                alternateGridColor: null

            },
            tooltip: {
                formatter: function () {
                    return '' +
                        Highcharts.dateFormat('%H:%M', this.x) + ': ' + '€' + this.y  ;
                }
            },
            plotOptions: {
                areaspline: {
                    lineWidth: 2,
                    fillOpacity: 0.6,
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
            series: [{
                name: 'Price Plan',
                data: pricedata,
                    color: '#488214'
    
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