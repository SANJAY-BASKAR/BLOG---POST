import React from 'react'
import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
import {STARTUP_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";

const Page = async({ searchParams }: {
    searchParams : Promise<{ query?: string}>
}) => {

    const query = (await searchParams).query;
    const params = { search: query || null};

    const session = await auth();
    console.log(session?.id);

    // const posts = await client.fetch(STARTUP_QUERY);
    const { data : posts } = await sanityFetch({query: STARTUP_QUERY, params});
// now next map over the cards count
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">PITCH YOUR STARTUP </h1>
                <p className="sub-heading !max-w-3xl">
                    SUBMIT IDEAS, VOTE ON PITCHES AND GET NOTIFIED
                </p>

                <SearchForm query={query}/>

            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? ` Search results for ${query}` : 'All Start ups'}
                </p>

                <ul className="mt-7 card_grid ">
                    {posts.length > 0 ? (
                        posts.map((post: StartupCardType) => (
                            <StartupCard key={post?._id} post={post}/>
                        ))
                    ): (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>

            <SanityLive />
        </>

    )
}
export default Page
