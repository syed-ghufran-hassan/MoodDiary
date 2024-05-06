import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

getMetadata({
  title: "Block Explorer",
  description: "Block Explorer created with 🏗 Scaffold-OP",
});

const BlockExplorerLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlockExplorerLayout;
