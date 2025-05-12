'use client'

import styles from '../styles/components/header.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/images/logo.png"
          alt="HealthEnv Logo"
          width={250}
          height={220}
        />
      </div>
      <nav className={styles.nav}>
        <Link href="/login">Entrar</Link>
        <Link href="/cadastro" className={styles.cta}>Cadastrar</Link>
      </nav>
    </header>
  )
}
