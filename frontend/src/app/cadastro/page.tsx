'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/api/auth'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/pages/cadastro.module.scss'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await authApi.register({ nome, email, senha: password })
      router.push('/login') 
    } catch (err: any) {
      alert(err.message || 'Erro ao criar conta')
    }
  }

  return (
    <main className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleRegister}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit">Criar conta</button>
          </form>

          <div className={styles.footer}>
            <Link href="/login">Já possui uma conta?</Link>
          </div>
        </div>

        <div className={styles.logoWrapper}>
          <Link href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="HealthEnv Logo"
              width={200}
              height={200}
              className={styles.logoIcon}
            />
          </Link>
        </div>
      </div>
    </main>
  )
}