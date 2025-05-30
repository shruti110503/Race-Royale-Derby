import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Star, Zap, Heart } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/context/GameContext";
import { Progress } from "@/components/ui/progress";

const HorseCard = ({ horse, isSelected, onClick }: any) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected 
          ? 'ring-4 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-2xl' 
          : 'hover:shadow-xl bg-white'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-3">
            {/* Enhanced Horse Visual */}
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${horse.color}, ${horse.color}dd)`,
                  border: `3px solid ${horse.color}aa`
                }}
              >
                🐎
              </div>
              {/* Speed indicator */}
              {horse.speed >= 9 && (
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              )}
              {/* Stamina indicator */}
              {horse.stamina >= 9 && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="font-bold text-gray-800">{horse.name}</div>
              <div className="text-sm text-gray-500">Lane {horse.lane}</div>
            </div>
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{horse.odds}:1</div>
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(horse.speed / 2))].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Speed Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-red-500" />
              Speed
            </span>
            <span className="font-semibold">{horse.speed}/10</span>
          </div>
          <div className="relative">
            <Progress value={horse.speed * 10} className="h-3" />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #f97316 50%, #eab308 100%)`,
                width: `${horse.speed * 10}%`
              }}
            />
          </div>
        </div>

        {/* Stamina Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-green-500" />
              Stamina
            </span>
            <span className="font-semibold">{horse.stamina}/10</span>
          </div>
          <div className="relative">
            <Progress value={horse.stamina * 10} className="h-3" />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #16a34a 50%, #15803d 100%)`,
                width: `${horse.stamina * 10}%`
              }}
            />
          </div>
        </div>

        {/* Horse Stats Summary */}
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Win Rate:</span>
              <span className="font-semibold">{Math.round((10 - horse.odds) * 10)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Form:</span>
              <span className="font-semibold">
                {horse.speed >= 8 ? 'Excellent' : horse.speed >= 6 ? 'Good' : 'Average'}
              </span>
            </div>
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-center">
            <div className="text-yellow-800 font-semibold text-sm">
              ✨ SELECTED ✨
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const HorseSelectionPage = () => {
  const { 
    horses, 
    setPhase, 
    selectedHorse, 
    setSelectedHorse, 
    balance, 
    setBalance, 
    betAmount, 
    setBetAmount 
  } = useGame();

  const handleBet = () => {
    if (!selectedHorse) {
      toast.error("Please select a horse first!");
      return;
    }
    if (betAmount <= 0) {
      toast.error("Please enter a valid bet amount!");
      return;
    }
    if (betAmount > balance) {
      toast.error("You don't have enough money!");
      return;
    }
    
    setBalance(balance - betAmount);
    setPhase('race');
  };

  const handleCancel = () => {
    setSelectedHorse(null);
    setBetAmount(0);
    setPhase('lobby');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            🏆 Choose Your Champion 🏆
          </h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <p className="text-2xl text-white font-semibold">
              💰 Balance: ${balance}
            </p>
          </div>
        </div>

        {/* Horse Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {horses.map((horse) => (
            <HorseCard
              key={horse.id}
              horse={horse}
              isSelected={selectedHorse?.id === horse.id}
              onClick={() => setSelectedHorse(horse)}
            />
          ))}
        </div>

        {/* Enhanced Betting Section */}
        <Card className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6" />
              Place Your Bet
              <Trophy className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 p-6">
            {selectedHorse ? (
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div 
                    className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-3xl font-bold text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedHorse.color}, ${selectedHorse.color}dd)`,
                      border: `3px solid ${selectedHorse.color}aa`
                    }}
                  >
                    🐎
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Selected Champion:</p>
                    <p className="font-bold text-2xl text-gray-800">{selectedHorse.name}</p>
                    <p className="text-sm text-gray-600">Lane {selectedHorse.lane} • {selectedHorse.odds}:1 odds</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-lg text-gray-700 mb-2">Potential Winnings:</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${(betAmount * selectedHorse.odds).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    (Your ${betAmount} × {selectedHorse.odds}:1 odds)
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">🐴</div>
                <p className="text-gray-500 text-lg font-medium">No horse selected</p>
                <p className="text-gray-400 text-sm mt-2">Click on a horse above to select your champion</p>
              </div>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="bet-amount" className="text-lg font-semibold text-gray-700">
                💵 Bet Amount ($)
              </Label>
              <Input
                id="bet-amount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                placeholder="Enter bet amount"
                min="1"
                max={balance}
                className="text-lg p-4 border-2 border-gray-300 focus:border-blue-500"
              />
              
              {/* Quick bet buttons */}
              <div className="flex gap-2 justify-center">
                {[10, 25, 50, 100].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setBetAmount(amount)}
                    disabled={amount > balance}
                    className="text-xs"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-3 p-6">
            <Button 
              variant="outline" 
              onClick={handleCancel} 
              className="flex-1 text-lg py-3"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBet} 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-3"
              disabled={!selectedHorse || betAmount <= 0}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Place Bet
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HorseSelectionPage;
