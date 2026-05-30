export default function LogIn(){
    return <div className=" flex w-screen h-screen items-center justify-center ">
        <div className="w-full max-w-md rounded-xl bg-[#020617] border border-[#34d399]">
            <div className="flex flex-col p-8 gap-4">
                <h1 className="text-[#34d399] px-40 text-2xl">LogIn</h1>
                <form>
                <input placeholder="username" className="rounded-md hover:scale-97 p-2 m-2 border border-white "/>
                <input placeholder="password" className="rounded-md hover:scale-97 p-2 m-2 border border-white "/>
                <button type="submit">LogIn</button>
                <h1 className="text-xs px-20">{`Don't have an Account ;`}
                    <span className="text-blue-400">FUCK OFF</span>
                </h1>
                </form>
            </div>
        </div>
    </div>
}