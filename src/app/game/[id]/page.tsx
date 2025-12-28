import { GameProps } from "@/utils/types/games";
import { redirect } from "next/navigation";
import Image from 'next/image'
import { Container } from '@/components/container'
async function getData(id: string) {
    //https://sujeitoprogramador.com/next-api/?api=game&id=15
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        return res.json();
    } catch (err) {
        throw new Error("Fala no fetch")
    }
}


export default async function Game(
    props: { params: Promise<{ id: string }> }
) {
    const { id } = await props.params;

    const data: GameProps = await getData(id)
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
            </Container>
        </main>
    )
}
