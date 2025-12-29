import { GameProps } from "@/utils/types/games";
import { redirect } from "next/navigation";
import Image from 'next/image'
import { Container } from '@/components/container'
import { Label } from './components/label'
import { GameCard } from "@/components/GameCard";


async function getData(id: string) {
    //https://sujeitoprogramador.com/next-api/?api=game&id=15
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 60 } })//busca as informaçoes a cada 6-segundos
        return res.json();
    } catch (err) {
        throw new Error("Fala no fetch")
    }
}

async function getGameSorted() {
    //https://sujeitoprogramador.com/next-api/?api=game_day

    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" })
        return res.json();
    } catch (err) {
        throw new Error("Fala no fetch sorted")
    }
}

export default async function Game(
    props: { params: Promise<{ id: string }> }
) {
    const { id } = await props.params;

    const data: GameProps = await getData(id)
    const sortedGame: GameProps = await getGameSorted();
    console.log("Game do dia" + sortedGame)
    console.log(data)
    if (!data) {
        redirect("/")
    }
    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image
                    className="object-cover w-full h-80 sm:h-96 opacity-80 "
                    src={data.image_url}
                    alt="Imagem detalhe do jogo"
                    priority={true}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width:1200px) 44vw"
                    quality={100}
                />
            </div>
            <Container>
                <h1 className="font-bold text-xl my-4">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.platforms.map((item) => (
                        <Label name={item} key={item}>

                        </Label>
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.categories.map((item) => (
                        <Label name={item} key={item}>

                        </Label>
                    ))}
                </div>

                <p className="mt-7 mb-2"> <strong>Data de lançamento: </strong> {data.release}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame}>

                        </GameCard>
                    </div>
                </div>
            </Container>
        </main>
    )
}
