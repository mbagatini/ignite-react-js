import { checkSSRAuth } from "../utils/checkSSRAuth";

export default function Metrics() {
  return (
    <div>
      <h2>Metrics</h2>
    </div>
  );
}

export const getServerSideProps = checkSSRAuth(
  async (context) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    // roles
  }
);
