var dat = [];
var d = [];
var demandchart;
var options;
var pricechart;
var pricedata = [];
var pricechartoption;
var costarray = [];
var cost = 0;
var tempcostarray = [];
var newcost = 0;
var costchart;
var total = 0;
var pricetotal = 0;
var uploadchart;
var option1;
var savings = 0;
var dat = [];
var totaldiff  = 0;

var newtotal = 0;
var dataItem;
var diffchartoption;
var diffchart;



$(function () {
    console.log("New cost: " + newcost);
	$(document).ready(function() 
	{
		
		 //Read in the Demand CSV file. $.get is a asychronas jquery call, which executes once all the other code is executed. 
        //Make sure you do what you want to do with the $.get inside the loop, otherwise data wont be picked up



		var testfile = $.get('csv/demand.csv', function(data) 
		{
            console.log("Reading csv/demand.csv");
		    var lines = data.split('\n');
		    $.each(lines, function(lineNo, line) 
		    {
		        var items = line.split(',');
		        //cat.push(items[0]);
		        d.push(parseFloat(items[1]));
		    })
		    $.each(d , function() 
		    {
		         total += this;
		    });
		      console.log('Demand array = ' + d);

        	$.get('csv/price.csv',function(data) {
                    console.log("Reading csv/price.csv");
                    var plines = data.split('\n');
                    $.each(plines, function(lineNo, line) 
                    {
                        var items = line.split(',');
                        //c.push(items[0]);
                        pricedata.push(parseFloat(items[1]));
                    })
                    $.each(pricedata , function() 
                    {
                         pricetotal += this;
                    });

                    console.log("Price total: " + pricetotal);

        			$('#drawgraphs').click(function() 
        			{
                        console.log("Clicked on draw graphs button.");
            			this.disabled = true;//disable the button, otherwise the graph gerneate for every time you click it....
                        $('#demandinfobutton').removeAttr('style');
			 			$("#totaldemand").html('Orginal Electrical Energy Demand for the Day = <b>' + total.toFixed(2) + ' kwh </b>');
						demandchart = new Highcharts.Chart(options);
                        console.log('SIZE OF DMEAND ARRAY AFTER I CREATE THE INITIAL CHART........ ' + d.length);
	                    pricechart = new Highcharts.Chart(pricechartoption);
	                    //console.log('Price Array:' + pricedata);
	                
                    

    					for (var i = 0; i < d.length; i++) 
                        {
                            cost += (d[i] * pricedata[i]);
                            
                        }
                        console.log('MAsterCSV cost cal.......' + cost);


                        for (var j = 0; j < d.length; j++) 
                        {
                            costarray.push(d[j] * pricedata[j]);

                        }
                    
                           
                       		
                        costchart = new Highcharts.Chart(costchartoptions);
                        	
                        $("#totalcost").html('Total Electrical Cost for Today = ' + '€' + cost.toFixed(2));
                   		
    				});



		  });//end of price data, graph generation call
		});// end of calling files call



	
});//end of document.ready call





});

