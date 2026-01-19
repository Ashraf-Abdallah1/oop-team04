import { PlanetData } from './dto/PlanetData.js';

export const planetData: PlanetData[] = [
  {
    name: 'Sun',
    description: 'SUN',
    orbitRadius: 0,
    orbitSpeed: 0,
    questions: [
      {
        question: 'Wat is de Zon?',
        correctAnswer: 'A',
        answers: ['Een ster', 'Een planeet', 'Een rots'],
      },
      {
        question: 'Waarom is de Zon belangrijk voor het leven op Aarde?',
        correctAnswer: 'A',
        answers: [
          'Omdat hij licht en warmte geeft',
          'Omdat hij koud is',
          'Omdat hij water maakt',
        ],
      },
    ],
  },
  {
    name: 'Mercurius',
    description: 'Je moet naar de planet die het dichtst bij de zon stat.',
    orbitRadius: 850,
    orbitSpeed: 0.00004,
    questions: [
      {
        question: 'Welke planeet staat het dichtst bij de Zon?',
        correctAnswer: 'B',
        answers: ['Aarde', 'Mercurius', 'Mars'],
      },
      {
        question: 'Waarom is Mercurius overdag heel heet?',
        correctAnswer: 'B',
        answers: [
          'Omdat hij groot is',
          'Omdat hij dicht bij de Zon staat',
          'Omdat hij veel water heeft',
        ],
      },
    ],
  },
  {
    name: 'Venus',
    description: 'Je moet naar de de heetste planeet van allemaal',
    orbitRadius: 1100,
    orbitSpeed: 0.00003,
    questions: [
      {
        question: 'Welke planeet is het warmst?',
        correctAnswer: 'C',
        answers: ['Mars', 'Jupiter', 'Venus'],
      },
      {
        question: 'Waarom is Venus zo heet?',
        correctAnswer: 'C',
        answers: ['Door ijs', 'Door regen', 'Door een dikke atmosfeer'],
      },
    ],
  },
  {
    name: 'Aarde',
    description: 'Je moet naar planet waar mensen en dieren leven .',
    orbitRadius: 1400,
    orbitSpeed: 0.00002,
    questions: [
      {
        question: 'Hoeveel manen heeft de Aarde?',
        correctAnswer: 'B',
        answers: ['Twee', 'Eén', 'Drie'],
      },
      {
        question: 'Waarom kan er leven zijn op Aarde?',
        correctAnswer: 'B',
        answers: [
          'Omdat het altijd donker is',
          'Omdat er water en lucht is',
          'Omdat er geen zwaartekracht is',
        ],
      },
    ],
  },
  {
    name: 'Mars',
    description: 'Je moet naar de rode en  die op de aarde lijk.',
    orbitRadius: 1700,
    orbitSpeed: 0.000013,
    questions: [
      {
        question: 'Welke kleur heeft Mars door het ijzer stof?',
        correctAnswer: 'B',
        answers: ['Blauw', 'Rood', 'Geel'],
      },
      {
        question: 'Waarom wordt Mars de rode planeet genoemd?',
        correctAnswer: 'B',
        answers: ['Door lava', 'Door rood stof', 'Door vuur'],
      },
    ],
  },
  {
    name: 'Jupiter',
    description: 'Je moet naar de grootste planeet van allemaal.',
    orbitRadius: 2200,
    orbitSpeed: 0.00001,
    questions: [
      {
        question: 'Wat is de grootste planeet in ons zonnestelsel?',
        correctAnswer: 'C',
        answers: ['Mars', 'Venus', 'Jupiter'],
      },
      {
        question: 'Wat is bijzonder aan Jupiter?',
        correctAnswer: 'C',
        answers: [
          'Hij heeft ringen',
          'Hij is klein',
          'Hij is de grootste planeet',
        ],
      },
    ],
  },
  {
    name: 'Saturnus',
    description: 'Je moet naar de planet met een grote ring om heen.',
    orbitRadius: 2750,
    orbitSpeed: 0.000007,
    questions: [
      {
        question: 'Wat heeft Saturnus rondom zijn planeet?',
        correctAnswer: 'B',
        answers: ['Grote Vlekken', 'Ringen', 'Rivieren'],
      },
      {
        question: 'Waar bestaan de ringen van Saturnus uit?',
        correctAnswer: 'B',
        answers: ['Gas', 'IJs en steen', 'Water'],
      },
    ],
  },
  {
    name: 'Uranus',
    description: 'Je moet naar de lichtblauw planet.',
    orbitRadius: 3200,
    orbitSpeed: 0.000005,
    questions: [
      {
        question: 'Hoe draait Uranus, anders dan de andere planeten?',
        correctAnswer: 'A',
        answers: ['Op zijn zijkant', 'Heel snel', 'Achteruit'],
      },
      {
        question: 'Wat maakt Uranus anders dan andere planeten?',
        correctAnswer: 'A',
        answers: ['Hij ligt op zijn zij', 'Hij is rood', 'Hij heeft lava'],
      },
    ],
  },
  {
    name: 'Neptunus',
    description: 'Je moet naar de koudste planet.',
    orbitRadius: 3600,
    orbitSpeed: 0.000004,
    questions: [
      {
        question: 'Welke planeet staat het verst van de Zon?',
        correctAnswer: 'A',
        answers: ['Neptunus', 'Uranus', 'Venus'],
      },
      {
        question: 'Waarom is Neptunus zo koud?',
        correctAnswer: 'A',
        answers: [
          'Omdat hij ver van de Zon staat',
          'Omdat hij vuur heeft',
          'Omdat hij dicht bij de Zon staat',
        ],
      },
    ],
  },
];
