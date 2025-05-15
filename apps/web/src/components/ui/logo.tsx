import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/home">
      <Image src={"/logo.png"} alt="help me out logo" width={137} height={40} />
    </Link>
  );
};
export default Logo;