import { easeInOut } from "framer-motion";

export const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delay: 0.2
    }
  }
}

export const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export const fade = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.5,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};