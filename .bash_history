sudo apt update
vi master_node.sh
chmod +X master_node.sh 
sh master_node.sh 
chmod +x master_node.sh
sudo ./master_node.sh
kubectl get nods
kubectl get nodes
mkdir -p ~/.kube
sudo cp /etc/kubernetes/admin.conf ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
kubectl get nodes
kubectl get nods
kubectl get nodes
kubectl get all -a
kubectl get all
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-4
chmod 700 get_helm.sh
./get_helm.sh
ls
helm --version
helm --Version
helm --version
sudo apt-get update
helm -V
helm --V
helm --Version
helm --version
helm version
helm create collage_web_V1
helm list -a
ls
cd collage_web_V1/
helm list -a
helm list 
cd ..
cd collage_web_V1/
ls
cd ..
mv collage_web_V1 collage
ls
helm install collage_web_v1 collage
helm install collage-web-v1 collage
clear4
clear
helm install collage-web-v1 collage
helm list -A
helm status collage-web-v1
kubectl get pods -n default
kubectl port-forward svc/collage-web-v1 8080:80
kubectl get svc
clear
helm status collage-web-v1
helm get manifest collage-web-v1
helm lint collage
helm uninstall collage-web-v1
ls
cd collage/
ls
cd ..
rm -f collage/
rm -r -f collage/
ls
helm create collage
ls
helm install collage-web-v1 collage
helm list -A
kubectl get pods
kubectl get svc
kubectl get -all
kubectl get all
kubectl get nodes
kubectl get nodes --show-labels
kubectl taint nodes ip-172-31-29-124 for=database:NoSchedule
kubectl get nodes --show-labels
kubectl get nodes --show-labels | grep "databases"
kubectl label nodes ip-172-31-29-124 role=database
kubectl get nodes --show-labels
git version
git clone https://github.com/PrajwalAIDevops/Collage-website-prajwaltechgo.git
ls
cd Collage-website-prajwaltechgo/
ls
docker compose up
cat docker-compose.yml 
mv docker-compose.yml compose.yml
ls
docker compose -d up
docker compose up 0d
docker compose up -d
sudo apt-get update
sudo apt-get install docker-compose-plugin
docker compose up -d
docker-compose --version
# 1. Create the Docker plugins directory if it doesn't exist
mkdir -p ~/.docker/cli-plugins/
# 2. Download the latest stable Docker Compose binary directly from GitHub
curl -SL https://github.com -o ~/.docker/cli-plugins/docker-compose
# 3. Give the binary execution permissions
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version
docker compose up -d
curl -SL https://github.com -o ~/.docker/cli-plugins/docker-compose
# 1. Download the REAL executable binary from the official releases path
sudo curl -SL https://github.com -o /usr/local/bin/docker-compose
# 2. Grant executable system permissions 
sudo chmod +x /usr/local/bin/docker-compose
# 3. Double check that the path environment maps correctly
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
docker-compose up -d
# 1. Download the actual binary file
sudo curl -SL https://github.com -o /usr/local/bin/docker-compose
# 2. Fix the permissions
sudo chmod +x /usr/local/bin/docker-compose
# 3. Refresh the link
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
sudo rm -f /usr/local/bin/docker-compose
docker compose version
docker compose up -d
docker-compose up -d
sudo apt update
sudo apt install -y docker-compose-plugin
docker compose version
ls
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v5.5.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
docker compose version
docker compose up -d
docker --version
which docker
uname -m
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg   -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-compose-plugin
docker compose version
docker compose up -d
clear
docker --version
docker info | head
cat /etc/os-release
ls -la /usr/local/lib/docker/cli-plugins/
ls -la /usr/libexec/docker/cli-plugins/ /usr/lib/docker/cli-plugins/ 2>/dev/null
apt-cache search docker-compose
rm -f ~/.docker/cli-plugins/docker-compose
sudo rm -f /usr/local/lib/docker/cli-plugins/docker-compose
sudo apt update
sudo apt install --reinstall -y docker-compose-plugin
docker compose version
docker compose up -d
ls
cd collage/
ls
docker version
sudo apt install docker.io -y
docker version
chmod -aG docker $USER
usermod -aG docker $USER
sudo usermod -aG docker $USER
newgrp docker
docker ps
host -I
hostname -I
docker ps
docker logs bdd129cde991
docker inspect bdd129cde991
hostname -i
hostname -I
docker ps
docker logs 97d1ebabfc51
clean
clear
kubectl get pods --show labels
kubectl get pods --shoew labels
kubectl get pods --showe labels
kubectl get pods --show labels
kubectl get pods 
kubectl get node --show labels
kubectl get nodes --show labels
kubectl get nodes --show-labels
kubectl taint node ip-172-31-29-124 dedicated=mysql:NoSchedule
kubectl get nodes --show-labels
kubectl describe ip-172-31-29-124  | grep -i "taint"
kubectl describe ip-172-31-29-124 | grep -i "taint"
kubectl describe node ip-172-31-29-124 | grep -i "taint"
kubectl describe node ip-172-31-29-124 | grep -i taint
kubectl describe node ip-172-31-29-124 | grep -i labels
kubectl describe node ip-172-31-29-124 | grep -i database
kubectl get pods
kubectl get node
kubectl get nodes --show-labels
kubectl get node
kubectl labels node ip-172-31-27-55 role=backend
kubectl label node ip-172-31-27-55 role=backend
kubectl taint node ip-172-31-27-55 dedicated=backend:NoScehdule
kubectl taint node ip-172-31-27-55 dedicated=backend:NoSchedule
kubectl describe ip-172-31-27-55 | grep -i taint
kubectl describe node ip-172-31-27-55 | grep -i taint
kubectl describe node ip-172-31-27-55 | grep -i labels
kubectl describe node ip-172-31-27-55 | grep -i backend
kubectl taint node ip-172-31-23-90 dedicated=frontend:NoSchedulr
kubectl taint node ip-172-31-23-90 dedicated=frontend:NoSchedule
kubectl lables node ip-172-31-23-90 role=frontend
kubectl lable node ip-172-31-23-90 role=frontend
kubectl label node ip-172-31-23-90 role=frontend
clear
ls
cd collage/
ls
cd charts/
ls
cd ..
cd templates/
ls
vi deployment.yaml 
ls
cd collage/
ls
cd templates/
ls
vi deployment.yaml 
cat deployment.yaml 
ls
cd collage/
ls
mv Collage-website-prajwaltechgo/ ../
ls
cd ..
ls
cd collage/
ls
cd templates/
ls
cp deployment.yaml frontend-deployment.yml
ls
cp deployment.yaml backend-deployment.yml
mv deployment.yaml mysql-deployment.yaml 
ls
ls -ltr | grep *-deployment.yml
ls -ltr | grep -i *-deployment.yml
ls -ltr | grep "*-deployment.yml'
ls -ltr | grep "*-deployment.yml"
ls
ls -ltr | grep "-deployment.yml"
ls -ltr | grep -- "-deployment.yml"
ls
mv mysql-deployment.yaml mysql-deployment.yml 
ls -ltr | grep -- "-deployment.yml"
docker ps
vi frontend-deployment.yml 
