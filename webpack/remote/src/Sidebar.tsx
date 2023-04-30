import "./styles.css/sidebar.css";

interface SidebarProps {
  title: string;
  details: Array<{ name: string; url: string }>;
}

const Sidebar = (props: SidebarProps) => {
  const { title, details } = props;
  const menuItems = details.map((linkObject) => (
    <li key={linkObject.name}>
      <a href={linkObject.url}>{linkObject.name}</a>
    </li>
  ));
  return (
    <aside>
      <h1>{title}</h1>
      <ul>
        {menuItems}
      </ul>
    </aside>
  );
};

export default Sidebar;
