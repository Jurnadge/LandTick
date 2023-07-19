package routes

import (
	"landtick/handlers"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	ticketRepository := repositories.RepositoryTicket(mysql.DB)
	h := handlers.HandlersTicket(ticketRepository)

	e.POST("/ticket", h.CreateTicket)
	e.GET("/fil-ticket", h.FilterTicket)
	e.GET("/tickets", h.FindTicket)
}
