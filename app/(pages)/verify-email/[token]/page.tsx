import VerifyEmailClient from "./VerifyEmailClient";

interface Params {
  params: {
    token: string;
  };
}

const VerifyEmailPage = async({ params }: Params) => {
  const { token } = await (params);

  return <VerifyEmailClient token={token} />;
};

export default VerifyEmailPage;
