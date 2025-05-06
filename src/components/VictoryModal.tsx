import { useRef } from "react";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";

interface modalProps {
  time: string;
}

export function VictoryModal({ time }: modalProps) {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  async function putUsername(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formRef.current) {
      return alert("Error sending the form");
    }

    const formData = new FormData(formRef.current);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        params.append(key, value);
      }
    }

    const user = await fetchData(
      "/user/username",
      "PUT",
      { "Content-Type": "application/x-www-form-urlencoded" },
      params.toString()
    );

    if (!user.success) {
      return alert(user.message);
    }

    alert("score saved!");
    navigate("/");
  }

  return (
    <div className="modal">
      <button>✘</button>
      <h2>You Found Waldo!</h2>
      <p>time: {time}</p>
      <form
        ref={formRef}
        onSubmit={(e) => {
          putUsername(e);
        }}
      >
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
