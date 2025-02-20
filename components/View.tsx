interface Props {
  id: string;
}
const View = ({ id }: Props) => {
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2"></div>
    </div>
  );
};

export default View;
