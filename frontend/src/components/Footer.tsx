'use client';

import styles from '../styles/components/footer.module.scss';
import { FaGithub } from 'react-icons/fa'; // Importa o ícone do GitHub
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <Image
            src="/images/logo.png"
            alt="HealthEnv Logo"
            width={350}
            height={320}
          />
        </div>
        <div className={styles.linksSection}>
          <h4>Comece agora</h4>
          <ul>
            <li><Link href="/contato">Entre em contato</Link></li>
            <li><Link href="/servico">Serviço</Link></li>
            <li><Link href="/sobre">Sobre nós</Link></li>
          </ul>
        </div>
        
      </div>
      <div className={styles.endFooter}>
        <p>&copy; {new Date().getFullYear()} HealthEnv. Todos os direitos reservados.</p>
        <div className={styles.socialSection}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <FaGithub size={32} color="#fff" />
          </a>
        </div>
      </div>
      
    </footer>
  );
}