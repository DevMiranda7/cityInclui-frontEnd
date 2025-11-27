import HeroSection from "./components/hero/HeroSection";
import RestaurantCarousel from "./components/carousel/CarouselRestaurant";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroWrapper}>
        <HeroSection />
      </div>

      <main className={styles.mainContent}>
        <RestaurantCarousel />
      </main>
    </div>
  );
}
