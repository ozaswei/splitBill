import { use, useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState();

  function handleAddFriendfriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriendfriend} />}
        <Button onClick={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSpillBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friends }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance === 0 ? (
        <p>You and {friend.name} are even</p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {friend.balance} CAD
        </p>
      ) : (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} CAD
        </p>
      )}

      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id };
    onAddFriend(newFriend);
    setName("");
    setImage("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <h2>Add A Friend</h2>
      <label>👫Name</label>
      <input
        type="text"
        value={name}
        onChange={(newName) => setName(newName.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(newImageURL) => setImage(newImageURL.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSpillBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰 Bill Value</label>
      <input type="number" />
      <label>🧍 Your Expenses</label>
      <input type="number" />
      <label>🧑‍🤝‍🧑Friends Expenses</label>
      <input type="text" disabled />
      <label>💵 Who is paying the bill</label>
      <select>
        <option value="user"> You</option>
        <option value="friend"> Friend</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
