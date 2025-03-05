"use client"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { useQuery } from "@tanstack/react-query"
import { FileText, Loader2Icon, MessageSquareText, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Collapsible, CollapsibleContent } from "./ui/collapsible"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { Switch } from "./ui/switch"

import { ApiClient } from "@/lib/api_client"
import { cn } from "@/lib/utils"
import { useWindowSize } from 'usehooks-ts'


export function AulaDetalhe({ aula }: Props) {

    const [open, setOpen] = useState(false)
    const [currentVideo, setCurrentVideo] = useState<AulaResponse['data']['videos'][0]>()
    const [height, setHeight] = useState(0)

    const videoRef = useRef<HTMLVideoElement>(null) as any

    const windowsSize = useWindowSize({ initializeWithValue: true })

    // const { width, height = 320 } = useResizeObserver({ ref: videoRef, box: 'border-box', onResize: console.log })

    const { data, isLoading } = useQuery({
        queryKey: [`aula`, aula.id],
        queryFn: async () => {
            const { data } = await ApiClient.get<AulaResponse>(`aluno/aula/${aula.id}`)

            if (!currentVideo && data.data?.videos) {
                setCurrentVideo(data.data.videos[0])
            }

            return data;
        },
        enabled: open
    })

    useEffect(() => {
        if (videoRef.current) {
            setHeight(videoRef.current.clientHeight)
        }
    }, [windowsSize, videoRef.current])

    return (
        <Collapsible onOpenChange={setOpen}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CollapsibleTrigger asChild>
                        <div className="cursor-pointer">
                            <CardTitle>{aula.nome}</CardTitle>
                            <CardDescription>{aula.conteudo}</CardDescription>
                        </div>
                    </CollapsibleTrigger>
                    <div className="flex items-center gap-4">
                        <Switch id={`estudei-${aula.id}`} />
                        <Label className="cursor-pointer" htmlFor={`estudei-${aula.id}`}>Estudei</Label>
                    </div>
                </CardHeader>
                <CollapsibleContent>
                    <CardContent>
                        {isLoading && (
                            <div className="min-h-32 flex items-center justify-center">
                                <Loader2Icon className="animate-spin" />
                            </div>
                        )}
                        {data?.data && (
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <a href={aula.pdf} className="border p-4 rounded flex-1 text-center text-sm flex items-center justify-center flex-col">
                                        <FileText />
                                        <h2>Baixar livro eletronico</h2>
                                        <span className="font-bold text-red-500 ">Versão orignal</span>
                                    </a>
                                    <a href={aula.tec_concursos} className="border p-4 rounded flex-1 text-center text-sm flex items-center justify-center flex-col gap-2">
                                        <MessageSquareText />
                                        <h2 >Questões</h2>
                                    </a>
                                </div>
                                {data.data.videos?.length > 0 && (
                                    <div className="flex gap-4">
                                        <div className="w-[60%] xl:w-[75%]">
                                            <video
                                                ref={videoRef}
                                                onResize={ev => setHeight(ev.currentTarget.clientHeight)}
                                                className="w-full rounded-lg"
                                                autoPlay={false} controls src={currentVideo?.resolucoes["720p"]}
                                                poster={currentVideo?.thumbnail}></video>
                                        </div>

                                        <ScrollArea className="w-[40%] xl:w-[25%]" style={{ height: `${height}px` }}>
                                            <div className="flex flex-col gap-1 ">

                                                {data.data.videos.map((video, i) => (
                                                    <div key={video.id} onClick={() => setCurrentVideo(video)}
                                                        className={cn("cursor-pointer border rounded text-sm p-2 flex gap-2 items-center transition-all", { 'bg-blue-600 border-blue-700': video.id == currentVideo?.id })}>
                                                        <Play color="#ccc" />
                                                        <div className="text-neutral-600">
                                                            <span className="text-neutral-300">video {i + 1}</span> <br />
                                                            <span className={cn({'text-white': video.id == currentVideo?.id })}> {video.titulo}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}

type Props = {
    aula: {
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
    }
}

export type AulaResponse = {
    data: {
        id: number
        nome: string
        conteudo: string
        is_disponivel: boolean
        visualizada: boolean
        data_publicacao: string
        pdf: string
        funcionalidade_pdf_grifado: boolean
        pdf_grifado: any
        pdf_simplificado: any
        is_aluno_finalizado: boolean
        conteudos_pendentes: number
        videos: Array<{
            id: number
            titulo: string
            visualizado: boolean
            resumo: any
            slide: string
            mapa_mental: any
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
        tec_concursos: string
        livestream: any
        livestream_link: any
        livestream_data: any
        livestream_senha: any
        conferencia_hora: any
        conferencia_link: any
        baixado: any
    }
}
