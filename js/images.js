// Have a feature on the web app where visitors can: 
// Retrieve data from park web cams based on which National Park(s) the user selects.
// Specifically, this feature should be able to display the non-streaming images 
// collected from park web cams so a visitor can view them with ease.

const baseURL = 'https://developer.nps.gov/api/v1';
const apiKey = "ibb68aM3lgopIz3eB501lFdqrmnkQl1ZandsBF4c";

let parks_dict = new Map();
// returns array of all the parks
function getParks(){
    $(document).ready(function(){
        $.ajax({
            url: baseURL + '/parks?/&api_key=' + apiKey,
            type: "GET",
            success: function(result) {
                // pushes all names and images into parks_dict
                for (let i = 0; i < result.data.length; i++) {
                    let parkName = result.data[i].fullName;
                    let parkImages = result.data[i].images;
                    parks_dict.set(parkName, parkImages);
                }

                // add every park as an option in the dropdown
                var dropdown = $('#dropdown');
                let i = 0;
                for (const [name, images] of parks_dict.entries()) {
                    dropdown.append('<option value="park' + i + '">' + name + '</option>');
                    i++;
                }

            },
            error:function(error){
                console.log('error');``
            }
        })
    });
}

// displays the images after selection
function ImagesFromPark(){
    // get the images from the name
    var name = document.getElementById("dropdown");
    var selected = name.options[name.selectedIndex].text;
    var images = parks_dict.get(selected);


    // add those images to webcams.html
    var results = $('#results');
    for (let i = 0; i < images.length; i++){
        results.append('<img src="' + images[i].url + '" alt="' + images[i].altText + '">');
    }
    
}   