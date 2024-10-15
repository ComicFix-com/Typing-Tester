import React from 'react';
import TypingTester from '@/components/TypingTester';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-[#4A90E2] mb-8 font-['Montserrat']">Typing Tester</h1>
      <TypingTester />
    </div>
  );
};

export default Index;