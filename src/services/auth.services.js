export const fLoginService=async(data)=>{
    const res = await fetch('/api/auth/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(data),
    });
    console.log(res);
    const result =await res.json();
    if(!res.ok){
        throw new Error(result.message||"unable to login check service");
    }
    return result;
}