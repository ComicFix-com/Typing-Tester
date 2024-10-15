import React from 'react';
import TypingTester from '@/components/TypingTester';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#4A90E2] mb-6 md:mb-8 font-['Montserrat']">Typing Tester</h1>
      <div className="w-full max-w-2xl">
        <TypingTester />
      </div>
    </div>
  );
};

export default Index;