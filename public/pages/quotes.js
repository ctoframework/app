import "../components/externallink.js";

const quotes = [
  "Management is doing things right; leadership is doing the right things.",
  "The secret of getting ahead is getting started.",
  "The art of management is the ability to select people and delegate tasks.",
  "Success in management requires learning as fast as the world is changing.",
  "The best leaders are those most interested in surrounding themselves with assistants and associates smarter than they are.",
  "Good management consists in showing average people how to do the work of superior people.",
  "A manager is responsible for the application and performance of knowledge.",
  "The conventional definition of management is getting work done through people, but real management is developing people through work.",
  "Management is nothing more than motivating other people.",
  "The key to successful leadership today is influence, not authority.",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const page = {
  title: "CTO Quotes",
  getData: function () {
    return { quote: getRandomQuote() };
  },
};

export default page;
