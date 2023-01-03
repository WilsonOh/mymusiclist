import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <ul>
        <li>Email: {currentUser.email}</li>
        <li>Name: {currentUser.displayName}</li>
      </ul>
    </div>
  );
};

export default UserProfile;
