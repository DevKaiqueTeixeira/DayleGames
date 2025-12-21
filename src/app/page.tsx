import { Container } from "@/components/container";
import { GameProps } from '@/utils/types/games'

import Link from 'next/link'

import Image from 'next/image'
async function getDalyGame() {
  try {

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)

    return res.json();
  } catch (err) {
    throw new Error("Fala na requisição")
  }
}

export default async function Home() {

  const dalyGame: GameProps = await getDalyGame();

  console.log(dalyGame);
  return (

    <main className="w-full">
      <div className="max-w-7xl mx-auto px-3">
        <Container>

          <h1 className="text-center front-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para você !</h1>
          <Link href={`/game/${dalyGame.id}`}>
            <section className="w-full bg-black rounded-lg">
              <Image
                src={dalyGame.image_url}
                alt={dalyGame.title}
                priority={true}
                quality={100}
                width={100}
                height={100}
              />


            </section>
          </Link>

        </Container>
      </div>
    </main>

  );
}
