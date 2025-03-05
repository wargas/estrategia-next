import { AppHeader } from "@/components/app-header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Api from "@/lib/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Assinaturas(props: { params: any }) {
    const params = await props.params

    const { data: pacote } = await Api.get<PacoteResponse>(`aluno/pacote/${params.pacote_id}`)

    return (
        <div>
            <AppHeader>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbLink href="/matriculas">Matriculas</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>{pacote.data.nome}</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </AppHeader>
            <div className="p-4">
                <div className="flex flex-col gap-2">

                    {pacote.data.cursos.map(curso => (
                        <Link key={curso.id} href={`/pacotes/${pacote.data.id}/cursos/${curso.id}`}>
                            <Card >
                                <CardHeader>
                                    <div className="flex items-center justify-between">

                                        <CardTitle>{curso.nome}</CardTitle>
                                        <ChevronRight />
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export type PacoteResponse = {
    data: {
        id: number
        nome: string
        ldi_url: any
        cursos: Array<{
            id: number
            nome: string
            tipo_curso_id: number
        }>
    }
}
