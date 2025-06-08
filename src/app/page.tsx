import Link from "next/link"
import { Shield, Users, AlertTriangle, ArrowRight } from "lucide-react"
import { Header } from "./components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Sistema de Gestão de
            <span className="text-blue-600 block sm:inline"> Riscos Climáticos</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed">
            Monitore, previna e responda a eventos climáticos extremos com nossa plataforma integrada de gestão de
            riscos.
          </p>
          <div className="mt-6 sm:mt-8 lg:mt-10 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 lg:py-4 border border-transparent text-base lg:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Cadastre-se Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-500 flex-shrink-0" />
                <h3 className="ml-3 text-base sm:text-lg lg:text-xl font-medium text-gray-900">
                  Alertas em Tempo Real
                </h3>
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
                Receba notificações instantâneas sobre condições climáticas adversas em sua região.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
                <h3 className="ml-3 text-base sm:text-lg lg:text-xl font-medium text-gray-900">Rede Colaborativa</h3>
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
                Conecte-se com outros usuários e autoridades para compartilhar informações importantes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" />
                <h3 className="ml-3 text-base sm:text-lg lg:text-xl font-medium text-gray-900">Proteção Avançada</h3>
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
                Utilize dados meteorológicos precisos para tomar decisões informadas sobre segurança.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 bg-blue-600 rounded-lg shadow-xl">
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Pronto para se proteger dos riscos climáticos?
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Junte-se à nossa comunidade e tenha acesso a ferramentas avançadas de monitoramento.
              </p>
              <div className="mt-6 sm:mt-8 lg:mt-10">
                <Link
                  href="/register"
                  className="inline-flex items-center px-5 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 border border-transparent text-base lg:text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
