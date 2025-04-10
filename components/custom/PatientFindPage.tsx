import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import MySearchIcon from "@/components/custom/MySearchIcon";
import Avatar from "@/components/templates/Avatar";
import MyInput from "@/components/templates/MyInput";
import PageContainer from "@/components/templates/PageContainer";
import { useFHPagination } from "@/hooks/useFHPagination";
import { useFHWatchQuery } from "@/hooks/useFHWatchQuery";
import { useInputField } from "@/hooks/useInputField";
import { useS } from "@/hooks/useReactHooks";
import { limit, where } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface PatientFindPageProps {
  setPatient: Dispatch<SetStateAction<MyUser | null>>;
}

const PatientFindPage: React.FC<PatientFindPageProps> = ({ setPatient }) => {
  const searchInput = useInputField((v) => []);
  const [search, setSearch] = useS("");
  const [users, loadingUsers] = useFHWatchQuery(
    FH.MyUser,
    [],
    where("role", "==", "Patient"),
    limit(10)
  );

  const searchedUsers = users.filter((user) => {
    if (search === "") return true;
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  // const pdfPagination = useFHPagination(
  //   FH.MyUser,
  //   "name",
  //   "asc",
  //   8,
  //   [search],
  //   ...(search !== ""
  //     ? [where("name", ">=", search), where("name", "<=", search + "\uf8ff")]
  //     : []),
  //   where("role", "==", "Patient")
  // );

  return (
    <PageContainer>
      {/*//! Searchbar */}
      <div className="rsc-4 bg-gray py-2 px-4 rounded-xl">
        <MySearchIcon />
        <MyInput
          inputField={searchInput}
          placeholder="Search Patient"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent py-0 px-0 b-none t-white t44"
        />
      </div>

      {/*//! Search List */}
      <div className="wf css-2 bg-slate-600 bg-opacity-50 rounded-xl">
        {searchedUsers.map((user) => (
          <div className="wf css-1" key={user.id}>
            <div
              key={user.id}
              className="wf rsc-4 p-4 mb-2 cp"
              onClick={() => setPatient(user)}
            >
              <Avatar src={user.photoURL} size={32} />
              <p className="t53">{user.name}</p>
            </div>
            <hr className="wf t-black o-20" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default PatientFindPage;
