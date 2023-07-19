package database

import (
	"fmt"
	"landtick/models"
	"landtick/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Station{},
		&models.Ticket{},
		models.Transaction{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Migration Succes")
}
