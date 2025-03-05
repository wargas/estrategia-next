import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
    const session = await auth()
    return (
        <div>
            <form action={async () => {
                'use server'

                await signOut({ redirectTo: '/login' })
            }}>

                <Button>Sair</Button>
            </form>
            {JSON.stringify(session)}
        </div>
    );
};

export default page;