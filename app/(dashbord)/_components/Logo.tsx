import Image from 'next/image';

function Logo() {
  return (
    <Image width={200} height={200} src={'/logo.svg'} alt="No-Hustle Logo" />
  );
}

export default Logo;
