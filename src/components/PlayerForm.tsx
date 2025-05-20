import { Player } from '../types';

interface PlayerFormProps {
  player: Player;
  onChange: (player: Player) => void;
  onRemove: () => void;
  showRemove: boolean;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ 
  player, 
  onChange, 
  onRemove,
  showRemove
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ 
      ...player, 
      [name]: ['hp', 'ac', 'str', 'dex', 'con', 'int', 'wis', 'cha'].includes(name)
        ? Math.max(1, Math.min(30, Number(value)))
        : value
    });
  };

  return (
    <div className="character-form">
      <div className="character-header">
        <h3>Player {player.id}</h3>
        {showRemove && (
          <button 
            onClick={onRemove}
            className="remove-button"
            title="Remove player"
            aria-label={`Remove player ${player.id}`}
          >
            ×
          </button>
        )}
      </div>
      <div className="form-row">
        <div className="form-group compact wide">
          <label>Class</label>
          <select 
            name="class" 
            value={player.class} 
            onChange={handleChange}
            className="class-select"
            aria-label={`Player ${player.id} class`}
          >
            <option value="fighter">Fighter</option>
            <option value="wizard">Wizard</option>
            <option value="rogue">Rogue</option>
            <option value="cleric">Cleric</option>
            <option value="barbarian">Barbarian</option>
            <option value="bard">Bard</option>
            <option value="druid">Druid</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="warlock">Warlock</option>
          </select>
        </div>
        
        <div className="form-group compact">
          <label>HP</label>
          <input 
            type="number" 
            name="hp" 
            value={player.hp} 
            onChange={handleChange} 
            min="1"
            aria-label={`Player ${player.id} hit points`}
          />
        </div>
        
        <div className="form-group compact">
          <label>AC</label>
          <input 
            type="number" 
            name="ac" 
            value={player.ac} 
            onChange={handleChange} 
            min="10" 
            max="30"
            aria-label={`Player ${player.id} armor class`}
          />
        </div>
      </div>

      <div className="form-row ability-scores">
        <div className="form-group compact">
          <label>STR</label>
          <input 
            type="number" 
            name="str" 
            value={player.str} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} strength`}
          />
        </div>
        
        <div className="form-group compact">
          <label>DEX</label>
          <input 
            type="number" 
            name="dex" 
            value={player.dex} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} dexterity`}
          />
        </div>
        
        <div className="form-group compact">
          <label>CON</label>
          <input 
            type="number" 
            name="con" 
            value={player.con} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} constitution`}
          />
        </div>
        
        <div className="form-group compact">
          <label>INT</label>
          <input 
            type="number" 
            name="int" 
            value={player.int} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} intelligence`}
          />
        </div>
        
        <div className="form-group compact">
          <label>WIS</label>
          <input 
            type="number" 
            name="wis" 
            value={player.wis} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} wisdom`}
          />
        </div>
        
        <div className="form-group compact">
          <label>CHA</label>
          <input 
            type="number" 
            name="cha" 
            value={player.cha} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Player ${player.id} charisma`}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;