import { AppHeader } from "@/components/app-header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Api from "@/lib/api";
import { List, SearchIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export default async function Assinaturas() {

    const { data: assinaturas } = await Api.get<ResponseAssinatura>('aluno/assinatura')

    return (
        <div>
            <AppHeader>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>Assinaturas</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </AppHeader>
            <div className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-3 gap-4">
                    {assinaturas.data[0].cursos.map(curso => (
                        <Card key={curso.id}>
                            <CardHeader>
                                <CardTitle>{curso.nome}</CardTitle>
                                <CardDescription>
                                    <span className="text-xs">{assinaturas.data[0].nome}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                                <div className="flex gap-2">
                                    <Button className="w-full" variant={'destructive'}>
                                        <TrashIcon />
                                        Desmatricular
                                    </Button>
                                    <Button className="w-full" asChild>
                                        <Link href={`pacotes/${curso.id}`}>
                                            <List />
                                            Ver Cursos </Link>
                                    </Button>

                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
                <h1 className="font-bold text-2xl">Matricular novos produtos</h1>
                <Card>
                    <CardHeader>
                        <div className="flex gap-4">
                            <Input placeholder="Pesquisar" /> <Button variant={'outline'}>
                                <SearchIcon />
                                Pesquisar</Button>
                        </div>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export type ResponseAssinatura = {
    data: Array<{
        id: number
        nome: string
        descricao: string
        permalink: string
        limite_inscricao: number
        cursos: Array<{
            id: number
            nome: string
            inscrito: boolean
            destaque: boolean
            data_retirada: string
            agrupador: boolean
        }>
    }>
}