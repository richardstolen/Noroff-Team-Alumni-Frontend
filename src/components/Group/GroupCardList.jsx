import GroupCards from "./GroupCards";

function GroupCardList({ groups }) {
  return (
    <div className="group-card-container">
      {groups.map((group, index) => (
        <div key={index} className="group-card-item">
          <GroupCards group={group} />
        </div>
      ))}
    </div>
  );
}

GroupCardList.defaultProps = {
  groups: [],
};

export default GroupCardList;

