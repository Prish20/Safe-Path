/**
 * Separator Component
 * @returns <hr />
 */

type SeparatorProp = {
  color?: string;
  className?: string;
};

const Separator: React.FC<SeparatorProp> = ({ className }) => {
  return <hr className={`border-0 ${className} h-[1px] w-full my-4`} />;
};

export default Separator;
