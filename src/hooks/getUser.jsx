export const useGetUserInfo = ()=>{
    const {name,photoUrl,userId,isAuth} = JSON.parse(localStorage.getItem("auth"))
    || {};

    return{name,photoUrl,userId,isAuth}
}