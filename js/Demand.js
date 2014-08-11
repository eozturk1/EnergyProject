(function (Highcharts) {
    var addEvent = Highcharts.addEvent,
        each = Highcharts.each;

    /**
     * Filter by dragMin and dragMax
     */
    function filterRange(newY, series, XOrY) {
        var options = series.options,
            dragMin = options['dragMin' + XOrY],
            dragMax = options['dragMax' + XOrY];

        if (newY < dragMin) {
            newY = dragMin;
        } else if (newY > dragMax) {
            newY = dragMax;
        }
        return newY;
    }

    Highcharts.Chart.prototype.callbacks.push(function (chart) {

        var container = chart.container,
            dragPoint,
            dragX,
            dragY,
            dragPlotX,
            dragPlotY;

        //chart.redraw(); // kill animation (why was this again?)

         addEvent(container, 'mousedown', function (e) {
            var hoverPoint = chart.hoverPoint,
                options;

            if (hoverPoint) {
                options = hoverPoint.series.options;
                if (options.draggableX) {
                    dragPoint = hoverPoint;

                    dragX = e.pageX;
                    dragPlotX = dragPoint.plotX;
                }

                if (options.draggableY) {
                    dragPoint = hoverPoint;

                    dragY = e.pageY;
                    dragPlotY = dragPoint.plotY + (chart.plotHeight - (dragPoint.yBottom || chart.plotHeight));
                }

                // Disable zooming when dragging
                if (dragPoint) { 
                    chart.mouseIsDown = false;
                }
            }
        });

        addEvent(container, 'mousemove', function (e) {
            if (dragPoint) {
                var deltaY = dragY - e.pageY,
                    deltaX = dragX - e.pageX,
                    newPlotX = dragPlotX - deltaX - dragPoint.series.xAxis.minPixelPadding,
                    newPlotY = chart.plotHeight - dragPlotY + deltaY,
                    newX = dragX === undefined ? dragPoint.x : dragPoint.series.xAxis.translate(newPlotX, true),
                    newY = dragY === undefined ? dragPoint.y : dragPoint.series.yAxis.translate(newPlotY, true),
                    series = dragPoint.series,
                    proceed;

                newX = filterRange(newX, series, 'X');
                newY = filterRange(newY, series, 'Y');

                // Fire the 'drag' event with a default action to move the point.
                dragPoint.firePointEvent(
                    'drag', {
                    newX: newX,
                    newY: newY
                },

               updatechart = function () {
                    proceed = true;
                    dragPoint.update([newX, newY], false);
                    chart.tooltip.refresh(dragPoint);
                    if (series.stackKey) {
                        chart.redraw();
                    } else {
                        series.redraw();
                       temptotal = series.data.reduce(function(a,b)//get the sum of the points as I update
                            {
                            return a + b.y;                           
                            },0);

                        newtotal = temptotal;
                        totaldiff = (newtotal - total);//calculate the difference
                        $("#totaldiff").html('Difference in Demand = <b>' + totaldiff.toFixed(2) + '</b>');
                      

                         $("#newtotaldemand").html('New Total Electrical Energy Demand for the Day = <b>' + newtotal.toFixed(2) + ' kwh </b>');
                         
                       
                        diffchartoption = //create the difference Bar chart which wi
                                {
                                   chart: {
                                       renderTo: 'differencediv',
                                       type: 'bar',
                                       animation: false,
                                       //zoomType: 'x',
                                       minRange: 1 

                                   },
                                   title: {
                                       text: 'Difference in Demand'
                                   },
                                   subtitle: {
                                       text: 'This must remain as close to zero as possible'
                                   },
                                   
                                   xAxis: {
                                   categories: ['Difference'],
                                   labels:
                                      {
                                          enabled: false
                                      }
                                    },
                                     yAxis: 
                                    {                
                                        min: -20,
                                        max: 20
                                    },
                                    plotOptions: {
                                       column: {
                                            stacking: 'normal'
                                        },
                                        stickyTracking: false
                                                
                                       
                                    },
                                    
                                    series: 
                                    [{
                                        name: 'Difference',
                                        data: [totaldiff]  //cals the test difference array from the upload js      
                                    }]
                                };
                        
                        diffchart = new Highcharts.Chart(diffchartoption);
                        for (var f = 0; f<d.length; f++)
                        {
                            if(d[f] instanceof Array)
                            {
                                d[f] = d[f][1];

                            }
                            else
                            {
                                d[f] = d[f];
                            }

                            
                        }
                      
                    }

                });
                
                // The default handler has not run because of prevented default
                if (!proceed) {
                    drop();
                }
            }
        });

        function drop(e) {
            if (dragPoint) {
                if (e) {
                    var deltaX = dragX,// - e.pageX,
                        deltaY = dragY - e.pageY,
                        newPlotX = dragPlotX - deltaX, //dragPoint.series.xAxis.minPixelPadding,
                        newPlotY = chart.plotHeight - dragPlotY + deltaY,
                        series = dragPoint.series,
                        newX = dragX === undefined ? dragPoint.x : dragPoint.series.xAxis.translate(newPlotX, true),
                        newY = dragY === undefined ? dragPoint.y : dragPoint.series.yAxis.translate(newPlotY, true);
    
                    newX = filterRange(newX, series, 'X');
                    newY = filterRange(newY, series, 'Y');
                    dragPoint.update([newX, newY]);
                }
                for (var f = 0; f<d.length; f++)
                        {
                            if(d[f] instanceof Array)
                            {
                                d[f] = d[f][1];

                            }
                            else
                            {
                                d[f] = d[f];
                            }

                            
                        }
                for (var i = 0; i<d.length; i++)
                {
                    tempcostarray.push(d[i]*pricedata[i]);
                }

                costchart.series[0].setData(tempcostarray);
                costchart.redraw();

                $.each(tempcostarray , function() 
                    {
                         newcost += this;
                    });
                
                dragPoint.firePointEvent('drop');
            }
            dragPoint = dragX = dragY = undefined;
        }
        addEvent(document, 'mouseup', drop);
        addEvent(container, 'mouseleave', drop);
    });

   

})(Highcharts);
// End plugin

$(function () {
    console.log('D length' +d.length);
   
    
$(document).ready(function () {   
        options = {
             chart: {
        renderTo: 'demanddiv',
        animation: false,
        zoomType:'x',
        type: 'areaspline'
    },

    title: {
                text: 'Electrical Energy Demand'
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
                    text: 'kwh(Kilowatt hour)'
                },
                
                minorGridLineWidth: 1,
                gridLineWidth: 1,
                

            },
            
    plotOptions: {
        series: {
            cursor: 'ns-resize',
            point: {
                events: {
                    
                    drag: function(e) {

                       
                        $('#drag').html(
                            'Changing <b>' + this.series.name + '</b> for this half hour to <b>' + 
                            Highcharts.numberFormat(e.newY, 2) + ' kwh  </b>'
                        );
                    },
                    drop: function() {
                        $('#drop').html(
                            this.series.name + ' for this half hour was set to <b>' + 
                            Highcharts.numberFormat(this.y, 2) + ' kwh</b>'
                            
                        ),
                        console.log('At Drop>>>' + tempcostarray);
                        console.log(tempcostarray.length);
                        console.log(newcost);
                        savings = cost - newcost;
                        if(savings >= 0)
                        {    
                            $("#savings").html('You Save = ' + '€' + savings.toFixed(2));
                        }
                        else
                        {
                            $("#savings").html('You will have to pay ' + '<b>€ ' + savings.toFixed(2)*(-1) + '</b> extra');
                        }
                        $("#newcost").html('Your New Cost for Today = ' + '€' + newcost.toFixed(2));
                        savings = 0;
                        tempcostarray = [];
                        newcost = 0;
                        
                        //console.log('PLEASE FOR THE LOVE OF GOD WORK>>>>>>>>>COST AT DROP: ' + newcost);
                    }
                   

                }
            },
            stickyTracking: false
        },
        areaspline: {

                    lineWidth: 2,
                    fillOpacity: 0.5,
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
                        Highcharts.dateFormat('%H:%M', this.x) + ': ' + this.y + ' kwh';
                }
            },     
    
    series: [ {
        name: 'Demand',
        data: d, 
        draggableY: true,
        color: '#67C8FF'
    }]

};

         
  });  

});