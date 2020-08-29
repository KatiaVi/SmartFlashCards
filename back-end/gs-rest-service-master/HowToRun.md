## How to run the server
In terminal go into the gs-rest-service-master/initial/ folder then run:
./mvnw spring-boot:run

Server should be running

## How to build JAR and then run it
In terminal go into the gs-rest-service-master/initial/ folder then build: 
./mvnw clean package
Then run:
java -jar target/gs-rest-service-0.1.0.jar

## How to login to MySQL DB
mysql -u root -p -h 127.0.0.1 -P 3306

