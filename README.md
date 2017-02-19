# Opti-tool

### Synopsis
The aim of this project was to create a stand-alone tool which could empower different communities on Brainly sites, to better focus their work. Additionally, every member was given a panel showing their progress and position inside their community.

### Features:
  - List of questions with their answers
  [configured via json-data spreadsheet in _config_ sheet || __underscore.js__]
  - Subjects menu to filter all questions by a specific subject
  [configured via json-data spreadsheet in _subjects_ sheet || __underscore.js__]
  - Questions counters appearing on subjects buttons _on hover_
  - General and weekly rankings based on no. of answers and no. of approvals done on current content
  [calculations done by _ranking_ sheet in json-data spreadsheet || __underscore.js__]
  - Extra info section accessible with the __info__ button
  - User information and progress rendered on separate panels for each user. Apart from basic user info, it also shows achievements, accumulated badges as well as titles. Features single-level and three-level badges
  [configured via json-data spreadsheet in _profile_ sheet || __underscore.js__]

### Optional Features:
  - Secondary content filter based on _user-category_ set by the content specialist upon adding the content
  [configured via json-data spreadsheet in _questions_ sheet || __underscore.js__] -> for more info ask _Rishi Raj_
  - **Deleted content** and **Approved content** buttons under each question.
  [configured via json-data spreadsheet in _approved_ sheet || __underscore.js__ && __blockspring__]

### Technologies used:
  Front-end data rendering is based on AJAX promises, which fetch data from Google Spreadsheets and then render the data with underscore.js. All templates are stored directly in the HTML files, on the bottom of those documents. Optional **delete** and **approve** buttons also feature using blockspring for sending data back over to the json-data spreadsheet and to the _approved_ sheet

### How to switch elements of the tool ON and OFF?
  Every single element which is loaded using an __underscore.js template__ can be easily switched off by removing or commenting out a specific underscore template in **index.html** of a specific version of the tool. You can also alter any of the templates if you need. Eg. you could remove **delete** and **approve** buttons by changing the __question template__.

### Troubleshooting
  1. My tool data doesn't update, what should I do?

  > If your tool loads the questions properly but doesn't update them at all, for example, new answers don't show up, rankings or approvals are not updated and similar, but there is no loading error screen shown, there are two possibilities:
  
  > 1. There is a problem with code.z-dn.net, in which case please contact Artur Siara
  > 2. There can be a problem with Cron script updates, which is mantained by KIT, so consult with him
  
  2. My tool loads ok, but there's a bunch of really weird data showing up in different places, why's that?
  
  > The tool takes data from links pointing to specific sheets in a spreadsheet **in order**, for example:
  
  ```
  https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/1/public/basic?alt=json
  ```
  > Take a look at the last part of it - `1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/1/public/basic?alt=json`. The number in the middle of it, in this case '1', is the number of a sheet in your spreadsheet. In other words, if you change the order of sheets in your spreadsheet, you might end up loading questions info into rankings for example, so make sure, that you don't change the order of your sheets in **json-data**
  
  3. My tool started crashing after I uploaded new questions and I can't make it right again.
  
  > Query which takes the data out from the database accepts only numbers as input, therefore, anything but digits will crash the query and hence - the tool. If you want to check for that, you can use a short formula 
  
  ```
  =IF(ISNUMBER(A2);"I'm a number!";"I'm not a number")
  ```
  ...and paste it next to every number in the second column of the *config* sheet in the **json-data** spreadsheet.
