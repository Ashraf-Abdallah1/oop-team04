export interface QuestionData {
  question: string
  correctAnswer: string
  answers: string[]
}

export interface PlanetData {
  name: string
  description: string
  orbitRadius: number
  orbitSpeed: number
  questions: QuestionData[]
}
