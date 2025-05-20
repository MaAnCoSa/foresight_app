import { DifficultyLevel } from '../types';

interface DifficultyDisplayProps {
  difficulty: DifficultyLevel;
}

const DifficultyDisplay: React.FC<DifficultyDisplayProps> = ({ difficulty }) => {
  const getDifficultyColor = (): string => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'green';
      case 'medium': return 'blue';
      case 'hard': return 'orange';
      case 'deadly': return 'red';
      default: return 'black';
    }
  };

  return (
    <div className="difficulty-display">
      <h2 style={{ color: getDifficultyColor() }}>
        Encounter Difficulty: {difficulty}
      </h2>
      {/* Add more detailed analysis here */}
    </div>
  );
};

export default DifficultyDisplay;