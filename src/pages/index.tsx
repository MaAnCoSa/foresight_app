import { useState } from 'react';
import ThemeWrapper from '../components/ThemeWrapper';
import PlayerForm from '../components/PlayerForm';
import MonsterForm from '../components/MonsterForm';
import DifficultyDisplay from '../components/DifficultyDisplay';
import { Player, Monster, DifficultyLevel, DifficultyNumber } from '../types';

const CombatCalculator: React.FC = () => {
  const [partyLevel, setPartyLevel] = useState<number>(1);
  const [players, setPlayers] = useState<Player[]>([{
    id: 1,
    level: 1,
    class: 2,
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
  const [difficultyNum, setDifficultyNum] = useState<DifficultyNumber>(null);

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
      class: 2,
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
    let body : any = {
      "num_pcs": players.length,
      "num_monsters": monsters.length,
      "pc_level": partyLevel
    }

    for (let i = 1; i < 8; i++) {
      if (players.length >= i) {
        body[`pc${i}_hp_max`] = players[i-1]["hp"]
        body[`pc${i}_ac`] = players[i-1]["ac"]
        body[`pc${i}_STR`] = players[i-1]["str"]
        body[`pc${i}_DEX`] = players[i-1]["dex"]
        body[`pc${i}_CON`] = players[i-1]["con"]
        body[`pc${i}_INT`] = players[i-1]["int"]
        body[`pc${i}_WIS`] = players[i-1]["wis"]
        body[`pc${i}_CHA`] = players[i-1]["cha"]
        if (i != 1) {
          body[`pc${i}_class_-`] = 0
        }

        if (players[i-1]["class"] == 0) {
          body[`pc${i}_class_barbarian`] = 1
          body[`pc${i}_class_Bard`] = 0
          body[`pc${i}_class_FighterStr`] = 0
        } else if (players[i-1]["class"] == 1) {
          body[`pc${i}_class_barbarian`] = 0
          body[`pc${i}_class_Bard`] = 1
          body[`pc${i}_class_FighterStr`] = 0
        } else if (players[i-1]["class"] == 2) {
          body[`pc${i}_class_barbarian`] = 0
          body[`pc${i}_class_Bard`] = 0
          body[`pc${i}_class_FighterStr`] = 1
        }
        
      } else {
        body[`pc${i}_hp_max`] = 0
        body[`pc${i}_ac`] = 0
        body[`pc${i}_STR`] = 0
        body[`pc${i}_DEX`] = 0
        body[`pc${i}_CON`] = 0
        body[`pc${i}_INT`] = 0
        body[`pc${i}_WIS`] = 0
        body[`pc${i}_CHA`] = 0
        body[`pc${i}_class_-`] = 1
        body[`pc${i}_class_barbarian`] = 0
        body[`pc${i}_class_Bard`] = 0
        body[`pc${i}_class_FighterStr`] = 0
      }
    }

    for (let i = 1; i < 8; i++) {
      if (monsters.length >= i) {
        body[`monster${i}_cr`] = monsters[i-1]["cr"]
        body[`monster${i}_hp_max`] = monsters[i-1]["hp"]
        body[`monster${i}_ac`] = monsters[i-1]["ac"]
        body[`monster${i}_STR`] = monsters[i-1]["str"]
        body[`monster${i}_DEX`] = monsters[i-1]["dex"]
        body[`monster${i}_CON`] = monsters[i-1]["con"]
        body[`monster${i}_INT`] = monsters[i-1]["int"]
        body[`monster${i}_WIS`] = monsters[i-1]["wis"]
        body[`monster${i}_CHA`] = monsters[i-1]["cha"]
      } else {
        body[`monster${i}_cr`] = 0
        body[`monster${i}_hp_max`] = 0
        body[`monster${i}_ac`] = 0
        body[`monster${i}_STR`] = 0
        body[`monster${i}_DEX`] = 0
        body[`monster${i}_CON`] = 0
        body[`monster${i}_INT`] = 0
        body[`monster${i}_WIS`] = 0
        body[`monster${i}_CHA`] = 0
      }
    }

    console.log(body)

    postData(body)

    const totalPlayerLevels = players.reduce((sum, p) => sum + (p.level || 0), 0);
    const totalMonsterCR = monsters.reduce((sum, m) => sum + (m.cr || 0), 0);
    
    const ratio = totalMonsterCR / (totalPlayerLevels / players.length);
    
    let calculatedDifficulty;
    if (difficultyNum == 0) {
      setDifficulty("Very Easy")
    } else if (difficultyNum == 1) {
      setDifficulty("Easy")
    } else if (difficultyNum == 2) {
      setDifficulty("Medium")
    } else if (difficultyNum == 3) {
      setDifficulty("Hard")
    } else if (difficultyNum == 4) {
      setDifficulty("Deadly")
    }    
  };

  async function postData(data: any) {
    const url: any = process.env.NEXT_PUBLIC_FORESIGHT_API_URL
    const token: any = process.env.NEXT_PUBLIC_API_KEY
  
    console.log("Before fetch")

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': token
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Inside fetch")
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result : any = response.json();
      console.log(result)
      setDifficultyNum(result["prediccion"])

      console.log(response.json())
    });

    console.log("After fetch")    
  }

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