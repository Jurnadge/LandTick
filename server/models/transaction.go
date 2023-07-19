package models

type Transaction struct {
	ID       int    `json:"id" gorm:"primaryKey:autoIncrement"`
	UserID   int    `json:"user_id"`
	User     User   `json:"user"`
	TicketID int    `json:"ticket_id"`
	Ticket   Ticket `json:"ticket"`
	Status   string `json:"status" gorm:"type: varchar(255)"`
}
