interface UserData {
  email: string;
  authority: string;
  studentYear: string;
  username: string;
}
const UserDataTable = ({ email, authority, studentYear, username }: UserData) => {
  return (
    <div className="userdataTable">
      <div>
        <span>이메일</span>
        <span>{email}</span>
      </div>
      <div>
        <span>권한 등급</span>
        <span>{authority}</span>
      </div>
      <div>
        <span>학번</span>
        <span>{studentYear}학번</span>
      </div>
      <div>
        <span>이름</span>
        <span>{username}</span>
      </div>
    </div>
  );
};
export default UserDataTable;
