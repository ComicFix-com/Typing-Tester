import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
    <Card className="w-full max-w-2xl bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-['Roboto'] text-[#4A90E2]">Test Your Typing Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-['Open Sans'] text-gray-700 mb-4">{text}</p>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={!isRunning || showResults}
          className="w-full p-2 border rounded"
          placeholder="Start typing here..."
        />
        <div className="flex justify-between text-sm font-['Lato']">
          <span>Time: {timer}s</span>
          <span>WPM: {wpm}</span>
          <span>Accuracy: {accuracy}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={startTest} className="bg-[#50E3C2] hover:bg-[#3AC7A8] text-white">
          {isRunning ? 'Restart' : 'Start'}
        </Button>
        <Button onClick={handleDonation} className="bg-[#4A90E2] hover:bg-[#3A7BC2] text-white">
          Donate
        </Button>
      </CardFooter>
      {showResults && (
        <div className="p-4 bg-gray-100 rounded-b-lg">
          <h3 className="text-xl font-['Montserrat'] text-[#4A90E2] mb-2">Results</h3>
          <p className="font-['Open Sans']">Words per minute: {wpm}</p>
          <p className="font-['Open Sans']">Accuracy: {accuracy}%</p>
        </div>
      )}
    </Card>
  );
};

export default TypingTester;