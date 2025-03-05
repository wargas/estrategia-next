import { AppHeader } from "@/components/app-header";
import { AulaDetalhe } from "@/components/aula-detalhe";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Api from "@/lib/api";

export default async function Curso({ params }: any) {

    const _params = await params;

    const id = _params?.id || '';

    const { data: curso } = await Api.get<CursoResponse>(`aluno/curso/${id}`)

    return (
        <div>
            <AppHeader>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>{curso.data.nome}</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </AppHeader>
            <div className="flex flex-col gap-4 p-4">
                {curso.data.aulas.map(aula => (
                    <AulaDetalhe key={aula.id} aula={aula} />
                ))}
            </div>
        </div>)
}

export type CursoResponse = {
    data: {
        id: number
        nome: string
        data_inicio: string
        data_retirada: string
        tipo: string
        professores: Array<{
            id: number
            nome: string
            imagem: string
        }>
        aulas: Array<{
            id: number
            nome: string
            conteudo: string
            is_disponivel: boolean
            visualizada: boolean
            data_publicacao: string
            pdf: string
            funcionalidade_pdf_grifado: any
            pdf_grifado: any
            pdf_simplificado: any
            is_aluno_finalizado: boolean
            conteudos_pendentes: number
            videos: Array<{
                id: number
                titulo: string
                visualizado: boolean
                resumo: any
                slide?: string
                mapa_mental?: string
                posicao: number
                resolucao: string
                resolucoes: {
                    "720p": string
                    "480p": string
                    "360p": string
                }
                anotacoes: any
                audio: string
                thumbnail: string
            }>
            tec_concursos?: string
            livestream: any
            livestream_link: any
            livestream_data: any
            livestream_senha: any
            conferencia_hora: any
            conferencia_link: any
            baixado: boolean
        }>
        nota: number
        permite_forum: boolean
        discursivas: any
        aulas_baixadas: Array<any>
        aulas_baixadas_hoje: Array<any>
        downloads_restantes: number
        pesquisa_habilitada: boolean
        icone: any
        cliente_like: any
        likes: number
        dislikes: number
        raio_x: any
        mapa_da_lei: any
        funcionalidade_forum: boolean
        funcionalidade_mapa_mental: boolean
        funcionalidade_pdf_grifado: boolean
        funcionalidade_resumo: boolean
        modalidade: string
        total_aulas: number
        total_aulas_visualizadas: number
        certificado_pode_emitir: boolean
        certificado_ja_emitido: boolean
        certificado_link: string
        ldi_url: any
    }
}
