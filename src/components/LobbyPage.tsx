import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Timer, Trophy, Star } from "lucide-react";
import { useGame } from "@/context/GameContext";

const LobbyPage = () => {
  const { setPhase, balance } = useGame();

  const races = [
    {
      id: 1,
      title: "The Derby Classic",
      description: "The premier race of the season! Six of the finest horses compete for glory.",
      icon: "🏆",
      difficulty: "Elite",
      prize: "$5,000",
      color: "from-yellow-500 to-orange-600",
      features: ["Premium Horses", "High Stakes", "Maximum Glory"]
    },
    {
      id: 2,
      title: "Champions Stakes",
      description: "An elite race with the highest stakes and most prestigious horses.",
      icon: "👑",
      difficulty: "Expert",
      prize: "$3,500",
      color: "from-purple-500 to-pink-600",
      features: ["Elite Competition", "Big Payouts", "Championship Level"]
    },
    {
      id: 3,
      title: "Speed Demon Sprint",
      description: "A fast-paced race for the speediest horses. Pure adrenaline!",
      icon: "⚡",
      difficulty: "Advanced",
      prize: "$2,000",
      color: "from-red-500 to-orange-500",
      features: ["Lightning Fast", "Quick Races", "Speed Focus"]
    },
    {
      id: 4,
      title: "Endurance Challenge",
      description: "Endurance is key in this lengthy race. Only the strongest will prevail.",
      icon: "💪",
      difficulty: "Hard",
      prize: "$2,500",
      color: "from-green-500 to-emerald-600",
      features: ["Stamina Test", "Long Distance", "Endurance Focus"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-3 leading-tight">
              🏁 Racing Lobby
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">Choose your race and make your fortune!</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 md:px-8 py-4 shadow-xl border border-white/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2 leading-none">💰</div>
                <div className="text-white text-base md:text-lg font-semibold leading-tight">Your Balance</div>
                <div className="text-2xl md:text-3xl font-bold text-green-400 leading-tight">${balance}</div>
              </div>
            </div>
            
            <Button 
              onClick={() => setPhase('instructions')}
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              📖 How to Play
            </Button>
          </div>
        </div>

        {/* Race Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {races.map((race) => (
            <Card 
              key={race.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer group"
              onClick={() => setPhase('selection')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${race.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform leading-none`}>
                    {race.icon}
                  </div>
                  <div className="text-right">
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-green-500/30">
                      {race.prize} Prize Pool
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-white text-xl md:text-2xl font-bold mb-3 leading-tight">
                  {race.title}
                </CardTitle>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${race.color} text-white`}>
                    {race.difficulty}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-white/90 text-base md:text-lg mb-6 leading-relaxed">
                  {race.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    Race Features:
                  </h4>
                  {race.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/80 text-sm md:text-base">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  className={`w-full bg-gradient-to-r ${race.color} hover:scale-105 transition-all duration-300 text-white font-bold text-base md:text-lg py-3 shadow-lg`}
                  onClick={() => setPhase('selection')}
                >
                  <Flag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Enter Race
                  <Timer className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <div className="text-xl md:text-2xl mb-2 leading-none">🏇</div>
            <div className="text-white font-semibold text-sm md:text-base leading-tight">6 Horses</div>
            <div className="text-white/70 text-xs md:text-sm leading-tight">Per Race</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <div className="text-xl md:text-2xl mb-2 leading-none">⚡</div>
            <div className="text-white font-semibold text-sm md:text-base leading-tight">Live Action</div>
            <div className="text-white/70 text-xs md:text-sm leading-tight">Real-time Racing</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <div className="text-xl md:text-2xl mb-2 leading-none">💎</div>
            <div className="text-white font-semibold text-sm md:text-base leading-tight">Big Payouts</div>
            <div className="text-white/70 text-xs md:text-sm leading-tight">Up to 10:1 Odds</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <div className="text-xl md:text-2xl mb-2 leading-none">🎯</div>
            <div className="text-white font-semibold text-sm md:text-base leading-tight">Fair Play</div>
            <div className="text-white/70 text-xs md:text-sm leading-tight">Skill + Luck</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
