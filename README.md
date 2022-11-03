# Web GUI for Zoom REST API
## Setup
Clone this repository
```git clone https://github.com/Wrightlab1/zoomapigui.git```
Create a Server to Server Oauth app in the Zoom marketplace and add the appropriate scopes
In the backend folder cretae a ```.env``` file with the following 
```
s2s_account_id = ""
s2s_key = ""
s2s_secret = ""
```
Open your terminal and navigate to the backend folder and run
```npm run start```
This will start the backend server

Open the index.html file from the frontend folder in your web browser

## usage
Place the intended URL for example ```/users``` in the url field
if necessary add and query strings
Add and data required for the request body in the body field. Data should be valid JSON
Select the RESTful action from the drop down list
Click send
