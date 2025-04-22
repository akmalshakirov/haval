class userService {
    get TOKEN() {
        return localStorage.getItem("token");
    }

    get USER_ID() {
        return localStorage.getItem("userID");
    }
}

export const UserService = new userService();
