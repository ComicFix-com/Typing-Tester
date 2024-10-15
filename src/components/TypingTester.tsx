import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FaPlay, FaRedo, FaDonate, FaClock, FaKeyboard, FaBullseye, FaLightbulb } from 'react-icons/fa';

const TypingTester = () => {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const [showTip, setShowTip] = useState(false);
  const tips = [
    "Practice regularly to improve your typing speed.",
    "Focus on accuracy first, speed will follow.",
    "Use all your fingers and practice touch typing.",
    "Take short breaks to avoid fatigue.",
    "Try to look at the screen instead of your keyboard."
  ];

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (input === text) {
      endTest();
    }
  }, [input, text]);

  const startTest = () => {
    setIsRunning(true);
    setInput('');
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setShowResults(false);
    if (inputRef.current) inputRef.current.focus();
    setShowTip(false);
  };

  // ... keep existing code (other functions)

  const handleShowTip = () => {
    setShowTip(true);
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="bg-opacity-30 bg-black">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center">Premium Typing Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <p className="text-base md:text-lg font-medium bg-white bg-opacity-10 p-3 md:p-4 rounded-lg">{text}</p>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={!isRunning || showResults}
          className="w-full p-2 md:p-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70"
          placeholder="Start typing here..."
        />
        <div className="flex flex-wrap justify-between text-xs md:text-sm font-medium">
          <span className="flex items-center mb-2 md:mb-0"><FaClock className="mr-1 md:mr-2" /> Time: {timer}s</span>
          <span className="flex items-center mb-2 md:mb-0"><FaKeyboard className="mr-1 md:mr-2" /> WPM: {wpm}</span>
          <span className="flex items-center"><FaBullseye className="mr-1 md:mr-2" /> Accuracy: {accuracy}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between bg-opacity-30 bg-black p-3 md:p-4">
        <Button 
          onClick={startTest} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 md:px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-2 md:mb-0"
        >
          {isRunning ? <><FaRedo className="mr-1 md:mr-2" /> Restart</> : <><FaPlay className="mr-1 md:mr-2" /> Start</>}
        </Button>
        <Button 
          onClick={handleDonation} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 md:px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-2 md:mb-0"
        >
          <FaDonate className="mr-1 md:mr-2" /> Donate
        </Button>
        <Button
          onClick={handleShowTip}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 md:px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaLightbulb className="mr-1 md:mr-2" /> Tip
        </Button>
      </CardFooter>
      {showResults && (
        <div className="p-4 md:p-6 bg-white bg-opacity-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4">Results</h3>
          <p className="text-base md:text-lg text-center">Words per minute: {wpm}</p>
          <p className="text-base md:text-lg text-center">Accuracy: {accuracy}%</p>
        </div>
      )}
      {showTip && (
        <div className="p-4 md:p-6 bg-white bg-opacity-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4">Typing Tip</h3>
          <p className="text-base md:text-lg text-center">{getRandomTip()}</p>
        </div>
      )}
    </Card>
  );
};

export default TypingTester;
