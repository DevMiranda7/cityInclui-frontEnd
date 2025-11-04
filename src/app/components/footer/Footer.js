import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div>
            <h4 className={styles.sectionTitle}>CityInclui</h4>
            <p className={styles.descriptionText}>
              Encontrando restaurantes acessíveis para todos
            </p>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Contato</h4>
            <p className={styles.descriptionText}>contato@cityinclui.com.br</p>
            <p className={styles.descriptionText}>(11) 4002-8922</p>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Redes Sociais</h4>
            <p className={styles.descriptionText}>
              Facebook | Instagram | Twitter
            </p>
          </div>
        </div>

        <div className={styles.copyrightText}>
          © 2025 CityInclui. Todos os direitos reservados.
        </div>
        
        <div className={styles.buttonWrapper}> 
          <button className={styles.suggestionButton}>
            Restaurante Sugestão
          </button>
        </div>
      </div>
    </footer>
  );
}
