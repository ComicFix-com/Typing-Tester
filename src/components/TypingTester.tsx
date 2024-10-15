import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FaPlay, FaRedo, FaDonate, FaClock, FaKeyboard, FaBullseye } from 'react-icons/fa';

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
  };

  const endTest = () => {
    setIsRunning(false);
    calculateResults();
    setShowResults(true);
  };

  const calculateResults = () => {
    const words = text.split(' ').length;
    const characters = text.length;
    const timeInMinutes = timer / 60;
    const calculatedWpm = Math.round(words / timeInMinutes);
    const correctCharacters = input.split('').filter((char, index) => char === text[index]).length;
    const calculatedAccuracy = Math.round((correctCharacters / characters) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) setIsRunning(true);
    setInput(e.target.value);
  };

  const handleDonation = () => {
    window.open('upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=99&tn=supporting comicfix community by using Typing Tester', '_blank');
    toast({
      title: "Thank you for your support!",
      description: "Your donation helps the ComicFix community.",
    });
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="bg-opacity-30 bg-black">
        <CardTitle className="text-3xl font-bold text-center">Premium Typing Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <p className="text-lg font-medium bg-white bg-opacity-10 p-4 rounded-lg">{text}</p>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={!isRunning || showResults}
          className="w-full p-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70"
          placeholder="Start typing here..."
        />
        <div className="flex justify-between text-sm font-medium">
          <span className="flex items-center"><FaClock className="mr-2" /> Time: {timer}s</span>
          <span className="flex items-center"><FaKeyboard className="mr-2" /> WPM: {wpm}</span>
          <span className="flex items-center"><FaBullseye className="mr-2" /> Accuracy: {accuracy}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-opacity-30 bg-black p-4">
        <Button 
          onClick={startTest} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isRunning ? <><FaRedo className="mr-2" /> Restart</> : <><FaPlay className="mr-2" /> Start</>}
        </Button>
        <Button 
          onClick={handleDonation} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaDonate className="mr-2" /> Donate
        </Button>
      </CardFooter>
      {showResults && (
        <div className="p-6 bg-white bg-opacity-10">
          <h3 className="text-2xl font-bold text-center mb-4">Results</h3>
          <p className="text-lg text-center">Words per minute: {wpm}</p>
          <p className="text-lg text-center">Accuracy: {accuracy}%</p>
        </div>
      )}
    </Card>
  );
};

export default TypingTester;
