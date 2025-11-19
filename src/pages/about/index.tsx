// src/pages/about/index.tsx
import AboutSection from "../../components/about";
import styles from "./index.module.css"
import portrait from '../../assets/portrait.png-QKmVB2a0.webp'

export default function AboutPage() {
  return (
    <>
    <title>{`${import.meta.env.VITE_APP_NAME} | About` }</title>
    <section>
      <div className={styles.container}>
        <AboutSection
          image={portrait}
          title={import.meta.env.VITE_GIT_NAME}
          position="Software Developer"
          text={
            <>
              Hi, I'm a software developer based in Tokyo. 👋<br />
              I enjoy working with modern web technologies and creating seamless user experiences.
            </>
          }
          className={styles.about}
          classes={{
            wrapper: styles.Wrapper,
            image: styles.aboutImage,
            text: styles.aboutText,
            position: styles.position,
          }}
        />
      </div>
    </section>
    </>
  );
}