import React from 'react';
import { Button } from "@/components/ui/button";
import { Flag, ArrowRight, Trophy, Target, Eye, Gift } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InstructionsPage = () => {
  const { setPhase } = useGame();

  const instructions = [
    {
      icon: "🐴",
      title: "Choose Your Champion",
      description: "Select from six unique horses, each with different speed and stamina stats. Examine the odds and make your selection wisely.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: "💰",
      title: "Place Your Bet",
      description: "Put your money where your confidence is! Place bets on your chosen horse. Higher odds mean bigger payouts, but lower chances of winning.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "🏁",
      title: "Watch the Race",
      description: "Witness the thrilling race unfold in real-time! Each horse's performance is influenced by their speed, stamina, and a touch of randomness.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: "🏆",
      title: "Claim Victory",
      description: "If your horse crosses the finish line first, you win! Your payout is determined by your bet amount and the horse's odds.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🔄",
      title: "Keep Racing",
      description: "Win or lose, the excitement never ends! Head back to the lobby to place new bets and join another race. Can you build your fortune?",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">🏇</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            How To Play
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-xl text-white font-semibold">
              Master the art of horse racing and betting! 🎯
            </p>
          </div>
        </div>

        {/* Instructions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {instructions.map((instruction, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-xl">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${instruction.color} flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg`}>
                  {instruction.icon}
                </div>
                <CardTitle className="text-white text-xl text-center font-bold">
                  Step {index + 1}: {instruction.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 text-center leading-relaxed">
                  {instruction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center flex items-center justify-center gap-2">
              <Target className="w-8 h-8 text-yellow-400" />
              Pro Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">⚡</span>
                  <span><strong>Speed vs Stamina:</strong> Fast horses lead early, but stamina wins long races!</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">📊</span>
                  <span><strong>Study the Odds:</strong> Lower odds = higher chance to win, but smaller payouts.</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">💡</span>
                  <span><strong>Manage Your Bankroll:</strong> Don't bet everything on one race!</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">🎲</span>
                  <span><strong>Embrace the Randomness:</strong> Even favorites can lose - that's racing!</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            onClick={() => setPhase('lobby')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl px-12 py-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300 font-bold"
          >
            <Flag className="w-6 h-6 mr-3" />
            Let's Race!
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          
          <div className="text-white/70 text-lg">
            Ready to become a racing legend? 🏆
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
