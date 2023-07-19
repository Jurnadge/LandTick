package routes

import (
	"landtick/handlers"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func StationRoutes(e *echo.Group) {
	stationRepository := repositories.RepositoryStation(mysql.DB)
	h := handlers.HandlerStation(stationRepository)

	e.GET("/stations", h.FindStation)
	e.POST("/station", h.CreateStation)
}
