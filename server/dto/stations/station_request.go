package stationsdto

type CreateStationRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
}
