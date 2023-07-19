package authdto

type AuthRequest struct {
	Fullname string `json:"fullname" validate:"required" form:"fullName"`
	Username string `json:"username" validate:"required" form:"name"`
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
	NoHp     string `json:"no_hp" form:"no_hp" validate:"required"`
	Address  string `json:"address" validate:"required" form:"address"`
	Gender   string `json:"gender" validate:"required" form:"gender"`
}

type LoginRequest struct {
	Username string `json:"username" validate:"required" form:"fullName"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Role     string `json:"role"`
	Token    string `json:"token"`
}
