import useGame from "../store/useGame";

export default function Points() {
  const red = useGame((state) => state.red);
  const blue = useGame((state) => state.blue);

  return (
    <div className="Points">
      <p>{red}</p>
      <p>-</p>
      <p>{blue}</p>
    </div>
  );
}
