package models

type Ticket struct {
	ID                   int     `json:"id" gorm:"primaryKey:autoIncrement"`
	NameTrain            string  `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string  `json:"type_train" gorm:"type: varchar(255)"`
	StartDate            string  `json:"start_date" gorm:"type: varchar(255)"`
	StartStation         Station `json:"start_station"`
	StartStationID       int     `json:"start_station_id"`
	StartTime            string  `json:"start_time" gorm:"type: varchar(255)"`
	DestinationStation   Station `json:"destination_station"`
	DestinationStationID int     `json:"destination_station_id"`
	ArivalTime           string  `json:"arival_time" gorm:"type: varchar(255)"`
	Price                int     `json:"price" gorm:"type: int" form:"price"`
	Qty                  int     `json:"qty" gorm:"type: int" form:"qty"`
}

type TicketTransaction struct {
}
