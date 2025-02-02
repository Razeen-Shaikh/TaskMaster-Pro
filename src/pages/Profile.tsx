
import { useState } from "react";
import { User } from "../api/types";


export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>Profile</div>
  )
}