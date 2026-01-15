import { QuestionData } from './QuestionData.js';
export interface PlanetData {
  name: string
  description: string
  orbitRadius: number
  orbitSpeed: number
  questions: QuestionData[]
}
