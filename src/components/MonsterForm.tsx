import { Monster } from '../types';

interface MonsterFormProps {
  monster: Monster;
  onChange: (monster: Monster) => void;
  onRemove: () => void;
  showRemove: boolean;
}

const MonsterForm: React.FC<MonsterFormProps> = ({ 
  monster, 
  onChange, 
  onRemove,
  showRemove
}) => {
  const crOptions = [
    '0', '1/8', '1/4', '1/2', 
    ...Array.from({ length: 30 }, (_, i) => (i + 1).toString())
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ 
      ...monster, 
      [name]: ['hp', 'ac', 'str', 'dex', 'con', 'int', 'wis', 'cha'].includes(name)
        ? Math.max(1, Math.min(30, Number(value)))
        : name === 'cr'
        ? parseCrValue(value)
        : value
    });
  };

  const parseCrValue = (cr: string): number => {
    if (cr === '1/8') return 0.125;
    if (cr === '1/4') return 0.25;
    if (cr === '1/2') return 0.5;
    return Number(cr);
  };

  const formatCrValue = (cr: number): string => {
    if (cr === 0.125) return '1/8';
    if (cr === 0.25) return '1/4';
    if (cr === 0.5) return '1/2';
    return cr.toString();
  };

  return (
    <div className="monster-form">
      <div className="monster-header">
        <h3>Monster {monster.id}</h3>
        {showRemove && (
          <button 
            onClick={onRemove}
            className="remove-button"
            title="Remove monster"
            aria-label={`Remove monster ${monster.id}`}
          >
            ×
          </button>
        )}
      </div>
      <div className="form-row">
        <div className="form-group compact wide">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={monster.name} 
            onChange={handleChange}
            placeholder="Goblin, Dragon, etc."
            aria-label={`Monster ${monster.id} name`}
          />
        </div>
        
        <div className="form-group compact">
          <label>CR</label>
          <select
            name="cr"
            value={formatCrValue(monster.cr)}
            onChange={handleChange}
            className="cr-select"
            aria-label={`Monster ${monster.id} challenge rating`}
          >
            {crOptions.map(cr => (
              <option key={cr} value={cr}>
                {cr}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group compact">
          <label>HP</label>
          <input 
            type="number" 
            name="hp" 
            value={monster.hp} 
            onChange={handleChange} 
            min="1"
            aria-label={`Monster ${monster.id} hit points`}
          />
        </div>
        
        <div className="form-group compact">
          <label>AC</label>
          <input 
            type="number" 
            name="ac" 
            value={monster.ac} 
            onChange={handleChange} 
            min="10" 
            max="30"
            aria-label={`Monster ${monster.id} armor class`}
          />
        </div>
      </div>

      <div className="form-row ability-scores">
        <div className="form-group compact">
          <label>STR</label>
          <input 
            type="number" 
            name="str" 
            value={monster.str} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} strength`}
          />
        </div>
        
        <div className="form-group compact">
          <label>DEX</label>
          <input 
            type="number" 
            name="dex" 
            value={monster.dex} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} dexterity`}
          />
        </div>
        
        <div className="form-group compact">
          <label>CON</label>
          <input 
            type="number" 
            name="con" 
            value={monster.con} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} constitution`}
          />
        </div>
        
        <div className="form-group compact">
          <label>INT</label>
          <input 
            type="number" 
            name="int" 
            value={monster.int} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} intelligence`}
          />
        </div>
        
        <div className="form-group compact">
          <label>WIS</label>
          <input 
            type="number" 
            name="wis" 
            value={monster.wis} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} wisdom`}
          />
        </div>
        
        <div className="form-group compact">
          <label>CHA</label>
          <input 
            type="number" 
            name="cha" 
            value={monster.cha} 
            onChange={handleChange} 
            min="1"
            max="30"
            aria-label={`Monster ${monster.id} charisma`}
          />
        </div>
      </div>
    </div>
  );
};

export default MonsterForm;