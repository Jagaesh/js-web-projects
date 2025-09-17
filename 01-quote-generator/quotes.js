// const apiUrl = 'https://zenquotes.io/api/quotes';

const localQuotes = [
  {
    "text": "We cannot change anything unless we accept it.",
    "author": "Carl Jung",
    "tag": "general"
  },
  {
    "text": "The soul should always stand ajar, ready to welcome the ecstatic experience.",
    "author": "Emily Dickinson",
    "tag": "general"
  },
  {
    "text": "If anything is worth doing, do it with all your heart.",
    "author": "Buddha",
    "tag": "general"
  },
  {
    "text": "Life is like a wheel. Sooner or later, it always comes around to where you started again.",
    "author": "Stephen King",
    "tag": "general"
  },
  {
    "text": "Focused, hard work is the real key to success.",
    "author": "John Carmack",
    "tag": "general"
  },
  {
    "text": "Good entrepreneurs don't fail because they stay at it.",
    "author": "Naval Ravikant",
    "tag": "general"
  },
  {
    "text": "There are dark shadows on the earth, but its lights are stronger in the contrast.",
    "author": "Charles Dickens",
    "tag": "general"
  },
  {
    "text": "A gentleman is one who puts more into the world than he takes out.",
    "author": "George Bernard Shaw",
    "tag": "general"
  },
  {
    "text": "Your business is not to 'get somewhere' - it is to be here.",
    "author": "Dan Millman",
    "tag": "general"
  },
  {
    "text": "The way to get started is to quit talking and begin doing.",
    "author": "Walt Disney",
    "tag": "general"
  },
  {
    "text": "Opportunity often comes disguised in the form of misfortune or temporary defeat.",
    "author": "Napoleon Hill",
    "tag": "general"
  },
  {
    "text": "The key to immortality is first living a life worth remembering.",
    "author": "Bruce Lee",
    "tag": "general"
  },
  {
    "text": "If there were no God, there would be no atheists.",
    "author": "Gilbert Chesterton",
    "tag": "general"
  },
  {
    "text": "Shoot for the moon, because even if you miss, you'll land among the stars.",
    "author": "Les Brown",
    "tag": "general"
  },
  {
    "text": "There are two primary choices in life: to accept conditions as they exist, or accept the responsibility for changing them.",
    "author": "Denis Waitley",
    "tag": "general"
  },
  {
    "text": "Happiness comes when you believe in what you are doing, know what you are doing, and love what you are doing.",
    "author": "Brian Tracy",
    "tag": "general"
  },
  {
    "text": "One small positive thought can change your whole day.",
    "author": "Zig Ziglar",
    "tag": "general"
  },
  {
    "text": "It is children only who enjoy the present; their elders either live on the memory of the past or the hope of the future.",
    "author": "Nicolas Chamfort",
    "tag": "general"
  },
  {
    "text": "Conquer the devils with a little thing called love.",
    "author": "Bob Marley",
    "tag": "general"
  },
  {
    "text": "Behind every beautiful thing, there's some kind of pain.",
    "author": "Bob Dylan",
    "tag": "general"
  },
  {
    "text": "Behind every cloud is another cloud.",
    "author": "Judy Garland",
    "tag": "general"
  },
  {
    "text": "The Art of Peace begins with you.",
    "author": "Morihei Ueshiba",
    "tag": "general"
  },
  {
    "text": "What most people need to learn in life is how to love people and use things instead of using people and loving things.",
    "author": "Unknown",
    "tag": "general"
  },
  {
    "text": "Decide whether or not the goal is worth the risks involved. If it is, stop worrying.",
    "author": "Amelia Earhart",
    "tag": "general"
  },
  {
    "text": "However difficult life may seem, there is always something you can do and succeed at.",
    "author": "Stephen Hawking",
    "tag": "general"
  },
  {
    "text": "Enjoy life. There's plenty of time to be dead.",
    "author": "Hans Christian Andersen",
    "tag": "general"
  },
  {
    "text": "A self that goes on changing is a self that goes on living.",
    "author": "Virginia Woolf",
    "tag": "general"
  },
  {
    "text": "The road to success is always under construction.",
    "author": "Lily Tomlin",
    "tag": "general"
  },
  {
    "text": "It is only depth of character that determines the profundity with which we face life.",
    "author": "Ming-Dao Deng",
    "tag": "general"
  },
  {
    "text": "Our greatest glory is not in never falling, but in rising every time we fall.",
    "author": "Confucius",
    "tag": "general"
  },
  {
    "text": "You just can't beat the person who never gives up.",
    "author": "Babe Ruth",
    "tag": "general"
  },
  {
    "text": "Judgments prevent us from seeing the good that lies beyond appearances.",
    "author": "Wayne Dyer",
    "tag": "general"
  },
  {
    "text": "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    "author": "Marilyn Monroe",
    "tag": "general"
  },
  {
    "text": "Good things aren't supposed to just fall into your lap.",
    "author": "Audrey Hepburn",
    "tag": "general"
  },
  {
    "text": "Knowing yourself is the beginning of all wisdom.",
    "author": "Aristotle",
    "tag": "general"
  },
  {
    "text": "We are all in the gutter, but some of us are looking at the stars.",
    "author": "Oscar Wilde",
    "tag": "general"
  },
  {
    "text": "The tragedy of life doesn't lie in not reaching your goal. The tragedy lies in having no goals to reach.",
    "author": "Benjamin Mays",
    "tag": "general"
  },
  {
    "text": "If the only prayer you ever say in your entire life is thank you, it will be enough.",
    "author": "Meister Eckhart",
    "tag": "general"
  },
  {
    "text": "Silence is sometimes the best answer.",
    "author": "Dalai Lama",
    "tag": "general"
  },
  {
    "text": "Even though you are on the right track - you will get run over if you just sit there.",
    "author": "Will Rogers",
    "tag": "general"
  },
  {
    "text": "Men go to far greater lengths to avoid what they fear than to obtain what they desire.",
    "author": "Dan Brown",
    "tag": "general"
  },
  {
    "text": "Only the educated are free.",
    "author": "Epictetus",
    "tag": "general"
  },
  {
    "text": "Do all things with love.",
    "author": "Og Mandino",
    "tag": "general"
  },
  {
    "text": "Unless you change how you are, you will always have what you got.",
    "author": "Jim Rohn",
    "tag": "general"
  },
  {
    "text": "If you take responsibility for yourself you will develop a hunger to accomplish your dream.",
    "author": "Les Brown",
    "tag": "general"
  },
  {
    "text": "If you truly love Nature, you will find beauty everywhere.",
    "author": "Vincent van Gogh",
    "tag": "general"
  },
  {
    "text": "Failure will never overtake me if my determination to succeed is strong enough.",
    "author": "Og Mandino",
    "tag": "general"
  },
  {
    "text": "Learning never exhausts the mind.",
    "author": "Leonardo da Vinci",
    "tag": "general"
  },
  {
    "text": "If the happiness and prosperity of other people depend on you, you have nothing to fear anymore.",
    "author": "Robert Greene",
    "tag": "general"
  },
  {
    "text": "Few things are more deceptive than memories.",
    "author": "Carlos Ruiz Zafon",
    "tag": "general"
  }
];
