'use client'

import styles from '../styles/pages/home.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Seu progresso e evolução com o <span>HealthEnv</span></h1>
          <p>Monitore seus treinos, registre suas refeições diárias, acompanhe indicadores como hidratação e sono — tudo integrado em um único sistema para otimizar seu desempenho e facilitar o alcance de metas.</p>
          <Link href="/cadastro">
            <button className={styles.cta}>Crie sua conta grátis</button>
          </Link>
        </div>
          <Image
            src="/images/arnold.png"
            alt="Imagem destaque"
            width={400}
            height={600}
            className={styles.arnoldImage}
          />
      </section>

      <section className={styles.features}>
        <div className={styles.featureBox}>
          <div className={styles.featureContent}>
            <h2>Relatórios semanais e mensais</h2>
            <p>
              Exporte suas anotações em formato de PDF ou CSV para assim<br />
               poder realizar a impressão ou compartilhar
              com um profissional da saúde.<br />
            </p>
          </div>
          <div className={styles.featureIcons}>
            <Image
              src="/images/pdf.png" 
              alt="PDF Icon"
              width={50}
              height={50}
            />
            <Image
              src="/images/excel.png" 
              alt="Excel Icon"
              width={50}
              height={50}
            />
          </div>
        </div>
      </section>

      <section className={styles.cardSection}>
        <div className={styles.card}>
          <div className={styles.cardBox}>
            <h3>Treino de Peito</h3>
            <ul>
              <li>Supino reto 4x12 30 kg</li>
              <li>Supino reto 4x12 30 kg</li>
              <li>Supino reto 4x12 30 kg</li>
              <li>Supino reto 4x12 30 kg</li>
            </ul>
          </div>
          <div className={styles.cardContent}>
            <p>
              Crie registros diários anotando sua progressão de carga para cada tipo de treino para ao final do dia criar um relatório do seu progresso.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardBox}>
            <h3>Almoço</h3>
            <ul>
              <li>Arroz branco 200 g</li>
              <li>Feijão preto 100 g</li>
              <li>Patinho moído 200 g</li>
              <li>Brócolis 150 g</li>
            </ul>
          </div>
          <div className={styles.cardContent}>
            <p>
              Anote também suas refeições de formas simples ou detalhadas para assim controlar seus macros diários.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.adCardSection}>
        <div className={styles.adCard}>
          <h3>Hidratação</h3>
          <h2>Mais água, mais energia!</h2>
          <p>
            Pare de esquecer a água e comece a cuidar do seu corpo de verdade!
            Registre sua meta diária de hidratação e mantenha sua saúde em alta com
            alertas e controle personalizado.
          </p>
          <img src="/images/water.png" alt="Ícone de Hidratação" />
        </div>
        <div className={styles.adCard}>
          <h3>Monitoria de sono</h3>
          <h2>Dormir bem é treinar melhor!</h2>
          <p>
            Anote suas horas dormidas todos os dias e veja como o descanso afeta sua
            performance, identifique padrões e descubra como dormir melhor pode
            transformar sua saúde e performance física.
          </p>
          <img src="/images/bed.png" alt="Ícone de Monitoria de Sono" />
        </div>
      </section>

      <Footer />
    </main>
    
  )
}
