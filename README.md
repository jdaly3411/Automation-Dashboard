# 🏠 Home-Automation-Dashboard

---

## 🌟 Features

### 🚀 Implemented Features
- **⚡ Next.js Framework**: Utilizes Next.js for server-side rendering and static site generation.
- **🧭 Modern App Routing**: Uses the App Router feature for streamlined navigation and route management.
- **⚛️ React Integration**: Fully integrated with React for building dynamic and responsive user interfaces.
- **🎨 Styling Support**: Includes CSS and Tailwind support for styling components effectively.
- **🔗 API Routes**: Backend APIs are managed directly within the Next.js project along with Django for the routes and database model for seamless full-stack development.
- **💻 Remote PC Control**: Backend routes enable the user to remotely control actions on the computer from the website.
- **📊 Dynamic Device Monitoring**: Display real-time data from sensors and connected devices.
- **🌓 Theming**: Dark and Light mode themes for user preference.
- **📝 User Inputs**: User can enter their local IP and MAC ADDRESS to be used in requests.
- **📱 Mobile Support**: Users can enter their local ip along with the port on their mobile device, or any device on their local network and visit the website and use commands!

---

### 🚧 Features To Be Implemented
- **🏠 Home Automation Dashboard**:
  - Arduino Control
  - Next/Back buttons
  - Volume Control
- **🔒 Authentication**:
  - Implement secure login/logout functionality for users.
- **📱 Mobile Optimization**:
  - Ensure the application is fully responsive on mobile devices.
---

## 🛠️ Requirements
- **🔌 Arduino**
- **🌡️ DHT11 Temperature and Humidity Sensor**
- **📟 Arduino IDE**
- **🐍 Python version 3+**

---

## 📚 Setup Instructions

### ⚙️ Arduino:
1. **Upload Files**  
   Upload the `"sketch_dec9a.ino"` file to your Arduino.

### 💻 Backend (Server):
2. **Navigate to the 'server' directory**:
   ```bash
   python -m venv env
   env\Scripts\activate
   pip install -r requirements.txt
   cd server\server\AutomationDashboard

   python manage.py runserver 0.0.0.0:8000
3. Activate your virtual environment and run `serial_reader.py`
   ```bash
   env\Scripts\activate
   cd server\server\AutomationDashboard\AD
   python serial_reader.py
4. Update `settings.py`
   in the `"AutomationDashboard"` folder, navigate to `"settings.py"` and replace "192.168.4.22" with your local IP.
### 🌐 Frontend (Client):
5. Navigate to the client directory:
   ```bash
   cd client
   npm install
   npm run dev
6. Update Local Values:
- Go to the settings page on the website and change localip and mac address to your own
  👉 ![How do I get my local IP?](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address/)

  

--- 
# 🖼️ Preview

![image](https://github.com/user-attachments/assets/adfe9ea0-169a-42cf-b85f-a6b8f9d37fac)
![image](https://github.com/user-attachments/assets/b49fa16f-504c-42e6-bd4f-4413d48af27b)

---
# 🙏 Conclusion
Thank you for exploring the *Home Automation Dashboard**! Working on this project has been a real development in my personal skills along with being extremely rewarding.
Feel free to reach out or contribute to the project!
