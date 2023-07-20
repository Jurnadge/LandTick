# Use the official Go image as the base image
FROM golang:1.15

# Set the working directory in the container
WORKDIR /server

# Copy the application files into the working directory
COPY . /server

# Build the application
RUN go get github.com/labstack/echo/v4
RUN go get -u github.com/midtrans/midtrans-go
RUN go get -u gorm.io/gorm
RUN go get github.com/go-playground/validator/v10
RUN go get -u gorm.io/gorm
RUN go get golang.org/x/crypto/bcrypt
RUN go get -u github.com/golang-jwt/jwt/v5
RUN go build -v .

# Expose port 8080
EXPOSE 8080

# Define the entry point for the container
CMD ["./"]