import React, { useEffect, useState } from 'react';
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flag, Trophy, Timer, Volume2 } from "lucide-react";

const RacePage = () => {
  const { 
    horses, 
    selectedHorse, 
    betAmount, 
    raceComplete, 
    winner, 
    setPhase, 
    startRace 
  } = useGame();

  const [countdown, setCountdown] = useState(3);
  const [raceStarted, setRaceStarted] = useState(false);
  const [commentary, setCommentary] = useState("Welcome to the Derby! Horses are loading into the starting gate...");
  const [currentLeader, setCurrentLeader] = useState<any>(null);

  // Commentary phrases for different race situations
  const commentaryPhrases = [
    "And they're off! What a fantastic start!",
    "The field is tightly packed as they round the first turn!",
    "It's anyone's race at this point!",
    "The pace is heating up as we approach the halfway mark!",
    "What an incredible battle for the lead!",
    "The crowd is on their feet!",
    "This is turning into a classic derby finish!",
    "Down the home stretch they come!"
  ];

  const finishCommentary = [
    "What a thrilling finish!",
    "An absolutely spectacular race!",
    "Derby magic at its finest!",
    "The crowd goes wild!"
  ];

  // Start countdown and race
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setRaceStarted(true);
          startRace();
          setCommentary("And they're off! The race has begun!");
          clearInterval(countdownTimer);
          return 0;
        }
        setCommentary(`Horses ready... ${prev - 1}...`);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [startRace]);

  // Dynamic commentary during race
  useEffect(() => {
    if (!raceStarted || raceComplete) return;

    const commentaryTimer = setInterval(() => {
      const leader = horses.reduce((prev, current) => 
        current.position > prev.position ? current : prev
      );
      
      setCurrentLeader(leader);
      
      const randomPhrase = commentaryPhrases[Math.floor(Math.random() * commentaryPhrases.length)];
      setCommentary(`${randomPhrase} ${leader.name} is leading the pack!`);
    }, 3000);

    return () => clearInterval(commentaryTimer);
  }, [raceStarted, horses, raceComplete]);

  // Handle race completion
  useEffect(() => {
    if (raceComplete && winner) {
      const finalCommentary = finishCommentary[Math.floor(Math.random() * finishCommentary.length)];
      setCommentary(`${finalCommentary} ${winner.name} wins the derby!`);
      
      setTimeout(() => {
        setPhase('results');
      }, 4000);
    }
  }, [raceComplete, winner, setPhase]);

  // Enhanced Horse Component with better animations
  const EnhancedHorseInRace = ({ horse, position }: { horse: any; position: number }) => {
    const isSelected = selectedHorse?.id === horse.id;
    const isLeading = currentLeader?.id === horse.id;
    
    return (
      <div className={`relative mb-4 p-4 rounded-xl transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400 shadow-xl scale-105' 
          : isLeading
          ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400'
          : 'bg-white/10 backdrop-blur-sm border border-white/20'
      }`}>
        {/* Horse Info Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Starting Gate Effect */}
              {!raceStarted && (
                <div className="absolute inset-0 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{position + 1}</span>
                </div>
              )}
              
              {/* Horse Avatar */}
              <div 
                className={`w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-3xl font-bold text-white border-3 transition-all duration-200 ${
                  raceStarted ? 'animate-pulse' : ''
                }`}
                style={{ 
                  background: `linear-gradient(135deg, ${horse.color}, ${horse.color}dd)`,
                  borderColor: `${horse.color}aa`,
                  transform: raceStarted ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                🐎
              </div>
              
              {/* Position Badge */}
              {raceStarted && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                  #{position + 1}
                </div>
              )}
              
              {/* Special Badges */}
              {isSelected && (
                <div className="absolute -bottom-2 -left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-bounce">
                  YOUR PICK
                </div>
              )}
              
              {isLeading && raceStarted && (
                <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
                  LEADER
                </div>
              )}
            </div>
            
            <div>
              <h3 className={`text-xl font-bold transition-colors ${
                isSelected ? 'text-yellow-400' : isLeading ? 'text-green-400' : 'text-white'
              }`}>
                {horse.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>Gate {position + 1}</span>
                <span>Odds: {horse.odds}:1</span>
                <span className="flex items-center gap-1">
                  Speed: {horse.speed}/10
                  {horse.speed >= 9 && <span className="text-red-400">🔥</span>}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {Math.round(horse.position)}%
            </div>
            <div className="text-sm text-white/70">Distance</div>
          </div>
        </div>
        
        {/* Enhanced Race Track */}
        <div className="relative">
          {/* Track Background */}
          <div className="h-12 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full overflow-hidden border-4 border-amber-700 shadow-inner relative">
            {/* Track Texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            {/* Horse Progress */}
            <div 
              className="h-full transition-all duration-200 ease-out flex items-center justify-end pr-4 relative overflow-hidden"
              style={{ 
                width: `${Math.max(8, horse.position)}%`,
                background: `linear-gradient(90deg, ${horse.color}66, ${horse.color}, ${horse.color}dd)`,
                boxShadow: `0 0 20px ${horse.color}88, inset 0 2px 4px rgba(255,255,255,0.3)`
              }}
            >
              {/* Animated Horse */}
              <div className={`text-white text-2xl transition-all duration-200 ${
                raceStarted ? 'animate-bounce' : ''
              }`}>
                🐎
              </div>
              
              {/* Speed Lines Effect */}
              {raceStarted && horse.position > 10 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
              )}
              
              {/* Near Finish Effect */}
              {horse.position > 90 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-yellow-400/40 animate-pulse"></div>
              )}
            </div>
          </div>
          
          {/* Finish Line */}
          <div className="absolute right-0 top-0 h-12 w-2 bg-gradient-to-b from-white via-black to-white opacity-80 rounded-r-full"></div>
          
          {/* Distance Markers */}
          <div className="absolute top-0 left-1/4 h-12 w-0.5 bg-white/30"></div>
          <div className="absolute top-0 left-1/2 h-12 w-0.5 bg-white/40"></div>
          <div className="absolute top-0 left-3/4 h-12 w-0.5 bg-white/50"></div>
        </div>
        
        {/* Horse Stats During Race */}
        {raceStarted && (
          <div className="flex justify-between mt-3 text-xs text-white/70">
            <span>Current Speed: {Math.round(horse.speed + Math.random() * 2)}/10</span>
            <span>Stamina: {Math.max(1, horse.stamina - Math.floor(horse.position / 20))}/10</span>
            <span>Form: {horse.form >= 8 ? 'Excellent' : horse.form >= 6 ? 'Good' : 'Average'}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-bounce delay-100">🏇</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse delay-300">🏆</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-500">🎯</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-700">⭐</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Race Header */}
        <div className="text-center mb-8">
          {!raceStarted ? (
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
                🏁 DERBY STARTING 🏁
              </h1>
              <div className="text-8xl font-bold text-yellow-400 animate-bounce">
                {countdown}
              </div>
              <p className="text-2xl text-white/90">Horses are in the gate...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white flex items-center justify-center gap-4">
                <Flag className="w-12 h-12 text-green-400 animate-wave" />
                LIVE DERBY RACE
                <Flag className="w-12 h-12 text-green-400 animate-wave" />
              </h1>
              {!raceComplete && (
                <div className="flex items-center justify-center gap-2 text-xl text-white/90">
                  <Timer className="w-6 h-6 animate-spin" />
                  Race in Progress
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Commentary Box */}
        <Card className="bg-black/50 backdrop-blur-md border-yellow-400 border-2 shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-bold text-lg">LIVE COMMENTARY</span>
              </div>
              <div className="flex-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent h-px"></div>
            </div>
            <p className="text-white text-xl font-semibold mt-4 leading-relaxed">
              📢 {commentary}
            </p>
          </CardContent>
        </Card>

        {/* Your Bet Info */}
        {selectedHorse && (
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-blue-400 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-3xl border-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedHorse.color}, ${selectedHorse.color}dd)`,
                      borderColor: `${selectedHorse.color}aa`
                    }}
                  >
                    🐎
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400">Your Champion</h3>
                    <p className="text-xl text-white font-semibold">{selectedHorse.name}</p>
                    <p className="text-white/80">Gate {horses.findIndex(h => h.id === selectedHorse.id) + 1} • {selectedHorse.odds}:1 odds</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-white/80">Your Bet</div>
                  <div className="text-3xl font-bold text-green-400">${betAmount}</div>
                  <div className="text-lg text-white/80">
                    Win: <span className="text-yellow-400 font-bold">${(betAmount * selectedHorse.odds).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Race Track */}
        <Card className="bg-black/30 backdrop-blur-md border-white/20 shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                🏇 Derby Track
              </h2>
              <div className="text-white/80 text-lg">
                {raceStarted ? `${horses.filter(h => h.position >= 100).length}/8 Finished` : "Ready to Start"}
              </div>
            </div>
            
            <div className="space-y-4">
              {horses
                .sort((a, b) => b.position - a.position)
                .map((horse, index) => (
                  <EnhancedHorseInRace 
                    key={horse.id} 
                    horse={horse} 
                    position={horses.findIndex(h => h.id === horse.id)}
                  />
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Race Complete */}
        {raceComplete && winner && (
          <div className="text-center">
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-0 shadow-2xl mx-auto max-w-2xl animate-pulse">
              <CardContent className="p-8">
                <Trophy className="w-20 h-20 mx-auto mb-4 text-white animate-bounce" />
                <h2 className="text-4xl font-bold text-white mb-4">🏆 DERBY WINNER! 🏆</h2>
                <p className="text-3xl text-white font-bold mb-2">{winner.name}</p>
                <p className="text-xl text-white/90 mb-4">
                  Gate {horses.findIndex(h => h.id === winner.id) + 1} • {winner.odds}:1 odds
                </p>
                
                {selectedHorse && selectedHorse.id === winner.id ? (
                  <div className="bg-white/20 rounded-xl p-6 mt-6">
                    <div className="text-3xl font-bold text-white mb-2">🎉 CONGRATULATIONS! 🎉</div>
                    <div className="text-2xl text-white">You Won: ${(betAmount * selectedHorse.odds).toFixed(2)}</div>
                  </div>
                ) : (
                  <div className="bg-black/20 rounded-xl p-6 mt-6">
                    <div className="text-xl text-white/90">Better luck next time!</div>
                    <div className="text-lg text-white/70">Your horse finished in position {horses.sort((a, b) => b.position - a.position).findIndex(h => h.id === selectedHorse?.id) + 1}</div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => setPhase('results')}
              className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-2xl px-12 py-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
            >
              <Trophy className="w-8 h-8 mr-3" />
              View Full Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RacePage;
