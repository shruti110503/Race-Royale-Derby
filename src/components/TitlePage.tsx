import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Flag, Star } from "lucide-react";
import { useGame } from "@/context/GameContext";

const TitlePage = () => {
  const { setPhase } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce">🏇</div>
        <div className="absolute top-40 right-32 text-4xl opacity-30 animate-pulse">🏆</div>
        <div className="absolute bottom-32 left-16 text-5xl opacity-25 animate-bounce delay-1000">⭐</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-pulse delay-500">🎯</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-4">
        <div className="text-8xl mb-6 animate-bounce leading-none">🏇</div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-6 drop-shadow-2xl tracking-wide leading-tight">
          RACE ROYALE
        </h1>
        
        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 drop-shadow-lg leading-relaxed">
          DERBY
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl mb-12 max-w-2xl mx-auto border border-white/20">
          <p className="text-lg md:text-xl lg:text-2xl text-white font-semibold mb-4 leading-relaxed">
            🎯 The Ultimate Horse Racing Experience
          </p>
          <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
            Choose your champion, place your bets, and win big!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-yellow-400">
              <Trophy className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-semibold text-sm md:text-base">Premium Racing</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Flag className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-semibold text-sm md:text-base">Live Action</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Star className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-semibold text-sm md:text-base">Big Payouts</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => setPhase('instructions')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-lg md:text-xl lg:text-2xl px-8 md:px-12 py-4 md:py-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 font-bold"
          >
            <Trophy className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            START RACING
          </Button>
          
          <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed px-4">
            💰 Place your bets wisely and become the champion! 💰
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
