docker build . -f ..\..\..\Dockerfile.Release -t 192.168.2.100:5000/webapps-homeautomationdashboard:dev

docker push 192.168.2.100:5000/webapps-homeautomationdashboard:dev

docker image rm 192.168.2.100:5000/webapps-homeautomationdashboard:dev
