/** @format */
type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  route: string;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  active,
  collapsed,
  onClick,
}) => {
  return (
    <button
      className={`w-full flex items-center px-4 py-3 ${
        active ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800/50"
      } transition-colors`}
      onClick={onClick}
    >
      <span className={`${collapsed ? "mx-auto" : "mr-3"}`}>{icon}</span>
      {!collapsed && <span>{text}</span>}
    </button>
  );
};
export default NavItem;
