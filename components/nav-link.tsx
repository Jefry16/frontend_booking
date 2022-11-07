import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./nav-link.module.scss";
export default function NavLink(props: { href: string; name: string }) {
  const router = useRouter();
  const active = router.pathname === props.href || router.asPath === props.href;
  console.log(props.href, router.pathname, router.asPath);
  return (
    <Link href={props.href} className={` ${active ? styles.active : ""}`}>
      {props.name}
    </Link>
  );
}
