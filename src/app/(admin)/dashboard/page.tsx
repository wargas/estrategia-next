import { AppHeader } from "@/components/app-header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Api from "@/lib/api"
import Link from "next/link"

type CursosResponse = {
    data: {
        concursos: Array<{
            id: number
            titulo: string
            modalidades: Array<string>
            modalidadeActiveIndex: number
            cursos: Array<{
                id: number
                nome: string
                data_inicio: string
                data_retirada: string
                tipo: string
                id_cargos: Array<any>
                icone: any
                modalidade: string
                redirect_area_aluno: any
                arquivado: boolean
                favorito: boolean
                total_aulas_visualizadas: number
                total_aulas: number
            }>
        }>
        cargos: Array<any>
    }
}


export default async function Dashboard() {

    const { data: cursos } = await Api.get<CursosResponse>('aluno/curso')

    return (
        <div>
            <AppHeader>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </AppHeader>

            <h1 className="font-bold text-xl px-4">Cursos</h1>
            <div className="flex flex-col gap-4 p-4">

                {cursos.data.concursos.map(concurso => (
                    <Card key={concurso.id}>
                        <CardHeader>
                            <CardTitle>{concurso.titulo} ({concurso.modalidades[0]})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {concurso.cursos.map(curso => (
                                    <Link key={curso.id} href={`/cursos/${curso.id}`}>
                                        <Card >
                                            <CardHeader>
                                                <CardTitle className="">{curso.nome}</CardTitle>
                                                <CardDescription>Disponível até {new Date(curso.data_retirada).toLocaleDateString('pt-BR')}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>)
}