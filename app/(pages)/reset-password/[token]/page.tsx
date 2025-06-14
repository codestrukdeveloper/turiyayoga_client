import ResetPasswordClient from "./ResetPasswordClient";

interface PageProps {
  params: {
    token: string;
  };
}

const ResetPasswordPage = async({ params }: PageProps) => {
  const { token } = await (params);
  return <ResetPasswordClient token={token} />;
};

export default ResetPasswordPage;
