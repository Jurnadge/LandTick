package handlers

import (
	"fmt"
	dto "landtick/dto/result"
	ticketdto "landtick/dto/ticket"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository repositories.TicketRepository
}

func HandlersTicket(TicketRepository repositories.TicketRepository) *handlerTicket {
	return &handlerTicket{TicketRepository}
}

// CreateTicket
func (h *handlerTicket) CreateTicket(c echo.Context) error {
	startStationId, _ := strconv.Atoi(c.FormValue("start_station_id"))
	destinationStationId, _ := strconv.Atoi(c.FormValue("destination_station_id"))

	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("qty"))

	request := models.Ticket{
		NameTrain:            c.FormValue("name_train"),
		TypeTrain:            c.FormValue("type_train"),
		StartStationID:       startStationId,
		DestinationStationID: destinationStationId,
		StartDate:            c.FormValue("start_date"),
		StartTime:            c.FormValue("start_time"),
		ArivalTime:           c.FormValue("arival_time"),
		Price:                price,
		Qty:                  stock,
	}
	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data := models.Ticket{
		NameTrain:            request.NameTrain,
		TypeTrain:            request.TypeTrain,
		StartDate:            request.StartDate,
		StartStationID:       request.StartStationID,
		StartTime:            request.StartTime,
		DestinationStationID: request.DestinationStationID,
		ArivalTime:           request.ArivalTime,
		Price:                request.Price,
		Qty:                  request.Qty,
	}

	response, err := h.TicketRepository.CreateTicket(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: convertResponseTicket(response)})
}

// FindTicket
func (h *handlerTicket) FindTicket(c echo.Context) error {
	tickets, err := h.TicketRepository.FindTicket()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: tickets})
}

// FilterTicket
func (h *handlerTicket) FilterTicket(c echo.Context) error {
	// date := c.QueryParam("start_date")
	startStationIDParam := c.QueryParam("start_station_id")
	destinationStationIDParam := c.QueryParam("destination_station_id")

	// fmt.Println(date)

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid start_station_id"})
		}
	}

	fmt.Println(startStationID)

	var destinationStationID int
	if destinationStationIDParam != "" {
		var err error
		destinationStationID, err = strconv.Atoi(destinationStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid destination_station_id"})
		}
	}

	fmt.Println(destinationStationID)

	ticket, err := h.TicketRepository.FilterTicket(startStationID, destinationStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: ticket})
}

func convertResponseTicket(u models.Ticket) ticketdto.TicketResponse {
	return ticketdto.TicketResponse{
		NameTrain:            u.NameTrain,
		TypeTrain:            u.TypeTrain,
		StartDate:            u.StartDate,
		StartStationID:       u.StartStationID,
		StartTime:            u.StartTime,
		DestinationStationID: u.DestinationStationID,
		ArivalTime:           u.ArivalTime,
		Price:                u.Price,
		Qty:                  u.Qty,
	}
}
