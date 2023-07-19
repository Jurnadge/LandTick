package ticketdto

type TicketResponse struct {
	NameTrain            string `json:"name_train" `
	TypeTrain            string `json:"type_train" `
	StartDate            string `json:"start_date" `
	StartStationID       int    `json:"start_station_id" `
	StartStation         string `json:"start_station"`
	StartTime            string `json:"start_time" `
	DestinationStationID int    `json:"destination_station_id"`
	DestinationStation   string `json:"destination_station"`
	ArivalTime           string `json:"arival_time" `
	Price                int    `json:"price" `
	Qty                  int    `json:"qty" `
}
