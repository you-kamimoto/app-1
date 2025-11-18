// src/components/about/index.tsx
import type { ReactNode } from "react";

type AboutSectionProps = {
  image?: string;
  title: string;
  position?: string;
  text: ReactNode;
  className?: string;
  classes?: {
    wrapper?: string;
    image?: string;
    text?: string;
    position?: string;
  };
};

export default function AboutSection({ image, title, position, text, className, classes = {}, }: AboutSectionProps) {
  return (
    <div className={[className, classes.wrapper].filter(Boolean).join(" ")}>
      {image && (
        <figure className={classes.image}>
          <img src={image} alt={title} />
        </figure>
      )}
      <div className={classes.text}>
        <h1>{title}</h1>
        {position && (
          <p className={classes.position}>{position}</p>
        )}
        <p>{text}</p>
      </div>
    </div>
  );
}