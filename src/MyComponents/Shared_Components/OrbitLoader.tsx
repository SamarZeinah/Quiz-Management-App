type OrbitLoaderProps = {
  size?: number;
};

export default function OrbitLoader({ size = 50 }: OrbitLoaderProps) {
  return (
    <div
      className="orbitLoader"
      style={{ width: `${size}px` }}
    ></div>
  );
}
