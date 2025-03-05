import { Loader2 } from "lucide-react";

export default function LoadingPacotes() {
    return (
        <div className="h-screen flex items-center justify-center w-full">
            <Loader2 className="animate-spin" />
        </div>
    )
}