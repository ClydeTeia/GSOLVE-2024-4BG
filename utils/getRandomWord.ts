import { asl_vocabulary } from "@/data/samples/typeraceWords";

export default function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * asl_vocabulary.length);
  return asl_vocabulary[randomIndex];
}