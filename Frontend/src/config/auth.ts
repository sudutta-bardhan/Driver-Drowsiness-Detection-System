
// const API = "http://localhost:5000/api"

export function requireAuth() {
  const token = window.localStorage.getItem('token');
    if (!token) {
        window.location.href =  "/login";
    }
}




export function requireNoAuth() {
    const token = window.localStorage.getItem('token');
    if (token) {
        window.location.href = "/dashboard";
    }
}



export function checkLogin()
{
    const token = window.localStorage.getItem('token');
    return !!token;

    
}
