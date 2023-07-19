package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlersTransaction(transactionRepository, userRepository)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transactions", h.FindTransaction)
	e.GET("/transactions/:id", h.GetTransaction)
	e.GET("/transaction-user", middleware.Auth(h.GetTransactionByUser))
	e.DELETE("/transactions/:id", h.DeleteTransaction)
	e.GET("/getpayment/:id", h.GetPayment)
	e.POST("/notification", h.Notification)
}
