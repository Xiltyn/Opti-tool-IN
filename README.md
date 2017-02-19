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
  
  ##### When it's neither Cron's, nor the Code.z-dn.net's fault something's wrong
  In case you are positive that it's neither Cron, nor the Code.z, that's creating a problem, you need to take a look at the **javascripts** behind the it. If you don't feel confident enough to do it, please ask a person from the **Front-End Team** to help you out. A person who helped building the tool was Mateusz Zimowski, so he should be a good person to start with. 
  
  ### Json-Data spreadsheet's structure
  Json-Data spreadsheet contains all the data used by the Opti-Tool. Furthermore, many of the initial data manipulation and calculations are done there as well. Every Json-Data spreadsheet should have the following sheets: 
  
  - **Questions** (contains all information about questions, their subjects, school levels, answers, approvals and whether they should be removed from the list or not)
  - **Ranking** (calculates and stores information ranking records for both answers and approvals done by specified users) 
  - **Subjects** (defines subjects used for subjects filter)
  - **Profiles** (specifies user profile information for users in ranking, it should contain the same list of users as ranking)
  - **General** badges (describes _general_, three-leveled achievements as well as their IDs, descriptions and requirements rendered in the front-end)
  - **Special** badges (describes _special_, single-level achievements as well as their IDs, descriptions and requirements rendered in the front-end)
  
  ### Folders structure
  ```
  |-- ROOT
    |-- .DS_Store
    |-- .gitignore
    |-- README.md
    |-- gulpfile.js
    |-- live.js
    |-- npm-shrinkwrap.json
    |-- package.json
    |-- server.js
    |-- yarn.lock
    |-- BR
    |   |-- config.js
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 04.png
    |                   |-- 05.png
    |                   |-- 06.png
    |                   |-- 07.png
    |                   |-- 08.png
    |                   |-- 09.png
    |                   |-- 10.png
    |                   |-- 11.png
    |                   |-- 12.png
    |                   |-- 13.png
    |                   |-- 14.png
    |                   |-- 15.png
    |                   |-- 16.png
    |                   |-- 17.png
    |                   |-- 18.png
    |-- ID
    |   |-- config.js
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 0_01.png
    |                   |-- 0_02.png
    |                   |-- 1_01.png
    |                   |-- 1_02.png
    |                   |-- 1_03.png
    |                   |-- 2_01.png
    |                   |-- 2_02.png
    |                   |-- 2_03.png
    |                   |-- 2_04.png
    |                   |-- 3_01.png
    |                   |-- 3_02.png
    |                   |-- 3_03.png
    |                   |-- 3_04.png
    |-- IN
    |   |-- config.js
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet-peach.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 011.png
    |                   |-- 012.png
    |                   |-- 013.png
    |                   |-- 021.png
    |                   |-- 022.png
    |                   |-- 023.png
    |                   |-- 031.png
    |                   |-- 032.png
    |                   |-- 033.png
    |                   |-- 04.png
    |-- IN2
    |   |-- .DS_Store
    |   |-- config.js
    |   |-- functions.js
    |   |-- index.html
    |   |-- script.js
    |   |-- validation.js
    |   |-- css
    |       |-- .DS_Store
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 011.png
    |                   |-- 012.png
    |                   |-- 013.png
    |                   |-- 021.png
    |                   |-- 022.png
    |                   |-- 023.png
    |                   |-- 031.png
    |                   |-- 032.png
    |                   |-- 033.png
    |                   |-- 04.png
    |-- PL
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 001.png
    |                   |-- 002.png
    |                   |-- 003.png
    |                   |-- 004.png
    |                   |-- 005.png
    |                   |-- 006.png
    |                   |-- 007.png
    |                   |-- 008.png
    |                   |-- 009.png
    |                   |-- 010.png
    |                   |-- 011.png
    |                   |-- 012.png
    |                   |-- 013.png
    |                   |-- 021.png
    |                   |-- 022.png
    |                   |-- 023.png
    |                   |-- 031.png
    |                   |-- 032.png
    |                   |-- 033.png
    |                   |-- 04.png
    |-- RU
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 011.png
    |                   |-- 012.png
    |                   |-- 013.png
    |                   |-- 021.png
    |                   |-- 022.png
    |                   |-- 023.png
    |                   |-- 031.png
    |                   |-- 032.png
    |                   |-- 033.png
    |                   |-- 04.png
    |-- TR
    |   |-- config.js
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 04.png
    |                   |-- 05.png
    |                   |-- 06.png
    |                   |-- 07.png
    |                   |-- 08.png
    |                   |-- 09.png
    |                   |-- 10.png
    |                   |-- 11.png
    |                   |-- 12.png
    |                   |-- 13.png
    |                   |-- 14.png
    |                   |-- 15.png
    |                   |-- 16.png
    |                   |-- 17.png
    |                   |-- 18.png
    |-- TR2
    |   |-- config.js
    |   |-- index.html
    |   |-- css
    |       |-- animate.css
    |       |-- style.css
    |       |-- assets
    |           |-- img
    |               |-- arrow-blue.png
    |               |-- arrow-lavender.png
    |               |-- arrow-mint.png
    |               |-- arrow-mustard.png
    |               |-- arrow-peach.png
    |               |-- avatar.png
    |               |-- background.jpg
    |               |-- bullet-lavender.gif
    |               |-- bullet-mustard.gif
    |               |-- bullet.gif
    |               |-- cross.png
    |               |-- error-background.png
    |               |-- info_active.png
    |               |-- info_hover.png
    |               |-- info_normal.png
    |               |-- ranking_active.png
    |               |-- ranking_hover.png
    |               |-- ranking_normal.png
    |               |-- subjects_active.png
    |               |-- subjects_hover.png
    |               |-- subjects_normal.png
    |               |-- tick.png
    |               |-- badges
    |                   |-- 04.png
    |                   |-- 05.png
    |                   |-- 06.png
    |                   |-- 07.png
    |                   |-- 08.png
    |                   |-- 09.png
    |                   |-- 10.png
    |                   |-- 11.png
    |                   |-- 12.png
    |                   |-- 13.png
    |                   |-- 14.png
    |                   |-- 15.png
    |                   |-- 16.png
    |                   |-- 17.png
    |                   |-- 18.png
    |-- config
    |   |-- config_pl.js
    |   |-- config_ru_archive.js
    |   |-- config_ru_solvers.js
    |   |-- functions.js
    |   |-- script-new.js
    |-- css
    |   |-- .DS_Store
    |   |-- animate.css
    |   |-- style.css
    |   |-- assets
    |       |-- .DS_Store
    |       |-- img
    |           |-- arrow-blue.png
    |           |-- arrow-lavender.png
    |           |-- arrow-mint.png
    |           |-- arrow-mustard.png
    |           |-- arrow-peach.png
    |           |-- avatar.png
    |           |-- background.jpg
    |           |-- bullet-lavender.gif
    |           |-- bullet-mustard.gif
    |           |-- bullet.gif
    |           |-- cross.png
    |           |-- error-background.png
    |           |-- info_active.png
    |           |-- info_hover.png
    |           |-- info_normal.png
    |           |-- ranking_active.png
    |           |-- ranking_hover.png
    |           |-- ranking_normal.png
    |           |-- subjects_active.png
    |           |-- subjects_hover.png
    |           |-- subjects_normal.png
    |           |-- tick.png
    |           |-- badges
    |               |-- 001.png
    |               |-- 002.png
    |               |-- 003.png
    |               |-- 004.png
    |               |-- 005.png
    |               |-- 006.png
    |               |-- 007.png
    |               |-- 008.png
    |               |-- 009.png
    |               |-- 010.png
    |               |-- 011.png
    |               |-- 012.png
    |               |-- 013.png
    |               |-- 021.png
    |               |-- 022.png
    |               |-- 023.png
    |               |-- 031.png
    |               |-- 032.png
    |               |-- 033.png
    |               |-- 04.png
    |-- sass
        |-- _error.scss
        |-- _operational.scss
        |-- _preloader-animation.scss
        |-- _rwd.scss
        |-- _validation.scss
        |-- style.scss
  ```
