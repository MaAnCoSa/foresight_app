import { useState } from 'react';
import ThemeWrapper from '../components/ThemeWrapper';
import PlayerForm from '../components/PlayerForm';
import MonsterForm from '../components/MonsterForm';
import DifficultyDisplay from '../components/DifficultyDisplay';
import { Player, Monster, DifficultyLevel } from '../types';

const CombatCalculator: React.FC = () => {
  const [partyLevel, setPartyLevel] = useState<number>(1);
  const [players, setPlayers] = useState<Player[]>([{
    id: 1,
    level: 1,
    class: 'fighter',
    hp: 10,
    ac: 14,
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  }]);
  
  const [monsters, setMonsters] = useState<Monster[]>([{
    id: 1,
    name: '',
    cr: 0,
    hp: 10,
    ac: 12,
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  }]);

  const [difficulty, setDifficulty] = useState<DifficultyLevel>(null);

  const handlePartyLevelChange = (newLevel: number) => {
    setPartyLevel(newLevel);
    setPlayers(players.map(player => ({
      ...player,
      level: newLevel
    })));
  };

  const addPlayer = () => {
    if (players.length >= 7) return;
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    setPlayers([...players, {
      id: newId,
      level: partyLevel,
      class: 'fighter',
      hp: 10,
      ac: 14,
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    }]);
  };

  const removePlayer = (id: number) => {
    if (players.length <= 1) return;
    const updatedPlayers = players
      .filter(player => player.id !== id)
      .map((player, index) => ({
        ...player,
        id: index + 1
      }));
    setPlayers(updatedPlayers);
  };

  const addMonster = () => {
    if (monsters.length >= 7) return;
    const newId = monsters.length > 0 ? Math.max(...monsters.map(m => m.id)) + 1 : 1;
    setMonsters([...monsters, {
      id: newId,
      name: '',
      cr: 0,
      hp: 10,
      ac: 12,
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    }]);
  };

  const removeMonster = (id: number) => {
    if (monsters.length <= 1) return;
    const updatedMonsters = monsters
      .filter(monster => monster.id !== id)
      .map((monster, index) => ({
        ...monster,
        id: index + 1
      }));
    setMonsters(updatedMonsters);
  };

  const calculateDifficulty = (): void => {
    const totalPlayerLevels = players.reduce((sum, p) => sum + (p.level || 0), 0);
    const totalMonsterCR = monsters.reduce((sum, m) => sum + (m.cr || 0), 0);
    
    const ratio = totalMonsterCR / (totalPlayerLevels / players.length);
    
    let calculatedDifficulty: DifficultyLevel = 'Easy';
    if (ratio > 0.5) calculatedDifficulty = 'Medium';
    if (ratio > 1) calculatedDifficulty = 'Hard';
    if (ratio > 1.5) calculatedDifficulty = 'Deadly';
    
    setDifficulty(calculatedDifficulty);
  };

  return (
    <ThemeWrapper>
      <div className="container">
        <h1>D&D 5e Combat Difficulty Calculator</h1>
        
        <div className="party-level-section">
          <h2>Party Level</h2>
          <div className="form-group">
            <label>Party Level:</label>
            <input 
              type="number" 
              value={partyLevel} 
              onChange={(e) => handlePartyLevelChange(Number(e.target.value))} 
              min="1" 
              max="20"
            />
          </div>
        </div>

        <div className="forms-container">
          <div className="party-section">
            <div className="section-header-container">
              <h2>Party Members ({players.length}/7)</h2>
              <button 
                onClick={addPlayer} 
                className="add-button"
                disabled={players.length >= 7}
              >
                Add Player (+)
              </button>
            </div>
            {players.map((player) => (
              <PlayerForm 
                key={player.id}
                player={player}
                onChange={(updatedPlayer: Player) => {
                  setPlayers(players.map(p => 
                    p.id === updatedPlayer.id ? updatedPlayer : p
                  ));
                }}
                onRemove={() => removePlayer(player.id)}
                showRemove={players.length > 1}
              />
            ))}
          </div>
          
          <div className="monsters-section">
            <div className="section-header-container">
              <h2>Monsters ({monsters.length}/7)</h2>
              <button 
                onClick={addMonster} 
                className="add-button"
                disabled={monsters.length >= 7}
              >
                Add Monster (+)
              </button>
            </div>
            {monsters.map((monster) => (
              <MonsterForm
                key={monster.id}
                monster={monster}
                onChange={(updatedMonster: Monster) => {
                  setMonsters(monsters.map(m => 
                    m.id === updatedMonster.id ? updatedMonster : m
                  ));
                }}
                onRemove={() => removeMonster(monster.id)}
                showRemove={monsters.length > 1}
              />
            ))}
          </div>
        </div>
        
        <button onClick={calculateDifficulty} className="calculate-button">
          Calculate Difficulty
        </button>
        
        {difficulty && <DifficultyDisplay difficulty={difficulty} />}
      </div>
    </ThemeWrapper>
  );
};

export default CombatCalculator;