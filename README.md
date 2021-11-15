# National Park Finder
This web app uses National Park Service API to help you find all the national parks that offer the activities you're looking for, as well as look at images of any national park! 

Deployed at: https://chloec2.github.io/nationalpark/


## Solution
This web app uses National Park Service API to help you find all the national parks that offer the activities you're looking for and displays it in a grid, where each cell can be clicked to take you to the page of that national park for more information. I first queried for the activity names by making a HTTP GET request to the API, and then queried for all the parks and links related to the selected activities. Each time the "Find Parks!" button is clicked, the results are cleared and the grid is populated with the new results.

The second page of the web app also allows you to view a slideshow of images that were retrieved from park webcams​ and displayed using Bootstrap. After selecting from a dropdown menu of all the parks, which was queried from the API, images are displayed using a Bootstrap carousel, along with captions and slideshow indicators. Each time a new park is selected and the "View Images!" button is clicked, a new set of images are displayed based on the selection.


## Challenge Prompt
(Copied from MindSumo)

For the last 100 years, the National Park Service has contributed greatly to the preservation and management of America's national parks, as well as many of its national monuments. More than 330 million people visit the 61 national parks they oversee each year, with 40 million overnight campers. 

We want your help keeping those visitors informed, educated, and safe as they enjoy the parks. Using the National Park Service API, as well as any other public APIs you need, build a deployable web app that will allow users to have the best National Park experience possible with an intuitive, easy to navigate interface.

To complete this challenge, build a web application that can do the following:

1. Let visitors search from a list of activities to do at different National Parks

    a) Visitors can click an activity and have the web app display all the National Parks tied to a specific activity

    b) After selecting a specific park, the app should pull up an informational page so the visitor can learn more about the park.

2. Have a feature on the web app where visitors can: 

    a) Retrieve data from park web cams based on which National Park(s) the user selects. Specifically, this feature should be able to display the non-streaming images collected from park web cams so a visitor can view them with ease.
