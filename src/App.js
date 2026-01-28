import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Kaitlyn",
    image: "images/1.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "images/2.jpg",
    balance: 20,
  },
  {
    id: 499476,
    name: "Venessa",
    image: "images/3.jpg",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <AddFriendForm />
        <Button> Add Friend</Button>
      </div>
      <FormSpillBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label>👫Name</label>
      <input type="text" />
      <label>🖼️ Image URL</label>
      <input type="text" />
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
