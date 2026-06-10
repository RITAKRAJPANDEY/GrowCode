//success:true,
//created_at:task.created_at,
//id:task.id

import { apiClient } from "./apiClient";

interface LoginRequestData {
   username:string;
   password:string;
}


  
        // const response = NextResponse.json({
        //     success: true,
        //     message: "logged out successfully"
        // },{status:200});
        // response.cookies.set("refreshToken","",{
        //     httpOnly:true,
        //     secure:process.env.NODE_ENV==='production',
        //     sameSite:'strict',
        //     path:'/',
        //     expires:new Date(0)
        // });


interface AuthResponseData {
    success:boolean;
    accessToken:string;
    message?:string;
}

export const fLoginService=async(data:LoginRequestData):Promise<AuthResponseData>=>{
    // const res = await fetch('/api/auth/login',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     credentials:"include",
    //     body:JSON.stringify(data),
    // });
   const res = await apiClient.post('/auth/login',data);

    const result =res.data;
   if(typeof window !=='undefined'&& result.accessToken){
      localStorage.setItem('accessToken',result.accessToken);
    }
    
    console.log(result);
      
    
    return result;
}
export const fLogOutService = async()=>{
    // const res = await fetch('/api/auth/logout',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json",
    //     },
    //     credentials:"include",
        
    // });
    const res = await apiClient.post('/auth/logout');
    const result = res.data;
    if(typeof window !== 'undefined'){
        localStorage.removeItem('accessToken');
        delete apiClient.defaults.headers.common['authorization']
    }
    console.log(res);
    return result;
}