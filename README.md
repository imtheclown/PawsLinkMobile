# PawsLinkMobile
*note: This mobile application is designed for android only*

# 1. Installation 
1. Clone the application using `git clone https://github.com/imtheclown/PawsLinkMobile.git`
2. Unzip the zip file.
3. Open command prompt and navigate to the folder where you unzipped the repository.
4. Enter `cd PawsLinkMobile` in command prompt.
5. Enter `npm install`
6. Wait for the installation of the dependencies to complete.

# 2. Creating a REALM application
## 2.1 Creating a MongoDB account
*if you already have a mongodb account proceed to 2.2*
If you already have a MongoDB Atlas account, skip to 2.2
1. Go to <https://www.mongodb.com/cloud/atlas/registerhttps://www.mongodb.com/cloud/atlas/register> and register for a new MongoDB Atlas free account
2. After registering, anser the questions prompted by the MongoDB.Your answers in this section does not matter for the next section. Submit answer and proceed to your account.
3. MongoDB will prompt you on your cluster. You can choose to buy their paid services but the free M0 cluster is sufficient
4. Select your provider and press create deployment.
## 2.2 Creating a new REALM application
1. Go to <https://www.mongodb.com> and sign in to your account.
2. In the landing page, select App services in the services tab.
![landing-page](/images/mongo_landing.png)
3. Select real time sync and press next.
![select-project-type](/images/select_project_type.png)
4. Press close.
![close](/images/create_template.png)
5. Copy application id.
![application-id](/images/application_id.png)
6. Inside the PawsLinkMobile folder, navigate to the src folder.
7. Inside the src folder, navigate to database folder.
8. Open the RealmConfig.jsx file.
9. Replace the value of APP_ID with the value you just copied.
![replace-id](/images/edit_app_id.png)
# 3. Get the ip address of the api server
*note: the mobile device is reliant with the api in terms of writing and reading data from the cloud database. It is required to run the server together with the application for this to work*
## 3.1 Run the Server
If you already have the PawsLink API proceed to 3.2
1. Open the command prompt in the desired folder to install the server.
2. Type `git clone https://github.com/imtheclown/PawsLink_API.git` and press enter.
3. Follow the instructions in the readme file and start the server.
## 3.2 Connecting the mobile application and the server.
1. Make sure that the server and the device where the mobile application is installed is connected in the same wifi network.
2. In the device where the server is running, type ipconfig (assuming the device is windows, otherwise find way to get the IPV4 address of the device);
3. Under the wireless LAN adapter Wi-FI, copy the IPv4 Address.
![ip-add](/images//ip_add.png)
4. Return to the PawsLinkMobile root folder and navigate to `src/utils/networkConf.js`.
5. Paste the copied ipv4 address as the value of the localMachineIpAddress variable.
![local-ipv4](/images/change_ipv4.png)
# 4. Running the Application
*Note: before running the application, make sure that there is a device connected to the machine (emulator or physical device). You can check this by typing adb devices in your command prompt. This will show you the list of devices where the application can be installed*

*If there is no available device, install android studio and create a new emulator*

*android studio step-by-step installation by developer.android.com: <https://developer.android.com/studio/install>*

*installation of android emulator by developer.android.com: <https://developer.android.com/studio/run/emulator>*
1. Open command prompt and navigate to the root directory of PawsLinkMobile.
2. Type `npm run android` and press enter.


