export const fLoginService=async(data)=>{
    const res = await fetch('/api/auth/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(data),
    });
   
    const result =await res.json();
    if(!res.ok){
        throw new Error(result.message||"unable to login check service");
    }
    return result;
}
export const fLogOutService = async()=>{
    const res = await fetch('/api/auth/logout',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        
    });
    console.log(res);
    if(!res.ok){
        throw new Error("Unable to Log Out")
    }
    const result = await res.json();
    return result;
}