import Link from "next/link";
export default function NavLink(props: { href: string; name: string }) {
  return <Link href={props.href}>{props.name}</Link>;
}
