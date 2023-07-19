package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	AuthRoutes(e)
	UserRoutes(e)
	StationRoutes(e)
	TicketRoutes(e)
	TransactionRoutes(e)
}
