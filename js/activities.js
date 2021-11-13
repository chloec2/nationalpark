// Let visitors search from a list of activities to do at different National Parks
// Visitors can click an activity and have the web app display all the National Parks tied to a specific activity
// After selecting a specific park, the app should pull up an informational page so the visitor can learn more about the park.
// Have a feature on the web app where visitors can: 
// Retrieve data from park web cams based on which National Park(s) the user selects. Specifically, this feature should be able to display the non-streaming images collected from park web cams so a visitor can view them with ease.


const baseURL = 'https://developer.nps.gov/api/v1';
const apiKey = "ibb68aM3lgopIz3eB501lFdqrmnkQl1ZandsBF4c";

let activities_dict = new Map();
// returns array of all the activities
function getActivities(){
    let activities = Array();
    $(document).ready(function(){
        $.ajax({
            url: baseURL + '/activities?/&api_key=' + apiKey,
            type: "GET",
            success: function(result) {
                // pushes all names of activities into activiites list and actiivites_dict
                for (let i = 0; i < result.data.length; i++) {
                    let activityName = result.data[i].name;
                    let activityID = result.data[i].id;
                    activities.push(activityName);
                    activities_dict.set(activityName, activityID);
                }

                // populating table in index.hthml
                var table = $('#activities')
                const cols = 5;
                const rows = result.data.length / cols;
                for (let row = 0; row < rows; row++) {
                    var tr = $('<tr/>').appendTo(table);
                    for (let col = 0; col < cols; col++) {
                        let j = row*cols + col;
                        var activityName = activities[j];
                        var checkbox = '<input type="checkbox" id="activity' + j + '" name="activity' + j + '" value="' + activityName + '">';
                        var label = '<label for="activity' + j + '">' + activityName + '</label><br>';
                        tr.append('<td>' + checkbox + label + '</td>');
                    }
                }

            },
            error:function(error){
                console.log('error');
            }
        })
    });
}

// returns an array of all the checked boxes (id of activities)
function checkboxToArr(){
    const table = document.getElementById("activities");
    let vals = table.getElementsByTagName("input") 
    let checked = Array();
    for (let i = 0; i < vals.length; i++) {
        if (vals[i].checked) {
            let id = activityNametoID(vals[i].value)
            checked.push(id);
        }
    }
    return checked;
}

// returns the id of an activity name
function activityNametoID(name){
    return activities_dict.get(name);
}


function resetParks(){
    document.getElementById("results").innerHTML = '';
}

// creates set of parks that have at least 1 of the activities
// lists them in results.html
function getParksFromActivities(){
    resetParks();

    let parkNames = new Set();
    let parkURLs = new Set();
    let activityIDArr = checkboxToArr();

    // if nothing is selected do nothing
    if (activityIDArr.length == 0) {
        var list = $('#results');
        list.append("<p>No parks selected!</p>");
        return;
    }

    // add all selected activites to the url
    let url = baseURL + '/activities/parks?id=' + activityIDArr[0];
    for (let i = 1; i < activityIDArr.length; i++){
        url = url + ',' + activityIDArr[i];
    }
    url = url + '/&api_key=' + apiKey;

    // get the parks that have at least one of the activities
    $(document).ready(function(){
        $.ajax({
            url: url,
            type: "GET",
            success: function(result){
                for (let i = 0; i < result.data.length; i++) {
                    for (let j = 0; j < result.data[i].parks.length; j++){
                        let parkName = result.data[i].parks[j].fullName;
                        let parkURL = result.data[i].parks[j].url;
                        parkNames.add(parkName);
                        parkURLs.add(parkURL);
                    }
                }
                parkNames = Array.from(parkNames);
                parkURLs = Array.from(parkURLs);

                // display in results.html
                var list = $('#results');
                for (let j = 0; j < parkNames.length; j++) {
                    var cell = $('<div id="cell"/>').appendTo(list);
                    cell.append("<a href=" + parkURLs[j] + " target=\"_blank\">" + parkNames[j] + "</a>");
                    
                }
            },

            error:function(error){
                console.log('error');
            }
        })
    });
}