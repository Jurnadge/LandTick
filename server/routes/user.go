package routes

import (
	"landtick/handlers"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	r := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(r)

	e.GET("/users", h.FindUser)
	e.GET("/users/:id", h.GetUser)
	e.POST("/users", h.CreateUser)
	e.PATCH("/users/:id", h.UpdateUser)
	e.DELETE("/users/:id", h.DeleteUser)
}
