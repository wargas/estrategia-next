import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module 'next-auth' {
  interface Session {
    token: string
  }

  interface User {
    token: string
  } 
}

export type RespondeDetalhe = {
  usuario: {
    id: number
    nome: string
    email: string
    data_nascimento: string
    data_ultimo_acesso: string
    data_criacao: string
    telefone: string
  }
  email_confirmado: boolean
  imagem: string
  mensagens: number
  pontos: number
  desconto: number
  recados: number
  desconectou: boolean
  mostrar_assinatura: boolean
  total_assinaturas: number
  tem_promocao_maio_2020: boolean
  vem_para_maior_2021: boolean
  vem_para_maior_expire_2021: any
  ja_enviou_promocao_maio_2020: boolean
  ja_comecou_promocao_maio_2020: boolean
  tem_promocao: boolean
  tem_renovacao: boolean
  renovar_assinatura: boolean
  renovar_assinatura_antecipada: boolean
  verticais: Array<string>
  blackfriday: boolean
  tem_sistema_de_questoes: boolean
  login_accounts: boolean
  ldi_url: string
  tem_vitalicia: boolean
  valor_2022: number
  valor_2023: number
  valor_considerado: number
  percentual_desconto: number
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        token: {}
      },
      authorize: async (credentials, request) => {

        try {
          const { data } = await axios.get<RespondeDetalhe>(`https://api.estrategiaconcursos.com.br/api/aluno/perfil/detalhes`, {
            headers: {
              Authorization: `Bearer ${credentials.token}`
            }
          })

          if(!data) {
            return null
          }

          return {
            name: data.usuario.nome,
            email: data.usuario.email,
            image: data.imagem,
            id: String(data.usuario.id),
            token: String(credentials.token||'')
          }

        } catch (error) {

          return null;
        }

      }
    })
  ],
  callbacks: {
    jwt({token, user}) {
      if(user?.token) {
        token.token = user.token
      }

      return token
    },
    session({session, token}) {

      session.token = String(token.token)
      
      return session
    },
  }
})