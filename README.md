# Project-2
## Victorian Crime Data Dashboard

## Project Team: Leanne Porter, Mathew Johnson, Amber Van Harskamp

#### To run the dashboard on your computer follow the directions [here](#running-the-app)

---
### Task

To create a dashboard which a user can interact with to see a snapshot of the prevalence of crime in Victoria.
To run the app on your local machine, please follow the instructions [here](#running-the-app)


---
### Method

This project had 2 main parts.
__Part 1: ETL process__
__Part 2: Dashboard Creation__


#### Part 1: ETL process

__Extract:__
The main data source used in this project was a Criminal Offences by LGA spreadsheet sourced from the Vic Government Crime Statistic site. 
This file contained all the relevant information we required but was missing the suburb longitude and latitude. Therefore, to extract the coordinate information for each suburb a Google Maps API was used to pull the data.

__Transform:__
Once the main csv file was extracted, it then needed to be transformed. Unnecessary columns were removed and columns were renamed.
In order to get the coordinates of each suburb firstly a unique list of suburbs from the main csv file was generated – this was done to speed up and limit the data retrieval required. The original csv file was over 300000 lines long so by creating a new file with unique suburbs the number of lines retrieved was reduced to around 2000. 
Once the new suburb csv file was created that included the coordinates, both files were merged into 1 dataframe.

__Load:__

A PostgreSQL database was created using quickdbd and pgAdmin and then our final cleaned dataframe was loaded into the database via Pandas.
A MongoDB database was also used for the webscraping portion of our dashboard.

#### Part 2: Creation

Once the database was loaded and ready to use we moved into the creation phase.

Firstly a skeleton HTML file was created to outline where our visualisations would go and give us a html file to work with.
Next we moved on to creating the app routes.
12 app routes were created that returned data in json format:
*	2 routes related to rendering the html pages
*	2 routes related to web scraping
*	1 route that was used to populate the drop down menu’s
*	3 routes were used to generate map data
*	3 routes were used to generate the graphs/stats section
*	And lastly 1 route was used to generate the data required for a data tab.

__Dashboard creation tools:__


The below tools were used in creating our dashboard:
•	D3.js – To write the code that generated the visualisations
•	Chart.js – The library used to generate the bar and line chart
•	Bootstrap – To design our html page
•	Bootswatch – We used the Flatly theme
•	Mapbox – To generate the maps with leaflet.
•	Leaflet – To generate the maps.
•	HTML / CSS / JS – To format and generate our webpage.


#### Functions of the dashboard:

* The dashboard allows users to select a suburb and the data updates accordingly.
* A bar graph showing the top 5 offences for the year 2021 appears and a line graph showing the total number of offences for the suburb selected for the past 10 years.
* A stats section shows the difference between total number of offences between 2021 and 2020.
* Interactive maps that shows incidents via suburb for the years 2021, 2020 and 2015
* The 5 latest news headlines are scraped from the Victorian crime news section and displayed on a moving banner at the top of the screen. 
* A news tab is available that gives users more information about the news headline and provides a link to the story.
* A data tab is available for the users to look up a suburb and return the data in a table format.

#### Behind the scenes:
The make the dashboard work the code uses the routes returned in a json data format. The route is passed in the d3.json command and then the code matches the value in the drop down box to the json data. Any time a match appears the required data is added into a list. In the case of the bar graph, the list is sliced to returned the top 5 results and it is then used as the variable for the graph axis’s.

To generate the stats boxes the same process was followed. We return matches to the value in the dropdown box that also match the year 2021 and 2020. Some simple calculations are then done to determine the difference and all the values are simply added to their spot in the card by using d3.select and inserting text.

To generate the maps the data is again generated from the app routes. The circle markers are created using the data returned from the app route and different layer groups are created for each different year (which include the pop information). The base maps are created using mapbox and colors are applied to the map by defining different functions for the legend and circle markers.

The news scraping is completed by using BeautifulSoup and splinter. The code grabs the latest 5 stories and adds the title, url and description into a separate list. The lists are then converted into a dictionary format and inserted into the MongoDb via a route.

The data tab is generated by creating the table based on filtered data that is created when the user inputs the parameters. Each row of filtered data is added as a row in the table.

---
### Result:
Unfortunately, due to the size of the database we were not able to deploy on Heroku which has a limit of 10,000 rows. 
However, we are very happy with how the dashboard looks. 

<img src="https://user-images.githubusercontent.com/82348616/133033607-f087b9d7-195d-47bd-a79b-05ad89b60166.PNG" width="700">

<img src="https://user-images.githubusercontent.com/82348616/133033982-8ac64820-ee03-4fcf-ace1-0dc37ecfcfc8.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/133034004-66154aad-3829-479d-979a-292208875612.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/133034032-566b03ae-f87f-4637-8aa2-2c18fc79b31c.PNG" width="700">


![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/82348616/133033289-d8b3f3a2-068b-4803-bb7b-cec3144cfd85.gif)

To view a live version of the dashboard, please clone this repository to your computer and follow the instructions on how to run the app.py file.

Thank you.

---
### Running the app 

To set up the database:
Import the crime_db file into PGAdmin or follow the below steps to step up the database from scratch.

* In PGAdmin create a new database titled __crime_db__ and open a query window
* Navigate to the Database_creation folder
* Open the __Table_schema.sql__ file and copy and paste the code into the query window.
* Run the code to create the table.
* In the Database_creation folder create a new file called __login_info__ that contains your username and password for the PostgreSQL database.
* Open the database_upload.ipynb folder in Jupyter Notebook 
* Run each cell to import the csv’s into the database.
* In PGAdmin run the query “SELECT * FROM crime;
* A total of 319367 lines should be returned.

To run the app.py file please follow the below directions:
* Copy and paste the login_info file created during the database creation to the main folder of the repository (or alternatively create a new file containing your username and password for the PostgreSQL database).
* In terminal navigate to the cloned repository location and activate the PythonData environment.
* Install the chart.js library by running npm install chart.js
* In the terminal type “python app.py” to run the app on a live server.
* Navigate to the server location in the web browser

Example:
<img src=https://user-images.githubusercontent.com/82348616/133034287-9dcbdacd-b616-4c1d-a44b-29020d075787.PNG" width="700">



