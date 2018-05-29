# Rafael Bertelli - Fullstack Developer (Crossover)

Before running the application, you need to have the follow items:

- Node.js -- it was used version 6x
- MySQL -- was used version 5.7.20
- Set MySQL root password to "gogo"
- Import SQL's initial scripts. There are 4 sql scripts under project's `script/dump` folder, please import them.
- Make sure that scripts were imported correctly, to do that check if was created a `techtrial` database with four tables (auctions, inventories, items and users). All of them should be empty unless table items which has 3 records, bread, carrot and diamond.

# Assumptions

- It was not mentioned the scenario where there is no bid for a auction, so due to this, I've included a check where if no bid has been entered, auction will be cancelled and a feedback message will be printed to users.

# Requirements not covered

- Bonus item 5 -- it was used bootstrap instead
- Bonus item 6

# Steps to run the app:

1. Unzip .zip file anywhere
2. Open the CLI, go to the folder containing the unzip files
3. `cd code`
4. `npm install` -- to install node dependencies
5. `bower install` -- to install bower dependencies
6. `npm install` -- to run the application
7. `npm test` -- to run the tests -- make sure you have mocha installed globally (`npm install mocha -g`)

# What was done?

In order to create a real time multiplayer game, it were choosen latest version of Angular.js, Node.js 6.x, Express and Socket.io. The application goal is serve a Single Page Application which gives the user the ability of open or create auction where they can create a new auction and include their items and also participate in auction that is going on.

Technologies used:

- Angular.js 1.6.x
- Node.js 6.x
- Express
- Socket.io
- Sequelize.js
- Bootstrap
- Mocha and chai for unit tests

# My Contacts

Skype: rafael.p.bertelli@gmail.com
Email: rafael.p.bertelli@gmail.com
Phone: +55 (17) 997618886