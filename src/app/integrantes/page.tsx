import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Users, GraduationCap } from "lucide-react"
import { Header } from "@/app/components/header"

export default function IntegrantesPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Fernando Nachtigall Tessmann",
      rm: "RM559617",
      turma: "1TDSPR",
      github: "ftessmann",
      linkedin: "fernando-tessmann-75086bb6",
      image: "/imagens/integrante_F.jpg",
      
    },
    {
      id: 2,
      name: "Ruan Nunes Gaspar",
      rm: "RM559567",
      turma: "1TDSPA",
      github: "RuanGaspar-TDSPA",
      linkedin: "ruan-gaspar-5664a0222",
      image: "/imagens/integrante_RU.jpg",
      
    },
    {
      id: 3,
      name: "Rodrigo Paes Morales",
      rm: "RM560209",
      turma: "1TDSPA",
      github: "RodrigoPMorales",
      linkedin: "rodrigo-morales-b26698203",
      image: "/imagens/integrante_RO.jpg",
      
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>

        {/* Header da página */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Equipe <span className="text-blue-600">ClimateRisks</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os desenvolvedores por trás da plataforma de gestão de riscos climáticos
          </p>
        </div>

        {/* Cards dos integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="p-8">
                {/* Foto do integrante */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`Foto de ${member.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-blue-100"
                  />
                </div>

                {/* Informações do integrante */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h2>

                  <div className="flex items-center justify-center mb-2">
                    <GraduationCap className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-blue-600 font-medium">{member.rm}</span>
                    <span className="text-gray-500 ml-2">• {member.turma}</span>
                  </div>

                  {/* Links sociais */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200 group"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <Github className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
                    </a>
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition-colors duration-200 group"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="h-5 w-5 text-blue-600 group-hover:text-blue-800" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
