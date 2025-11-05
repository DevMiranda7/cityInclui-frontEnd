import Link from 'next/link';
import styles from './Home.module.css';


export default function HomePage() {
  return (
    <div className={styles.pageContainer}>

      <main className={styles.mainContent}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.title}>Bem-vindo ao CityInclui</h1>
          <p className={styles.description}>
            Encontrando restaurantes acessíveis para todos.
          </p>
          
          <Link href="/register" className={styles.registerButton}>
            Criar minha conta
          </Link>
        </div>
      </main>
    </div>
  );
}

