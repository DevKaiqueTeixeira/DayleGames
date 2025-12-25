import { Container } from '@/components/container';
import { GameCard } from '@/components/GameCard';
import { Input } from '@/components/input';
import { GameProps } from '@/utils/types/games'
async function getData(title: string) {

    try {
        const decodeTitle = decodeURI(title);
        console.log("Parms :" + decodeTitle)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)

        return res.json();
    } catch (err) {
        return null
    }
}
export default async function Search(
    props: { params: Promise<{ title: string }> }
) {
    const { title } = await props.params;

    const games: GameProps[] = await getData(title);


    return (
        <main className='w-full text-black'>
            <Container>
                <Input />
                <h1 className='front-bold text-xl mt-8 mb-5'>Veja oque encontramos na nossa base:</h1>
                {!games && (
                    <p>Esse jogo não foi encontrado ! ....</p>
                )}
                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games && games.map((item) => (
                        <GameCard key={item.id} data={item} />
                        //<h1>{item.title}</h1>
                    ))}
                </section>
            </Container>
        </main>
    )
}