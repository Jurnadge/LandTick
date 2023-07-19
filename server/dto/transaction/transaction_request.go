package transactiondto

type CreateTransactionRequest struct {
	UserID   int    `json:"user_id"`
	TicketID int    `json:"ticket_id" form:"ticket_id"`
	Status   string `json:"status"`
}
