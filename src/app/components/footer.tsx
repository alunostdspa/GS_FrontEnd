import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">&copy; 2025 ClimateRisks. Todos os direitos reservados.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 lg:gap-6">
            <Link href="/integrantes" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Equipe
            </Link>
            <Link href="/alagamentos" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Alagamentos
            </Link>
            <Link href="/deslizamentos" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Deslizamentos
            </Link>
            <Link href="/alertas" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Alertas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
