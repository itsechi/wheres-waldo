import { formatTime } from '../helpers/formatTime';

export const ResultScreen = (props) => {
  const time = formatTime((props.time.end - props.time.start) / 1000);

  return (
    <main className="resultScreen">
      <p>You found all characters in {time}!</p>
    </main>
  );
};
