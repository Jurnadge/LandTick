package handlers

import (
	dto "landtick/dto/result"
	stationsdto "landtick/dto/stations"
	"landtick/models"
	"landtick/repositories"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type handlerStation struct {
	StationRepository repositories.StationRepository
}

type dataStation struct {
	Station interface{} `json:"stations"`
}

func HandlerStation(StationRepository repositories.StationRepository) *handlerStation {
	return &handlerStation{StationRepository}
}

// FindStation
func (h *handlerStation) FindStation(c echo.Context) error {
	stations, err := h.StationRepository.FindStation()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: dataStation{Station: stations}})
}

// GetStation
// func (h *handlerStation) GetStation(c echo.Context) error {
// 	id, _ := strconv.Atoi(c.Param("id"))

// 	station, err := h.StationRepository.GetStation(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}
// 	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: convertResponse(station)})
// }

// CreateStation
func (h *handlerStation) CreateStation(c echo.Context) error {
	request := new(stationsdto.CreateStationRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data := models.Station{
		Name: request.Name,
	}

	response, err := h.StationRepository.CreateStation(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: response})
}
