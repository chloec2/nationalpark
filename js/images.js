const baseURL = 'https://developer.nps.gov/api/v1';
const apiKey = "ibb68aM3lgopIz3eB501lFdqrmnkQl1ZandsBF4c";

let parks_dict = new Map();
// returns array of all the parks
function getParks(){
    $(document).ready(function(){
        $.ajax({
            url: baseURL + '/parks?' + 'limit=500/&api_key=' + apiKey,
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
                console.log('error');
            }
        })
    });
}

// activate carousel and enable indicators and controls
function createCarousel(images){
    // Activate carousel
    var results = document.querySelector('#results')
    var carousel = new bootstrap.Carousel(results)
    
    // Enable Carousel Indicators
    for (let i = 0; i < images.length; i++) {
        $(".item" + i).click(function(){
            $("#results").carousel(i);
        });
    }

    // Enable Carousel Controls
    $(".left").click(function(){
        $("#results").carousel("prev");
    });
    $(".right").click(function(){
        $("#results").carousel("next");
    });
}

// displays the images
function ImagesFromPark(){
    resetImages()

    // get the images from the name
    var name = document.getElementById("dropdown");
    var selected = name.options[name.selectedIndex].text;
    var images = parks_dict.get(selected);
    
    // add those images to webcams.html
    if (images.length == 0) {
        $("<p>No available images! Choose another park. </p>").appendTo("#results");
    } 
    else {
        var arrows = `<!-- Left and right controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#results" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#results" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>`
        $(arrows).appendTo("#results");

        var indicators = $('.carousel-indicators');
        var carousel = $('.carousel-inner');
        for (let i = 0; i < images.length; i++){
            if (i == 0) {
                var indic = '<button type="button" data-bs-target="#results" data-bs-slide-to="' + i + '" class="active" aria-current="true" aria-label="Slide 1"></button>'
                $(indic).appendTo(indicators);
            
                var slideshow = $('<div class="carousel-item active"/>').appendTo(carousel);
            }
            else {
                var indic = '<button type="button" data-bs-target="#results" data-bs-slide-to="' + i + '"aria-label="Slide 2"></button>'
                $(indic).appendTo(indicators);
                
                var slideshow = $('<div class="carousel-item"/>').appendTo(carousel);
            }
            
            var img = '<img src="' + images[i].url + '" class="d-block w-100" alt="Image' + i + '">';
            var caption = '<div class="carousel-caption d-none d-md-block">' + images[i].altText + '</div>'
        
            slideshow.append(img);
            slideshow.append(caption);
        }
        createCarousel(images);
    }
}

function resetImages(){
    document.querySelector(".carousel-indicators").innerHTML = '';
    document.querySelector(".carousel-inner").innerHTML = '';
}


