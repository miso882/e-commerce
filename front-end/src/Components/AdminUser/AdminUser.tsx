import axios from "axios";
import { useEffect, useState } from "react";
import { HTTP } from "../../regle";
import { useAuth } from "../../Context";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate("/");
  const [userList, setUserList] = useState();
  const [currentEmail, setCurrentEmail] = useState("");
  if (user.role !== "ROLE_ADMIN") {
    navigate("/")
  }

  useEffect(() => {
    async function getData() {
      const response = await axios.get(HTTP + "users")
      setUserList(response.data);
    }
    getData();
  }, [])
  async function addAdmin() {
    const response = await axios.put(HTTP + "users/" + currentEmail, { roles: ["ROLE_ADMIN"] })
  }
  return (
    <>
      <select onChange={(e) => { setCurrentEmail(e.target.value) }}>
        <option selected>Utilisateurs</option>
        {userList ? 
          userList.map((item) => {
            if (item.roles[0] !== "ROLE_ADMIN") {
              return (
                <option value={item.email} key={item.id}>{item.email} {item.role}</option>
                )
              }
          })
        : <></>
        }
      </select>
      <button onClick={() => { addAdmin() }}>Ajouter</button>
    </>
  )
}
export default AdminUser;