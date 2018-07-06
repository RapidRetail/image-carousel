# What image do you want to start building on?
FROM node:8.9.4

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you what to copy, and where to put it?
COPY . /src/app

# Add cassandra EC2 instance IP
ENV DBIP defaultValue

# Does your app have any dependencies that should be installed?
RUN npm install --production

# What port will the container talk to the outside world with once created?
EXPOSE 3004

# How do you start your app?
CMD DBIP=${DBIP} npm start