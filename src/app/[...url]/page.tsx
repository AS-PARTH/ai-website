import ChatWrapper from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string[];
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url?.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents?.join("/");
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie = (await cookies()).get("sessionId")?.value || "";
  const resolvedParams = await params;
  const reconstructedUrl = reconstructUrl({
    url: resolvedParams?.url as string[],
  });

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );
  // Check if the URL is already indexed
  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  if (!isAlreadyIndexed) {
    // Add the URL to the RAG chat context
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    // Mark the URL as indexed in Redis
    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;
