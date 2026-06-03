export const addTaskService = async(taskData)=>{
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken||accessToken==="null"){
        throw new Error("token not found ");
    }
    try{
        const res = await fetch('/api/task/addtask',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${accessToken}`
        },
        body:JSON.stringify(taskData),
    });
    const result = await res.json();
    if(!res.ok){
        throw new Error(result.message||"unable to add task")
    }
    return result;
    }catch(err){
        console.error(err);
    }
}
