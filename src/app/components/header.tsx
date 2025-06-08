"use client"

import Link from "next/link"
import { Shield, User, LogOut, ChevronDown, Menu, X } from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"
import { useState, useEffect } from "react"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para adicionar sombra ao header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu móvel quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">ClimateRisks</span>
          </Link>

          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors">
              Início
            </Link>

            <Link
              href="/alagamentos"
              className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors"
            >
              Alagamentos
            </Link>

            <Link
              href="/deslizamentos"
              className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors"
            >
              Deslizamentos
            </Link>

            <Link href="/alertas" className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors">
              Alertas
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[80px] lg:max-w-[120px] truncate text-sm">{user?.nome}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium truncate">{user?.nome}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          logout()
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cadastro
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Botão do menu móvel */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <Link
              href="/"
              className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/alagamentos"
              className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Alagamentos
            </Link>
            <Link
              href="/deslizamentos"
              className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Deslizamentos
            </Link>
            <Link
              href="/alertas"
              className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Alertas
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{user?.nome}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      logout()
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 my-2 pt-2 space-y-2">
                <Link
                  href="/register"
                  className="block py-2 px-3 rounded-md hover:bg-gray-100 text-base transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cadastro
                </Link>
                <Link
                  href="/login"
                  className="block py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
