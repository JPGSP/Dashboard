            //Overwrite JSON jquery. Convert the json to js variable, so we can run in js though the loop
            JSON.pase = JSON.parse || function (str){
                if (str === "")
                {
                    str = '""';
                }
                eval("var p="+str+";");

                return p;
            };

            $(document).ready(function(){

                //The path read finish with: /Dashboard/public/
                //Passing the path to an array and removing until the / before the last one
                var current_url_array = location.pathname.split("/");
                current_url_array.pop();
                current_url_array.pop();
                var new_path_to_go = current_url_array.join("/");
                //
                var cpu_data = [];
                var concurrency_data = [];
                var time_data = [];
                //
                var current_server = "localhost";


                //Per default form to add data is going to be not visible
                $("#more_data").hide();
                $("#get_max_data").hide();
                $("#get_avg_data").hide();

                //Get all the data from one of the webservices define.
                //Call done to the URL by AJAX using jquery.
                //Once we have the data we go though the array
                function getDataDefault(){
                    //Current time
                    var timeOneHourAgo = new Date();
                    //Removing one hour
                    timeOneHourAgo.setHours(timeOneHourAgo.getHours() - 1);
                    //Pass the time of one hour ago to timestamp
                    var timestampOneHourAgo = timeOneHourAgo.getTime();
                    //Removing the last 3 digits of the timestamp
                    var timestampOneHourAgoString = timestampOneHourAgo.toString();
                    timestampOneHourAgoString = timestampOneHourAgoString.slice(0,-3);
                    timestampOneHourAgo = parseInt(timestampOneHourAgoString);
                
                    //Building the path where the webservices is going to give the data since one hour ago until now
                    //var goTo = "http://localhost"+new_path_to_go+"/rest_api/data_from/" + timestampOneHourAgo;
                    var goTo = "http://"+current_server+new_path_to_go+"/rest_api/data_from/" + timestampOneHourAgo;
                    
                    $.ajax({
                        url: goTo,
                        type: "get",
                        success: function(response){
                            $.each(JSON.parse(response),function(i,index){                              
                              var numberCPULoad;
                              var numberConcurrency;
                              var date;

                              if (typeof index['cpu_load'] === 'string'){
                                  numberCPULoad = parseFloat(index['cpu_load']);
                              }
                              else
                                  numberCPULoad = index['cpu_load'];
                              
                              if (typeof index['concurrency'] === 'string'){
                                  numberConcurrency = parseInt(index['concurrency']);
                              }
                              else
                                  numberConcurrency = index['concurrency'];

                              if (typeof index['timestamp'] === 'string'){

                                  var date = new Date(1000*index['timestamp']);
                                  // Hours part from the timestamp
                                  var hours = date.getHours();
                                  // Minutes part from the timestamp
                                  var minutes = "0" + date.getMinutes();
                                  // Seconds part from the timestamp
                                  var seconds = "0" + date.getSeconds();

                                  // var formattedTime = date.getDate() + "/" + (date.getMonth() + 1) +  "/" + date.getFullYear() + '(' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ')';

                                  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                                  date = formattedTime;
                              }
                              
                              cpu_data.push(numberCPULoad);
                              concurrency_data.push(numberConcurrency);
                              time_data.push(date);
                            });
                        } 
                    });
                }

                //Effects related to MORE DATA
                document.getElementById("btn_more_data").onclick = function () {
                  $("#btn_more_data").hide();
                  $("#more_data").show();
                  getData();
                };

                //Effects related to CANCEL MORE DATA
                document.getElementById("btn_cancel_mode_data").onclick = function(){
                  $("#btn_more_data").show();
                  $("#more_data").hide();
                };

                //Effects related to GET MAX DATA
                document.getElementById("btn_max_data").onclick = function () {
                  $("#btn_max_data").hide();
                  $("#btn_avg_data").hide();
                  $("#get_max_data").show();
                };
                
                //Effects related to CANCEL MAX DATA
                document.getElementById("btn_cancel_max_data").onclick = function () {
                  $("#get_max_data").hide();
                  $("#btn_max_data").show();
                  $("#btn_avg_data").show();
                };

                //Effects related to GET AVG DATA
                document.getElementById("btn_avg_data").onclick = function () {
                  $("#btn_max_data").hide();
                  $("#btn_avg_data").hide();
                  $("#get_avg_data").show();
                };
                
                //Effects related to CANCEL MAX DATA
                document.getElementById("btn_cancel_avg_data").onclick = function () {
                  $("#get_avg_data").hide();
                  $("#btn_max_data").show();
                  $("#btn_avg_data").show();
                };


                //Add a delay to be sure the array are populated from the ajax call
                setTimeout(function(){

                    if (cpu_data.length==0 && concurrency_data==0)
                      alert("No data to display");
                    else{
                        //At this stage we have the arrays defined with the data
                        Highcharts.chart('highchart_graphics', {
                                                               title: {
                                                                      text: 'Test'
                                                               },
                                                               subtitle: {
                                                                      text: 'Author: Joaquin Pino'
                                                               },
                                                               xAxis: {
                                                                      categories: time_data
                                                               },
                                                               series: [{
                                                                            name: 'CPU',
                                                                            data: cpu_data
                                                                        }, {
                                                                            name: 'Concurrency',
                                                                            data: concurrency_data
                                                                        }]
                                                               }
                        );
                    }
                }, 1000);

                //AJAX CALL TO ADD MORE DATA IN THE DB
                $("#more_data").submit(function(e) {
                    e.preventDefault();
                    var numberNewRecords = document.getElementById('how_many').value;
                    var goTo = "http://"+current_server+new_path_to_go+"/rest_api/new_records/";
                    
                    if (numberNewRecords){
                      $.ajax({
                                  url: goTo,
                                  type: "post",
                                  data: {add_row:numberNewRecords},
                                  success: function(response){
                                       alert("Request completed");   
                                       document.getElementById('how_many').value = "";
                                       $("#btn_more_data").show();
                                       $("#more_data").hide();
                                       location.reload();
                                  }, 
                                  error: function(response){
                                       alert("Request Failed");
                                       location.reload();
                                  }
                              });
                    }
                    else
                        alert("Request failed");
                    
                    return false;
                });

                //AJAX CALL TO GET MAX DATA IN THE DB
                $("#get_max_data").submit(function(e) {
                  e.preventDefault();
                  var column_to_search = document.getElementById('data_to_search').value;
                  var from_date = document.getElementById('from_max').value;
                  var to_date = document.getElementById('to_max').value;


                  var timestampFrom = new Date(from_date).getTime()/1000;
                  var timestampTo = new Date(to_date).getTime()/1000;

                  var mssgResult = "MAX value of " + column_to_search + " between "+from_date+" and "+to_date+" : ";

                  //Building the path where the webservices is going to give the data since one hour ago until now
                  //var goTo = "http://localhost/~joakopino/Dashboard/rest_api/max_data_time_slot/" + column_to_search +"/"+timestampFrom+"/"+timestampTo;
                  var goTo = "http://"+current_server+new_path_to_go+"/rest_api/max_data_time_slot/" + column_to_search +"/"+timestampFrom+"/"+timestampTo;

                  $.ajax({
                         url: goTo,
                         type: "get",
                         success: function(response){
                             $.each(JSON.parse(response),function(i,index){ 
                              mssgResult += index['MAX('+column_to_search+')'];
                              alert(mssgResult);
                              $("#get_max_data").hide();
                              $("#btn_max_data").show();
                              $("#btn_avg_data").show();
                             });   
                         },
                         error: function(){
                             mssgResult = "Request failed"; 
                             alert(mssgResult);
                             $("#get_max_data").hide();
                             $("#btn_max_data").show();
                             $("#btn_avg_data").show();
                         } 
                  });

                  return false;

                });

                //AJAX CALL TO GET AVG DATA IN THE DB
                $("#get_avg_data").submit(function(e) {
                  e.preventDefault();
                  var column_to_search = document.getElementById('data_get_avg').value;
                  var from_date = document.getElementById('from_avg').value;
                  var to_date = document.getElementById('to_avg').value;


                  var timestampFrom = new Date(from_date).getTime()/1000;
                  var timestampTo = new Date(to_date).getTime()/1000;

                  var mssgResult = "AVG value of " + column_to_search + " between "+from_date+" and "+to_date+" : ";

                  //Building the path where the webservices is going to give the data since one hour ago until now
                  //var goTo = "http://localhost/~joakopino/Dashboard/rest_api/average_data_time_slot/" + column_to_search +"/"+timestampFrom+"/"+timestampTo;
                  var goTo = "http://"+current_server+new_path_to_go+"/rest_api/average_data_time_slot/" + column_to_search +"/"+timestampFrom+"/"+timestampTo;

                  $.ajax({
                         url: goTo,
                         type: "get",
                         success: function(response){
                             $.each(JSON.parse(response),function(i,index){ 
                              mssgResult += index['AVG('+column_to_search+')'];
                              alert(mssgResult);
                              $("#get_avg_data").hide();
                              $("#btn_max_data").show();
                              $("#btn_avg_data").show();
                             });   
                         },
                         error: function(){
                             mssgResult = "Request failed"; 
                             alert(mssgResult);
                             $("#get_avg_data").hide();
                             $("#btn_max_data").show();
                             $("#btn_avg_data").show();
                         } 
                  });

                  return false;
                
                });

                //Per default getDataDefault
                getDataDefault();
                setInterval(function(){getDataDefault();}, 10000);
            });