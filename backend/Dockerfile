FROM golang:alpine
WORKDIR /backend

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o /bright-assessment

EXPOSE 8080

CMD [ "/bright-assessment" ]
