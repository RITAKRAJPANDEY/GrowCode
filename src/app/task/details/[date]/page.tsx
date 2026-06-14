import Navbar from "@/src/components/NavBar"
import UtilityBar from "@/src/components/UtilityBar"
import DetailsCard from "@/src/components/detailsCard"

export default function TaskDetailsPage() {
    return (
        <div className="flex w-screen h-screen bg-[#0f172a]">
            <div className="flex-none">
                <Navbar />
            </div>
            <div className="flex-1 min-w-0 overflow-y-auto">
                <DetailsCard />
            </div>
            <div className="flex-none">
                <UtilityBar />
            </div>
        </div>
    )
}