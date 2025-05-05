interface modalProps {
  time: string;
}

export function VictoryModal({ time }: modalProps) {
  return (
    <div className="modal">
      <button>✘</button>
      <h2>You Found Waldo!</h2>
      <p>time: {time}</p>
      <form method="put">
        <label htmlFor="username">Username</label>
        <div>
          <i>Add an username to submit your score*</i>
          <input type="text" name="username" id="username" />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
