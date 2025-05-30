import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from "@/context/GameContext";
import { Trophy, ArrowLeft, Flag, Medal, TrendingUp, TrendingDown } from "lucide-react";

const ResultsPage = () => {
  const { winner, horses, selectedHorse, betAmount, balance, setPhase, resetRace } = useGame();

  // Sort horses by position (highest to lowest)
  const sortedHorses = [...horses].sort((a, b) => b.position - a.position);

  const handleGoToLobby = () => {
    resetRace();
    setPhase('lobby');
  };

  const isWinner = selectedHorse && winner && selectedHorse.id === winner.id;
  const winAmount = selectedHorse && winner && selectedHorse.id === winner.id ? betAmount * selectedHorse.odds : 0;

  return (
    <div className={`min-h-screen p-6 ${
      isWinner 
        ? 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900' 
        : 'bg-gradient-to-br from-red-900 via-pink-900 to-purple-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Celebration/Commiseration Header */}
        <div className="text-center mb-12">
          {isWinner ? (
            <div className="space-y-4">
              <div className="text-8xl animate-bounce">🎉</div>
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                CONGRATULATIONS!
              </h1>
              <div className="text-3xl text-white font-bold">You're a Winner! 🏆</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-8xl">😔</div>
              <h1 className="text-5xl font-bold text-white">
                Better Luck Next Time
              </h1>
              <div className="text-2xl text-white/80">Every champion has losses! 💪</div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Race Winner Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Race Winner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <div 
                  className="w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center text-4xl font-bold text-white mb-4 mx-auto border-4 border-yellow-400"
                  style={{ 
                    background: `linear-gradient(135deg, ${winner?.color}, ${winner?.color}dd)`,
                  }}
                >
                  🐎
                </div>
                
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                  {winner?.name}
                </h2>
                
                <div className="space-y-2 text-white">
                  <div className="text-lg">
                    <span className="text-white/70">Odds:</span> 
                    <span className="font-bold text-green-400 ml-2">{winner?.odds}:1</span>
                  </div>
                  <div className="text-lg">
                    <span className="text-white/70">Lane:</span> 
                    <span className="font-bold ml-2">{winner?.lane}</span>
                  </div>
                  <div className="text-lg">
                    <span className="text-white/70">Final Position:</span> 
                    <span className="font-bold ml-2">{Math.round(winner?.position || 0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Bet Result */}
          <Card className={`backdrop-blur-md shadow-2xl ${
            isWinner 
              ? 'bg-green-500/20 border-green-400' 
              : 'bg-red-500/20 border-red-400'
          }`}>
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                {isWinner ? (
                  <>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    Your Victory!
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-8 h-8 text-red-400" />
                    Your Result
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                {isWinner ? (
                  <div className="space-y-4">
                    <div className="text-6xl animate-bounce">🎊</div>
                    <div className="text-3xl font-bold text-green-400">
                      YOU WON!
                    </div>
                    <div className="text-4xl font-bold text-white">
                      +${winAmount.toFixed(2)}
                    </div>
                    <div className="text-lg text-white/80">
                      Your bet: <span className="font-semibold">${betAmount}</span>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/30">
                      <div className="text-white font-semibold">
                        🎯 Perfect prediction! Your champion {selectedHorse?.name} crossed the finish line first!
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl">💔</div>
                    <div className="text-3xl font-bold text-red-400">
                      YOU LOST
                    </div>
                    <div className="text-4xl font-bold text-white">
                      -${betAmount}
                    </div>
                    {selectedHorse && (
                      <div className="bg-red-500/20 rounded-lg p-4 border border-red-400/30">
                        <div className="text-white">
                          <div className="font-semibold mb-2">You bet on: {selectedHorse.name}</div>
                          <div className="text-sm text-white/80">
                            Sometimes the best horse doesn't win - that's the thrill of racing! 🏇
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Race Results Table */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Flag className="w-8 h-8 text-blue-400" />
              Final Race Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 px-4 text-white font-bold">Position</th>
                    <th className="py-4 px-4 text-white font-bold">Horse</th>
                    <th className="py-4 px-4 text-white font-bold">Odds</th>
                    <th className="py-4 px-4 text-white font-bold">Lane</th>
                    <th className="py-4 px-4 text-white font-bold">Final %</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHorses.map((horse, index) => (
                    <tr 
                      key={horse.id} 
                      className={`border-b border-white/10 transition-colors ${
                        selectedHorse?.id === horse.id 
                          ? 'bg-yellow-500/20 border-yellow-400/50' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {index === 0 ? (
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-white" />
                            </div>
                          ) : index === 1 ? (
                            <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <Medal className="w-5 h-5 text-white" />
                            </div>
                          ) : index === 2 ? (
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center">
                              <Medal className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                            style={{ backgroundColor: horse.color }}
                          >
                            🐎
                          </div>
                          <div>
                            <div className={`font-bold ${
                              selectedHorse?.id === horse.id ? 'text-yellow-400' : 'text-white'
                            }`}>
                              {horse.name}
                            </div>
                            {selectedHorse?.id === horse.id && (
                              <div className="text-xs text-yellow-400 font-semibold">
                                ⭐ Your Pick
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white font-semibold">{horse.odds}:1</td>
                      <td className="py-4 px-4 text-white">{horse.lane}</td>
                      <td className="py-4 px-4 text-white font-bold">{Math.round(horse.position)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Current Balance */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-lg text-white/80 mb-2">Your Current Balance</div>
              <div className="text-4xl font-bold text-green-400">${balance}</div>
              <div className="text-sm text-white/60 mt-2">
                {isWinner ? 'Great win! Keep the momentum going!' : 'Ready for your comeback?'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setPhase('selection')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
            >
              <Trophy className="w-6 h-6 mr-2" />
              Race Again
            </Button>
            
            <Button 
              onClick={handleGoToLobby}
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-black text-xl px-8 py-4 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Lobby
            </Button>
          </div>
          
          <div className="text-white/70 text-lg">
            {isWinner 
              ? '🎉 Congratulations on your victory! Will you try for another win?' 
              : '💪 Every great jockey has losses. Your next win is just a race away!'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
