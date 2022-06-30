import useGlobalContext from "../../GlobalContext";
import Group from "./Group";

const Groups = () => {
  const { completed_groups, incomplete_groups } = useGlobalContext();
  const groups = incomplete_groups.concat(completed_groups);

  if (groups.length === 0) return <div>No Todos to display.</div>;
  return (
    <>
      {groups.map((group) => (
        <Group
          key={group._id}
          id={group._id}
          name={group.name}
          is_completed={group.is_completed}
        />
      ))}
    </>
  );
};

export default Groups;
