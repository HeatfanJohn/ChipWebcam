CHIP Webcam 
===========
 

# Author

This project has been developed by [John P. Masseria](http://github.com/HeatfanJohn "John P. Masseria").
 
 
# Screenshot
![CHIP Webcam](https://raw.githubusercontent.com/heatfanjohn/ChipWebcam/master/chip-webcam.png "CHIP Webcam")

# How to install

**Install software**
~~~ 
sudo apt-get update 
sudo apt-get upgrade
sudo apt-get install nodejs npm git
git clone https://github.com/HeatfanJohn/ChipWebcam.git
~~~
**Install web pages/modules**
~~~
sudo mkdir -p /var/www/html/chip    # create your web folder for the application, could be anywhere
sudo chown chip.chip /var/www/html/chip/
cd ChipWebcam			# your Git folder
shopt -s extglob		# enable name exclusion
cp !(*git*) /var/www/html/chip/	# copy non-Git files from Git folder to web folder

# Install required node modules into working directory

cd /var/www/html/chip
npm install semaphore
npm install uuid
~~~
**Run**
~~~
cd /var/www/html/chip
DEBUG=-* nodejs webcam.js	# run without debugging
~~~
**Result**

Open a browser with your CHIP's IP on port 8080. For example: [http://192.168.1.100:8080](http://192.168.1.100:8080)

**Run as a service (optional)**

~~~
nano /var/www/html/chip/ChipWebcam.service	# edit ExecStart & WorkingDirectory with your path
sudo mv /var/www/html/chip/ChipWebcam.service /etc/systemd/system/	# move to services folder
sudo systemctl daemon-reload		
sudo systemctl start ChipWebcam.service
sudo systemctl status ChipWebcam.service	# confirm service is running
~~~

# License
~~~~~~
Copyright 2016 John P. Masseria

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
~~~~~~~

# More info

For more details, please visit: [Masseria.org](http://Masseria.org)
