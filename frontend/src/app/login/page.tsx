'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/api/auth'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/pages/login.module.scss'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') 

    try {
      await authApi.login({ email, senha: password })
      router.push('/dashboard') 
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    }
  }

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleLogin}>
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

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit">Login</button>
          </form>

          <div className={styles.footer}>
            <a href="#">Esqueceu sua senha?</a>
            <Link href="/cadastro">Não possui uma conta?</Link>
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