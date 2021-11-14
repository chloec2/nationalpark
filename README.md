# National Park Finder
This web app uses National Park Service API to help you find all the national parks that offer the activites you're looking for, as well as look at images of any national park! 


## Solution
This web app involves two pages. 

The first page, Activites, allows you to select from available activites and lists all the parks that offer at least 1 of the selected activites. The parks are displayed in a grid, and each result is hyperlinked to the park's webpage for more information.

In the second page, Images, you can select a park from a dropdown menu. Clicking the "View Images" button will display a slideshow of images that were retrived from park webcams, which was done using Bootstrap. 


## Challenege Prompt
(Copied from MindSumo)

For the last 100 years, the National Park Service has contributed greatly to the preservation and management of America's national parks, as well as many of its national monuments. More than 330 million people visit the 61 national parks they oversee each year, with 40 million overnight campers. 

We want your help keeping those visitors informed, educated, and safe as they enjoy the parks. Using the National Park Service API, as well as any other public APIs you need, build a deployable web app that will allow users to have the best National Park experience possible with an intuitive, easy to navigate interface.

To complete this challenge, build a web application that can do the following:

1. Let visitors search from a list of activities to do at different National Parks

    a) Visitors can click an activity and have the web app display all the National Parks tied to a specific activity

    b) After selecting a specific park, the app should pull up an informational page so the visitor can learn more about the park.

2. Have a feature on the web app where visitors can: 

    a) Retrieve data from park web cams based on which National Park(s) the user selects. Specifically, this feature should be able to display the non-streaming images collected from park web cams so a visitor can view them with ease.
