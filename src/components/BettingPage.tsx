import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Award, Users, Clock } from "lucide-react";
import { useGame, BetType, Bet } from "@/context/GameContext";
import { toast } from "sonner";

const BettingPage = () => {
  const { 
    horses, 
    setPhase, 
    selectedContest, 
    currentBets, 
    setCurrentBets, 
    balance, 
    setBalance 
  } = useGame();

  const [selectedBetType, setSelectedBetType] = useState<BetType>('win');
  const [selectedHorses, setSelectedHorses] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<number>(10);

  const betTypes = [
    { type: 'win' as BetType, name: 'Win', description: 'Pick the winner', minHorses: 1, maxHorses: 1, multiplier: 'Odds' },
    { type: 'place' as BetType, name: 'Place', description: 'Finish 1st or 2nd', minHorses: 1, maxHorses: 1, multiplier: '1.5x' },
    { type: 'show' as BetType, name: 'Show', description: 'Finish 1st, 2nd, or 3rd', minHorses: 1, maxHorses: 1, multiplier: '1.2x' },
    { type: 'exacta' as BetType, name: 'Exacta', description: 'Pick 1st & 2nd in order', minHorses: 2, maxHorses: 2, multiplier: '15x' },
    { type: 'trifecta' as BetType, name: 'Trifecta', description: 'Pick 1st, 2nd & 3rd in order', minHorses: 3, maxHorses: 3, multiplier: '50x' },
    { type: 'superfecta' as BetType, name: 'Superfecta', description: 'Pick 1st-4th in order', minHorses: 4, maxHorses: 4, multiplier: '200x' }
  ];

  const currentBetType = betTypes.find(bt => bt.type === selectedBetType)!;

  const handleHorseSelection = (horseId: number) => {
    if (selectedHorses.includes(horseId)) {
      setSelectedHorses(selectedHorses.filter(id => id !== horseId));
    } else {
      if (selectedHorses.length < currentBetType.maxHorses) {
        setSelectedHorses([...selectedHorses, horseId]);
      } else {
        setSelectedHorses([...selectedHorses.slice(1), horseId]);
      }
    }
  };

  const calculatePotentialPayout = (): number => {
    if (selectedHorses.length !== currentBetType.minHorses) return 0;
    
    switch (selectedBetType) {
      case 'win':
        const horse = horses.find(h => h.id === selectedHorses[0]);
        return horse ? betAmount * horse.odds : 0;
      case 'place':
        return betAmount * 1.5;
      case 'show':
        return betAmount * 1.2;
      case 'exacta':
        return betAmount * 15;
      case 'trifecta':
        return betAmount * 50;
      case 'superfecta':
        return betAmount * 200;
      default:
        return 0;
    }
  };

  const placeBet = () => {
    if (selectedHorses.length !== currentBetType.minHorses) {
      toast.error(`Please select ${currentBetType.minHorses} horse(s) for ${currentBetType.name} bet`);
      return;
    }
    
    if (betAmount <= 0) {
      toast.error('Please enter a valid bet amount');
      return;
    }
    
    if (betAmount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    const newBet: Bet = {
      id: Date.now().toString(),
      type: selectedBetType,
      horses: [...selectedHorses],
      amount: betAmount,
      potentialPayout: calculatePotentialPayout()
    };

    setCurrentBets([...currentBets, newBet]);
    setBalance(balance - betAmount);
    setSelectedHorses([]);
    setBetAmount(10);
    
    toast.success(`${currentBetType.name} bet placed successfully!`);
  };

  const removeBet = (betId: string) => {
    const bet = currentBets.find(b => b.id === betId);
    if (bet) {
      setCurrentBets(currentBets.filter(b => b.id !== betId));
      setBalance(balance + bet.amount);
      toast.success('Bet removed');
    }
  };

  const totalBetAmount = currentBets.reduce((sum, bet) => sum + bet.amount, 0);
  const totalPotentialWinnings = currentBets.reduce((sum, bet) => sum + bet.potentialPayout, 0);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'favorite': return 'bg-yellow-500';
      case 'contender': return 'bg-blue-500';
      case 'longshot': return 'bg-purple-500';
      case 'wildcard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setPhase('contests')}
            className="text-white border-white hover:bg-white hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contests
          </Button>
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold">{selectedContest?.name}</h2>
            <p className="text-sm opacity-80">{selectedContest?.distance} • {selectedContest?.surface}</p>
          </div>
          <div className="text-white text-right">
            <p className="text-lg font-semibold">Balance: ${balance}</p>
            <p className="text-sm opacity-80">Entry Fee: ${selectedContest?.entryFee}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Horse Information Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4">
              <CardHeader>
                <CardTitle className="text-white">Race Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {horses.map((horse, index) => (
                    <div 
                      key={horse.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedHorses.includes(horse.id) 
                          ? 'bg-green-500/30 border-2 border-green-400' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => handleHorseSelection(horse.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-white font-bold text-lg">#{index + 1}</div>
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: horse.color }}
                          />
                          <div>
                            <h3 className="text-white font-bold">{horse.name}</h3>
                            <p className="text-white/70 text-sm">{horse.jockey} • {horse.trainer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-xl">{horse.odds}:1</div>
                          <Badge className={`${getCategoryColor(horse.category)} text-white text-xs`}>
                            {horse.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-xs text-white/80">
                        <div>Speed: {horse.speed}/10</div>
                        <div>Stamina: {horse.stamina}/10</div>
                        <div>Form: {horse.form}/10</div>
                        <div>Age: {horse.age}y</div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-xs text-white/70">
                        <span>Recent: {horse.recentRaces.join('-')}</span>
                        <span>Weight: {horse.weight}kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Betting Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4">
              <CardHeader>
                <CardTitle className="text-white">Place Your Bets</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedBetType} onValueChange={(value) => {
                  setSelectedBetType(value as BetType);
                  setSelectedHorses([]);
                }}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="win">Win</TabsTrigger>
                    <TabsTrigger value="place">Place</TabsTrigger>
                    <TabsTrigger value="show">Show</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="exacta">Exacta</TabsTrigger>
                    <TabsTrigger value="trifecta">Trifecta</TabsTrigger>
                    <TabsTrigger value="superfecta">Superfecta</TabsTrigger>
                  </TabsList>

                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded">
                      <h4 className="text-white font-semibold mb-1">{currentBetType.name} Bet</h4>
                      <p className="text-white/70 text-sm">{currentBetType.description}</p>
                      <p className="text-green-400 text-sm">Payout: {currentBetType.multiplier}</p>
                    </div>

                    {selectedHorses.length > 0 && (
                      <div className="bg-white/5 p-3 rounded">
                        <h4 className="text-white font-semibold mb-2">Selected Horses:</h4>
                        <div className="space-y-1">
                          {selectedHorses.map((horseId, index) => {
                            const horse = horses.find(h => h.id === horseId);
                            return (
                              <div key={horseId} className="flex items-center justify-between text-sm">
                                <span className="text-white">
                                  {index + 1}. {horse?.name}
                                </span>
                                <span className="text-white/70">{horse?.odds}:1</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-white text-sm">Bet Amount:</label>
                      <Input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        min="1"
                        max={balance}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="bg-white/5 p-3 rounded">
                      <div className="flex justify-between text-white text-sm">
                        <span>Potential Payout:</span>
                        <span className="font-bold text-green-400">${calculatePotentialPayout().toFixed(2)}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={placeBet}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      disabled={selectedHorses.length !== currentBetType.minHorses || betAmount <= 0 || betAmount > balance}
                    >
                      Place ${betAmount} {currentBetType.name} Bet
                    </Button>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Current Bets */}
            {currentBets.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4">
                <CardHeader>
                  <CardTitle className="text-white">Your Bets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {currentBets.map((bet) => (
                      <div key={bet.id} className="flex items-center justify-between bg-white/5 p-3 rounded">
                        <div>
                          <div className="text-white font-semibold">{bet.type.toUpperCase()}</div>
                          <div className="text-white/70 text-sm">
                            {bet.horses.map(horseId => horses.find(h => h.id === horseId)?.name).join(' → ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">${bet.amount}</div>
                          <div className="text-green-400 text-sm">Win: ${bet.potentialPayout.toFixed(2)}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removeBet(bet.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-white">
                      <span>Total Bet:</span>
                      <span className="font-bold">${totalBetAmount}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Potential Win:</span>
                      <span className="font-bold">${totalPotentialWinnings.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={() => {
                if (currentBets.length === 0) {
                  toast.error('Please place at least one bet!');
                  return;
                }
                setPhase('race');
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg py-3"
              disabled={currentBets.length === 0}
            >
              Start Race ({currentBets.length} bet{currentBets.length !== 1 ? 's' : ''})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingPage;
