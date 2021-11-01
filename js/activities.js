// Let visitors search from a list of activities to do at different National Parks
// Visitors can click an activity and have the web app display all the National Parks tied to a specific activity
// After selecting a specific park, the app should pull up an informational page so the visitor can learn more about the park.
// Have a feature on the web app where visitors can: 
// Retrieve data from park web cams based on which National Park(s) the user selects. Specifically, this feature should be able to display the non-streaming images collected from park web cams so a visitor can view them with ease.


const baseURL = 'https://developer.nps.gov/api/v1';
const apiKey = "ibb68aM3lgopIz3eB501lFdqrmnkQl1ZandsBF4c";

function getParkFromActivity(activityID){
    let park = Array();
    $(document).ready(function(){
        $.ajax({
            url: baseURL+'/activities/parks?id=' + activityID + '/&api_key='+ apiKey,
            type: "GET",
            success: function(result) {
                console.log(result.data[0].parks[0].fullName);
            },
            error:function(error){
                console.log('error');
            }
        })
    });
}

// get all the activities
function getActivities(){
    let activities = Array();
    $(document).ready(function(){
        $.ajax({
            url: baseURL+'/activities?/&api_key='+ apiKey,
            type: "GET",
            success: function(result) {
                // pushes all names of activities into activiites list
                for (let i = 0; i < result.data.length; i++) {
                    let activity = result.data[i].name;
                    activities.push(activity);
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

$(function() {
    $('#gallery a').lightBox();
});