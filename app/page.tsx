export const dynamic = "force-dynamic";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Link from "next/link";


export default function Home() {
  return (
    <Container>
      <Card>
        <h1>Ask Someone to Be Your Valentine 💌</h1>
        <p>Create a cute Valentine message and send it as a link.</p>
        <Link href="/create">
          <Button>Create a Valentine</Button>
        </Link>
      </Card>
    </Container>
  );
}
