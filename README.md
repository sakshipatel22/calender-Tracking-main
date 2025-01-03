Calendar Tracking Application

This project is a React app that helps you keep track of company communications. It uses Tailwind CSS for styling and FullCalendar to show important dates on a calendar.


---

Features

1. Admin Panel

Add, edit, or remove Companies (e.g., name, location, emails, phone numbers, etc.)

Add or remove different Communication Methods (like email, phone call, etc.)



2. User Dashboard

Shows a list of companies

Highlights overdue (red) or due-today (yellow) communications

Lets you log new communications



3. Calendar Page

Displays both past and upcoming communications on an interactive calendar (powered by FullCalendar).





---

Technologies Used

React (JavaScript framework)

React Router (for page navigation)

Tailwind CSS (for design and layout)

FullCalendar (to display a schedule/calendar)



---

Getting Started

1. Clone or Download the Project

If you have Git installed, open your terminal and type:

git clone - https://github.com/sakshipatel22/calender-Tracking-main
Or download the ZIP file from GitHub and extract it to a folder on your computer.


2. Install Dependencies

Make sure you have Node.js installed. Then, in the project folder, run:

npm install

This command installs all the required libraries.

3. Start the App

After everything is installed, start the development server by typing:

npm start

Your browser should open at http://localhost:3000 automatically.

If it doesn’t, just open that link in your browser yourself.

Usage

1. Admin Panel

Visit http://localhost:3000/admin (or click the “Admin Panel” link in the navigation).

Add a new company by filling out the form and clicking Add Company.

Add or modify communication methods (like "Email", "Phone Call", etc.).



2. User Dashboard

Go to http://localhost:3000/ (the home page) to see all companies.

Overdue or due-today tasks are highlighted in different colors (red or yellow).

You can check the boxes next to one or more companies and click Log New Communication.

Fill out the pop-up form with the communication details (type, date, notes) and click Submit.



3. Calendar View

Click the Calendar link in the navigation or visit http://localhost:3000/calendar.

You’ll see a FullCalendar component that shows events.

You can click or select a date range (depending on the configuration) to add new events.

You can also click on existing events to remove them (in this example app).





---

File Structure (Important Folders and Files)

/src/App.js
Defines the main navigation and routes (home, admin, calendar).

/src/Modules/Admin.js
The Admin panel logic and forms to handle companies & communication methods.

/src/Modules/User.js
The User dashboard showing overdue/due tasks, plus the communication logging modal.

/src/Modules/CalendarPage.js
Displays the FullCalendar component, where you can see scheduled events and add/remove them.

/src/index.js
Renders the main React app and wraps it in the BrowserRouter.

/src/index.css
Tailwind CSS imports (this is where we include @tailwind base, @tailwind components, @tailwind utilities).



---

Customizing Styles

We use Tailwind CSS for styling:

If you want to change colors or spacing, open tailwind.config.js and adjust the theme.

You can also customize classes directly in the components, e.g., className="bg-indigo-600" or className="text-gray-700".



---

Troubleshooting

1. FullCalendar Not Found

Make sure you installed it by running:

npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction

Then restart your development server.



2. Tailwind CSS Not Working

Verify your tailwind.config.js has the correct content path:

content: [
  "./src//*.{js,jsx,ts,tsx}"
],

Check postcss.config.js for the required plugins.



3. Router Errors

Ensure you have only one <BrowserRouter> in index.js.

Inside other components, you should only use <Routes> and <Route>, not another <BrowserRouter>.





---

Contributing

Fork or clone the repository

Create a feature branch

Commit your changes

Open a pull request



---

Contact

If you have questions or need help, feel free to open an issue in the repository or reach out to the project maintainer.



---

Happy coding! If this project helps you, feel free to share it with others or contribute any improvements.
