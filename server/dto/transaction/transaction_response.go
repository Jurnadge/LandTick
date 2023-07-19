package transactiondto

import "landtick/models"

type TransactionResponse struct {
	User   models.User   `json:"user_id"`
	Ticket models.Ticket `json:"ticket_id"`
	Image  string        `json:"image"`
	Status string        `json:"status"`
}
