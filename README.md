# Home-Automation-Dashboard

---
## Features

### Implemented Features
- **Next.js Framework**: Utilizes Next.js for server-side rendering and static site generation.
- **Modern App Routing**: Uses the App Router feature for streamlined navigation and route management.
- **React Integration**: Fully integrated with React for building dynamic and responsive user interfaces.
- **Styling Support**: Includes CSS and Tailwind support for styling components effectively.
- **API Routes**: Backend APIs are managed directly within the Next.js project along with Django for the routes and database model for seamless full-stack development.
- **Remote PC control**: Backend routes enable the user to remotely control actions on the computer from the website
- **Dynamic Device Monitoring**: Display real-time data from sensors and connected devices.
- **Theming**: Dark and Light mode themes for user preference.


---
## Requirements
- **Arduino**
- **DHT11 Temperature and Humidity sensor**
- **Arduino IDE**
- 
  

### Features To Be Implemented
- **Home Automation Dashboard**:
  - Arduino Control
  - Next/Back buttons
  - Volume Control
- **Authentication**:
  - Implement secure login/logout functionality for users.
- **Mobile Optimization**:
  - Ensure the application is fully responsive on mobile devices.
- **User inputs**:
  - User inputs for Local IP and Mac address



---
## Setup Instructions
### Arduino:
1. Upload files
   Upload the "sketch_dec9a.ino" file to your Arduino.
### Backend (Server):
2. Navigate to the 'server' directory:
   ```cmd
   cd server

   python -m venv env
   env\Scripts\activate
   pip install -r requirements.txt

   python manage.py runserver 0.0.0.0:8000
3. Activate your virtual environment and run serial_reader.py:
   ```cmd
   env\Scripts\activate

   cd server\server\AutomationDashboard\AD
   python serial_reader.py

### Front end (Client)
4. Navigate to the 'client' directory
   ```cmd
   cd client
   npm install
   npm run dev
5. Change local values
   - Go to the settings page on the website and change localip and mac address to your own
   ![How do I get my local IP?](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address/)
