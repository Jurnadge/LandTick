package usersdto

type UserResponse struct {
	ID       int    `json:"-"`
	Fullname string `json:"fullname" `
	Username string `json:"username" `
	Email    string `json:"email" `
	NoHp     string `json:"no_hp"`
	Address  string `json:"address"`
	Gender   string `json:"gender"`
	Password string `json:"-" `
}
