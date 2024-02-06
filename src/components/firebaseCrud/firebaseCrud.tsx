"use client";
import FirebaseConfig from "../firebaseConfig/firebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const FirebaseCrud = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const database = FirebaseConfig();

  let isNullOrWhiteSpaces = (value: any) => {
    value = value.toString();
    return value == null || value.replaceAll(" ", "").length <= 1;
  };

  let inserData = () => {
    const dbref = ref(database);
    if (
      isNullOrWhiteSpaces(username) ||
      isNullOrWhiteSpaces(fullname) ||
      isNullOrWhiteSpaces(phone) ||
      isNullOrWhiteSpaces(dob)
    ) {
      alert("fill all the fields");
      return;
    }

    get(child(dbref, `Customer/${username}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("username already exists");
        } else {
          set(ref(database, "Customer/" + username), {
            fullname: fullname,
            phone: phone,
            dateofbirth: dob,
          })
            .then(() => {
              alert("data inserted successfully");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  let updateData = () => {
    const dbref = ref(database);
    if (isNullOrWhiteSpaces(username)) {
      alert("username does not exists");
      return;
    }

    get(child(dbref, `Customer/${username}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(database, "Customer/" + username), {
            fullname: fullname,
            phone: phone,
            dateofbirth: dob,
          })
            .then(() => {
              alert("data updated successfully");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("username does not exists");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  let deleteData = () => {
    const dbref = ref(database);
    if (isNullOrWhiteSpaces(username)) {
      alert("username required to delete data");
      return;
    }

    get(child(dbref, `Customer/${username}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, "Customer/" + username))
            .then(() => {
              alert("data deleted successfully");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("username does not exists");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  let selectData = () => {
    const dbref = ref(database);

    if (isNullOrWhiteSpaces(username)) {
      alert("username cannot be empty");
      return;
    }

    get(child(dbref, `Customer/${username}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFullname(snapshot.val().fullname);
          setPhone(snapshot.val().phone);
          setDob(snapshot.val().dateofbirth);
        } else {
          alert("No data found");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className={"input input-bordered w-full max-w-xs"}
      />
      <br />
      <label htmlFor="fullname">Fullname</label>
      <input
        type="text"
        id="fullname"
        onChange={(e) => setFullname(e.target.value)}
        value={fullname}
        className={"input input-bordered w-full max-w-xs"}
      />
      <br />
      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={"input input-bordered w-full max-w-xs"}
      />
      <br />
      <label htmlFor="dob">Dob</label>
      <input
        type="date"
        id="dob"
        onChange={(e) => setDob(e.target.value)}
        value={dob}
        className={"input input-bordered w-full max-w-xs"}
      />
      <br />

      <button className="btn" onClick={inserData}>
        Insert Data
      </button>
      <button className="btn" onClick={updateData}>
        Update Data
      </button>
      <button className="btn" onClick={deleteData}>
        Delete Data
      </button>
      <button className="btn" onClick={selectData}>
        Select Data
      </button>
    </>
  );
};

export default FirebaseCrud;
