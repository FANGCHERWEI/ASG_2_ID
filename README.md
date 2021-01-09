# iTrack

iTrack is a money tracker and helps users manage their spending. Users can track and categorise their expenses and income, and view an analysis of their spending through intuitive charts. iTrack makes use of an api called the firebase. The firebase is an api that allows users to have the ability to sync, store and edit data in realtime. Using the "Spark plan"
in Google's firebase, I was able to use the firebase api for free but was limited to quotas for Database, Firestore, storage, Functions, Phone, Auth, Hosting and Test Lab. On the home page of iTrack, you are given the option to Login or SignUP. If you scroll down, you can see a short summary on what iTrack is. A simple and easy to use app that tracks all your expenses and income. Analyses your spending in intuitive charts and graphs!

Now, I can start breaking down how iTrack works. Firstly, after signing up and logging into iTrack, you are presented with the home page which is essentially the "Spending" page.
This page shows you 8 categories. These categories are, Food, Transport, Bills, Home, Entertainment, Salary, Sales and Gift. These 8 categories basically sum up what most of use interact with these days when it comes to money. So how the website works is that you can click the bottom right of the screen on "NEW SPENDING", and it will bring up this pop up sign which provides you with various blanks to fill in. The first blank to fil in is the Date, which is in the format DD-MM-YYYY (Day,Months,Years). The second blank is the Amount, this blank is for you to fill up how much money you have used or received and only integers are allowed to be input. The third blank is the Category, the following categories will be listed in the order of gift, salary, transport, home,  bills, sales, entertainment and food. Depending on what you used your money on, you can select the appropriate category. Lastly, There is a Note blank, this blank is for you to give a name or a description of what you have spent the money on so you can go back and check on your spendings. After adding whatever you have done for the month, you can edit your spendings as you like. After using the website for a while, you can start to use the website more efficiently by using the "Analytics" page. The Analytics page helps break down your spendings for you and shows you how much you have spent overall. It firstly starts off with your income, then your expenses, and finally subtracts your expenses from your income and shows your balance on whether you have either increased in money or decreased. The goal is to always be at a postive balance and try to increase that amount so you can increase your saving rate. At the bottom of the Analytics page, you can see pie charts that displays your expenses and income, and on the right the total expenses and income. You can also navigate to which month you want to see your spendings on. Lastly, The profile page, here you can just change your name, I have yet to add a change password option yet though. This is iTrack!
 
## Design Process

Target Audience:
- Individuals and families who want to manage their daily spending efficiently

Design process:
- I wanted to let users be able to track their spending, as well as gain insights from their spendings, hence the two main functions of the app are tracking and analysis. 
- Local storage is used to store auth and spending information across pages. These data are also stored in a web database for persistent storage of information, so that users don't have to keep redoing their spendings each time they log in. 
- Based on research, spendings can fall under two main categories, income and expense, where income is money inflow while expense is money outflow.
- iTrack allows users to track and analyse their income and expenses. Users can enter their spending information in the spendings page to see all their individual spendings. Each spending can be categoried under an income or expense category. Then users can proceed to analyse their spendings in the analytics page, which provides them a breakdown of their monthly income and expense, and their overall balance according to the spendings they have entered.

User stories: 
- As a student, I want to track my expenses, so that I can keep track of how much money I have spent.
- As a working individual, I want to track my income, so that I can keep track of how much money I have earned.
- As someone who wants to save money, I want to analyse my spendings so I know where to save up on.
- As an analytic user, I want to analyse my spendings so I can plan my budget.
- As a sole breadwinner, I want to analyse my spendings so I can analyse whether my household income is enough.

XD: located in the folder xd/

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Authentication - allows users to have an account to use iTrack's features, by signing up/ logging in at the signup/ login page
- Track spending - allows users to track their spendings, by creating a spending or editing the category/ amount/ date/ note of a spending or deleting a spending
- Spending statistics - allows users to view their balance, total expenses and total income, by going to the analytics page
- Spending analysis - allows users to view their monthly spending breakdown for income and expenses, by going to the analytics page
- Profile update - allows users to update their name, by going to the profile page

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Show yearly breakdown of spendings
- Addition of customisable categories
- Line graph to show how spending changed through time
- Sharing of charts on social media

## Technologies Used

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Bootstrap](https://getbootstrap.com/)
    - The project uses **Bootstrap** to style html elements easily.

- [Chartjs](https://www.chartjs.org/)
    - The project uses **Chartjs** to display chart data for analytics.

- [Firebase](https://firebase.google.com/)
    - The project uses **Firebase** to store data in database and enable authentication.

- [Google Fonts](https://fonts.googleapis.com)
    - The project uses **Google Fonts** to use fonts and icons from google.

## Testing

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Credits 
- unsplash.com
- vectorstock.com

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from 
    - unsplash.com
    - vectorstock.com

### Acknowledgements

- I received inspiration for this project from [MoneyLover](https://moneylover.me/), [Spendee](https://www.spendee.com/).