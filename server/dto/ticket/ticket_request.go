package ticketdto

type CreateTicketRequest struct {
	NameTrain            string `json:"name_train" form:"name_train" validate:"required"`
	TypeTrain            string `json:"type_train" form:"type_train" validate:"required"`
	StartDate            string `json:"start_date" form:"start_date" validate:"required"`
	StartStationID       int    `json:"start_station_id" form:"start_station_id" validate:"required"`
	StartTime            string `json:"start_time" form:"start_time" validate:"required"`
	DestinationStationID int    `json:"destination_station_id" form:"destination_station_id" validate:"required"`
	ArivalTime           string `json:"arival_time" form:"arival_time" validate:"required"`
	Price                int    `json:"price" form:"price" validate:"required"`
	Qty                  int    `json:"qty" form:"qty" validate:"required"`
}
