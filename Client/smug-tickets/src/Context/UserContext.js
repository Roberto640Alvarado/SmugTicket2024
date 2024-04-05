import authService from "../services/Auth/AuthService";

const context = {
    login: (identifier) => {
        if (identifier.length === 0) return false;
    
        const asyncFetchUser = async (identifier) => {
        let response = await authService.login(identifier);
        let token = response.data.content;
        console.log(token);
        let responseCode = await authService.verifyToken(token);//Obtenemos el ID del usuario
        console.log("Esto es el responseCode: " + responseCode); 
        if (response.hasError) return false;
    
        if (localStorage.getItem("content")) {
            localStorage.removeItem("content");
            localStorage.removeItem("code");
            localStorage.removeItem("hasLoggedIn", false);
        }
    
        localStorage.setItem("content", token);
        localStorage.setItem("code", responseCode);
        localStorage.setItem("hasLoggedIn", "true");
    
            return { status: response.status, code: responseCode };//"Logueado";
        }
        
        return asyncFetchUser(identifier);
    },
    logout: function() {
        localStorage.removeItem("content");
        localStorage.removeItem("code");
        localStorage.removeItem("hasLoggedIn");
    },
    getToken: function() {
        //const content = localStorage.getItem("content");
        return localStorage.getItem("content");
    },
    getCode: () => {
        return localStorage.getItem("code");// ID del usuario
    },
    isUserLogged: () => {
        return !!localStorage.getItem("hasLoggedIn")
    }
}
export default context;